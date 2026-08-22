import { readdirSync } from 'node:fs';
import path from 'node:path';
import { slug } from 'github-slugger';

const markdownExtensions = new Set(['.md', '.mdx']);
const defaultCalloutTitles = {
	note: 'Note',
	abstract: 'Abstract',
	summary: 'Summary',
	info: 'Info',
	todo: 'Todo',
	tip: 'Tip',
	important: 'Important',
	success: 'Success',
	question: 'Question',
	warning: 'Warning',
	failure: 'Failure',
	danger: 'Danger',
	bug: 'Bug',
	example: 'Example',
	quote: 'Quote',
	theorem: 'Theorem',
	corollary: 'Corollary',
};

const normalizeVaultPath = (value) =>
	value.replaceAll('\\', '/').replace(/^\/+/, '').replace(/\.(?:md|mdx)$/i, '');

const slugifyPath = (value) =>
	normalizeVaultPath(value)
		.split('/')
		.map((segment) => slug(segment))
		.join('/')
		.replace(/\/index$/, '');

const slugifyAssetName = (name) => {
	const parsed = path.parse(name);
	const stem = parsed.name
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-zA-Z0-9._-]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.toLowerCase() || 'asset';

	return `${stem}${parsed.ext.toLowerCase()}`;
};

const walkMarkdownFiles = (directory, relativeDirectory = '') => {
	const files = [];

	for (const entry of readdirSync(directory, { withFileTypes: true })) {
		const relativePath = path.posix.join(relativeDirectory, entry.name);
		if (entry.isDirectory()) {
			files.push(...walkMarkdownFiles(path.join(directory, entry.name), relativePath));
		} else if (entry.isFile() && markdownExtensions.has(path.extname(entry.name).toLowerCase())) {
			files.push(relativePath);
		}
	}

	return files;
};

const buildNoteIndex = (contentRoot) => {
	const notes = walkMarkdownFiles(contentRoot).map((filePath) => {
		const vaultPath = normalizeVaultPath(filePath);
		return {
			vaultPath,
			basename: path.posix.basename(vaultPath),
			slug: slugifyPath(vaultPath),
		};
	});
	const byPath = new Map(notes.map((note) => [note.vaultPath, note]));
	const byBasename = new Map();

	for (const note of notes) {
		const matches = byBasename.get(note.basename) ?? [];
		matches.push(note);
		byBasename.set(note.basename, matches);
	}

	return { byPath, byBasename };
};

const resolveNote = (target, sourcePath, noteIndex, contentRoot) => {
	const vaultTarget = normalizeVaultPath(target);
	const exact = noteIndex.byPath.get(vaultTarget);
	if (exact) {
		return exact;
	}

	if (sourcePath) {
		const sourceVaultPath = normalizeVaultPath(path.relative(contentRoot, sourcePath));
		const siblingPath = path.posix.join(path.posix.dirname(sourceVaultPath), vaultTarget);
		const sibling = noteIndex.byPath.get(siblingPath);
		if (sibling) {
			return sibling;
		}
	}

	const basenameMatches = noteIndex.byBasename.get(path.posix.basename(vaultTarget)) ?? [];
	if (basenameMatches.length <= 1 || !sourcePath) {
		return basenameMatches[0] ?? null;
	}

	const sourceVaultPath = normalizeVaultPath(path.relative(contentRoot, sourcePath));
	const sourceDirectory = path.posix.dirname(sourceVaultPath);
	const rankedMatches = basenameMatches
		.map((note) => ({
			note,
			distance: path.posix.relative(sourceDirectory, note.vaultPath).split('/').length,
		}))
		.sort((a, b) => a.distance - b.distance);

	return rankedMatches[0].distance < rankedMatches[1].distance ? rankedMatches[0].note : null;
};

const parseEmbedSize = (value) => {
	if (!value) {
		return undefined;
	}

	const match = value.trim().match(/^(\d+)(?:x(\d+))?$/i);
	if (!match) {
		return undefined;
	}

	return {
		width: Number(match[1]),
		...(match[2] ? { height: Number(match[2]) } : {}),
	};
};

