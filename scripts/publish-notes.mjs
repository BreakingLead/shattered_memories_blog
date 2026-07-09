import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const sourceRoot = process.argv[2] ? path.resolve(process.argv[2]) : '/home/leaduwu-nix/note';
const targetRoot = process.argv[3]
	? path.resolve(process.argv[3])
	: path.join(repoRoot, 'src/content/blog');
const sourceAssetsRoot = path.join(sourceRoot, 'assets');
const targetAssetsRoot = path.join(repoRoot, 'public/obsidian-assets');
const targetAssetUrlBase = '/obsidian-assets';

const ignoredDirs = new Set([
	'.git',
	'.obsidian',
	'node_modules',
	'legacy_trash',
]);

const markdownExtensions = new Set(['.md', '.mdx']);
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif']);

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const obsidianImagePattern = /!\[\[([^\]]+)\]\]/g;

const isMarkdownFile = (filePath) => markdownExtensions.has(path.extname(filePath).toLowerCase());

const escapeYamlString = (value) => `"${String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;

const formatDate = (date) => date.toISOString().slice(0, 10);

const slugifyAssetName = (name) =>
	name
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-zA-Z0-9._-]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.toLowerCase() || 'asset';

const hasPublishFlag = (frontmatter) => /^blog-publish:\s*true\s*$/m.test(frontmatter);

const hasField = (frontmatter, field) => new RegExp(`^${field}:\\s*`, 'm').test(frontmatter);

const stripMarkdown = (content) =>
	content
		.replace(/!\[\[[^\]]+\]\]/g, '')
		.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, '$2$1')
		.replace(/!\[[^\]]*\]\([^)]+\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[`*_>#~-]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

const makeDescription = (body, fallbackTitle) => {
	const text = stripMarkdown(body);
	if (!text) {
		return fallbackTitle;
	}

	return text.length > 120 ? `${text.slice(0, 117)}...` : text;
};

const splitFrontmatter = (content) => {
	const match = content.match(frontmatterPattern);
	if (!match) {
		return { frontmatter: '', body: content.trimStart() };
	}

	return {
		frontmatter: match[1].trim(),
		body: content.slice(match[0].length).trimStart(),
	};
};

const assetFilesByName = new Map();
const copiedAssets = new Map();
const usedAssetNames = new Set();

const buildAssetIndex = async () => {
	try {
		for await (const assetPath of walkFiles(sourceAssetsRoot)) {
			assetFilesByName.set(path.basename(assetPath), assetPath);
		}
	} catch {
		// Notes can still be published without an assets directory.
	}
};

const nextAssetName = (rawName) => {
	const parsed = path.parse(rawName);
	let candidate = `${slugifyAssetName(parsed.name)}${parsed.ext.toLowerCase()}`;
	let suffix = 2;

	while (usedAssetNames.has(candidate) && copiedAssets.get(rawName)?.targetName !== candidate) {
		candidate = `${slugifyAssetName(parsed.name)}-${suffix}${parsed.ext.toLowerCase()}`;
		suffix += 1;
	}

	usedAssetNames.add(candidate);
	return candidate;
};

const parseObsidianAssetName = (rawName) => rawName.split('|')[0].split('#')[0].trim();

const copyObsidianAsset = async (rawName) => {
	const assetName = parseObsidianAssetName(rawName);
	const extension = path.extname(assetName).toLowerCase();

	if (!imageExtensions.has(extension)) {
		return null;
	}

	if (copiedAssets.has(assetName)) {
		return copiedAssets.get(assetName);
	}

	const sourcePath = assetFilesByName.get(assetName);
	if (!sourcePath) {
		console.warn(`[asset missing] ${assetName}`);
		return null;
	}

	const targetName = nextAssetName(assetName);
	await mkdir(targetAssetsRoot, { recursive: true });
	await copyFile(sourcePath, path.join(targetAssetsRoot, targetName));

	const copiedAsset = {
		targetName,
		url: `${targetAssetUrlBase}/${encodeURIComponent(targetName)}`,
		alt: path.parse(assetName).name,
	};
	copiedAssets.set(assetName, copiedAsset);
	return copiedAsset;
};

const rewriteObsidianImages = async (content) => {
	let output = '';
	let lastIndex = 0;
	let changed = false;

	for (const match of content.matchAll(obsidianImagePattern)) {
		const asset = await copyObsidianAsset(match[1]);
		if (!asset) {
			continue;
		}

		output += content.slice(lastIndex, match.index);
		output += `![${asset.alt}](${asset.url})`;
		lastIndex = match.index + match[0].length;
		changed = true;
	}

	if (!changed) {
		return content;
	}

	return output + content.slice(lastIndex);
};

const buildPublishedContent = async (sourcePath, rawContent) => {
	const { frontmatter, body } = splitFrontmatter(rawContent);
	if (!hasPublishFlag(frontmatter)) {
		return null;
	}

	const sourceStats = await stat(sourcePath);
	const title = path.basename(sourcePath, path.extname(sourcePath));
	const extraFields = [];

	if (!hasField(frontmatter, 'title')) {
		extraFields.push(`title: ${escapeYamlString(title)}`);
	}

	if (!hasField(frontmatter, 'description')) {
		extraFields.push(`description: ${escapeYamlString(makeDescription(body, title))}`);
	}

	if (!hasField(frontmatter, 'pubDate')) {
		extraFields.push(`pubDate: ${formatDate(sourceStats.mtime)}`);
	}

	const nextFrontmatter = [frontmatter, ...extraFields].filter(Boolean).join('\n');
	const nextBody = await rewriteObsidianImages(body);
	return `---\n${nextFrontmatter}\n---\n\n${nextBody}`;
};

async function* walkFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			if (!ignoredDirs.has(entry.name)) {
				yield* walkFiles(fullPath);
			}
			continue;
		}

		if (entry.isFile()) {
			yield fullPath;
		}
	}
}

async function* walkMarkdownFiles(dir) {
	for await (const fullPath of walkFiles(dir)) {
		if (isMarkdownFile(fullPath)) {
			yield fullPath;
		}
	}
}

const published = [];

await buildAssetIndex();

for await (const sourcePath of walkMarkdownFiles(sourceRoot)) {
	const rawContent = await readFile(sourcePath, 'utf8');
	const publishedContent = await buildPublishedContent(sourcePath, rawContent);

	if (!publishedContent) {
		continue;
	}

	const relativePath = path.relative(sourceRoot, sourcePath);
	const targetPath = path.join(targetRoot, relativePath);

	await mkdir(path.dirname(targetPath), { recursive: true });
	await writeFile(targetPath, publishedContent);
	published.push(relativePath);
}

if (published.length === 0) {
	console.log(`No published notes found in ${sourceRoot}`);
} else {
	console.log(`Published ${published.length} note(s) to ${targetRoot}`);
	for (const note of published) {
		console.log(`- ${note}`);
	}
	if (copiedAssets.size > 0) {
		console.log(`Copied ${copiedAssets.size} asset(s) to ${targetAssetsRoot}`);
	}
}
