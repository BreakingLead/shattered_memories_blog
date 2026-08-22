import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const distRoot = path.resolve('dist/blog');

const readBuiltPost = (relativePath) =>
	readFile(path.join(distRoot, relativePath, 'index.html'), 'utf8');

const wikiLinkPost = await readBuiltPost('06_日语/8-動詞の未然形とその使い方');
assert.match(
	wikiLinkPost,
	/<a href="\/shattered_memories_blog\/blog\/06_%E6%97%A5%E8%AF%AD\/5-%E5%8A%A8%E8%AF%8D%E7%9A%84%E5%88%86%E7%B1%BB\/#%E4%BA%94%E6%AE%B5%E6%B4%BB%E7%94%A8%E5%8A%A8%E8%AF%8D" class="internal-link">06_日语\/5 动词的分类#五段活用动词<\/a>/,
	'Obsidian wiki links should resolve to the generated Astro route and heading',
);

const embeddedImagePost = await readBuiltPost('06_日语/9-動詞の連用形とその使い方');
assert.match(
	embeddedImagePost,
	/<img src="\/shattered_memories_blog\/obsidian-assets\/pasted-image-20240722045950\.png" alt="Pasted image 20240722045950">/,
	'Obsidian image embeds should render as images from the published asset directory',
);

const calloutPost = await readBuiltPost('07_数学/高等几何/42-pascal-定理和-brianchon-定理');
assert.match(
	calloutPost,
	/<aside class="callout callout-summary" data-callout="summary">/,
	'Obsidian callouts should render as semantic aside elements',
);
assert.match(
	calloutPost,
	/<p class="callout-title">一刷主线<\/p>/,
	'Obsidian callout titles should render separately from their content',
);

const unresolvedLinkPost = await readBuiltPost('07_数学/圆曲/理解二次曲线上的对合的前置知识');
assert.match(
	unresolvedLinkPost,
	/class="internal-link unresolved" data-unresolved="true">二次曲线上的对合（1）sumeragi693<\/a>/,
	'Wiki links to unpublished notes should be visibly marked as unresolved',
);

const ambiguousLinkPost = await readBuiltPost('blog/hott-入门');
assert.match(
	ambiguousLinkPost,
	/<a href="\/shattered_memories_blog\/blog\/05_%E8%AE%A1%E7%AE%97%E6%9C%BA\/lean\/" class="internal-link">Lean<\/a>/,
	'Ambiguous wiki links should resolve to the note with the shortest relative path',
);

console.log('Obsidian rendering checks passed.');