const createObsidianNode = (embedded, rawValue, sourcePath, options) => {
	const [targetWithHeading, alias] = rawValue.split('|', 2);
	const [target, heading] = targetWithHeading.split('#', 2).map((part) => part.trim());
	const extension = path.extname(target).toLowerCase();

	if (embedded && options.imageExtensions.has(extension)) {
		const assetName = path.basename(target);
		const size = parseEmbedSize(alias);
		return {
			type: 'image',
			url: `${options.assetUrlBase}/${encodeURIComponent(slugifyAssetName(assetName))}`,
			alt: path.parse(assetName).name,
			...(size ? { data: { hProperties: size } } : {}),
		};
	}

	const note = resolveNote(target, sourcePath, options.noteIndex, options.contentRoot);
	const targetSlug = note?.slug ?? slugifyPath(target);
	const headingHash = heading ? `#${slug(heading)}` : '';
	return {
		type: 'link',
		url: `/blog/${targetSlug}/${headingHash}`,
		children: [{ type: 'text', value: alias?.trim() || targetWithHeading.trim() }],
		data: {
			hProperties: {
				className: ['internal-link', ...(!note ? ['unresolved'] : [])],
				...(!note ? { dataUnresolved: 'true' } : {}),
			},
		},
	};
};

const transformWikiLinks = (node, sourcePath, options) => {
	if (!node || typeof node !== 'object') {
		return;
	}

	if (Array.isArray(node.children) && !['link', 'image', 'code', 'inlineCode', 'html'].includes(node.type)) {
		const children = [];
		for (const child of node.children) {
			if (child.type !== 'text') {
				transformWikiLinks(child, sourcePath, options, node.type);
				children.push(child);
				continue;
			}

			const pattern = /(!?)\[\[([^\]\n]+)\]\]/g;
			let lastIndex = 0;
			for (const match of child.value.matchAll(pattern)) {
				if (match.index > lastIndex) {
					children.push({ type: 'text', value: child.value.slice(lastIndex, match.index) });
				}
				children.push(createObsidianNode(match[1] === '!', match[2], sourcePath, options));
				lastIndex = match.index + match[0].length;
			}

			if (lastIndex === 0) {
				children.push(child);
			} else if (lastIndex < child.value.length) {
				children.push({ type: 'text', value: child.value.slice(lastIndex) });
			}
		}
		node.children = children;
	}
};

const transformCallouts = (node) => {
	if (!node || typeof node !== 'object') {
		return;
	}

	if (node.type === 'blockquote') {
		const firstParagraph = node.children?.[0];
		const firstText = firstParagraph?.type === 'paragraph' ? firstParagraph.children?.[0] : null;
		const match = firstText?.type === 'text'
			? firstText.value.match(/^\[!([^\]]+)\]([+-])?(?:[ \t]+([^\n]*))?(?:\n|$)/)
			: null;

		if (match) {
			const type = match[1].trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
			const title = match[3]?.trim() || defaultCalloutTitles[type] || match[1];
			firstText.value = firstText.value.slice(match[0].length);
			if (firstParagraph.children.length === 1 && firstText.value === '') {
				node.children.shift();
			}

			node.children.unshift({
				type: 'paragraph',
				children: [{ type: 'text', value: title }],
				data: { hProperties: { className: ['callout-title'] } },
			});
			node.data = {
				hName: 'aside',
				hProperties: {
					className: ['callout', `callout-${type}`],
					dataCallout: type,
					...(match[2] ? { dataCalloutFold: match[2] } : {}),
				},
			};
		}
	}

	if (Array.isArray(node.children)) {
		node.children.forEach(transformCallouts);
	}
};

export default function remarkObsidian({
	contentRoot = 'src/content/blog',
	assetUrlBase = '/obsidian-assets',
} = {}) {
	const absoluteContentRoot = path.resolve(contentRoot);
	const options = {
		contentRoot: absoluteContentRoot,
		assetUrlBase: assetUrlBase.replace(/\/$/, ''),
		imageExtensions: new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif']),
		noteIndex: buildNoteIndex(absoluteContentRoot),
	};

	return (tree, file) => {
		transformCallouts(tree);
		transformWikiLinks(tree, file.path, options);
	};
}
