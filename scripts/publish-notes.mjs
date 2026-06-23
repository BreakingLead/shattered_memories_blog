import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const sourceRoot = process.argv[2] ? path.resolve(process.argv[2]) : '/mnt/ssdmain/note';
const targetRoot = process.argv[3]
	? path.resolve(process.argv[3])
	: path.join(repoRoot, 'src/content/blog');

const ignoredDirs = new Set([
	'.git',
	'.obsidian',
	'node_modules',
	'legacy_trash',
]);

const markdownExtensions = new Set(['.md', '.mdx']);

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

const isMarkdownFile = (filePath) => markdownExtensions.has(path.extname(filePath).toLowerCase());

const escapeYamlString = (value) => `"${String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;

const formatDate = (date) => date.toISOString().slice(0, 10);

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
	return `---\n${nextFrontmatter}\n---\n\n${body}`;
};

async function* walkMarkdownFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			if (!ignoredDirs.has(entry.name)) {
				yield* walkMarkdownFiles(fullPath);
			}
			continue;
		}

		if (entry.isFile() && isMarkdownFile(fullPath)) {
			yield fullPath;
		}
	}
}

const published = [];

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
}
