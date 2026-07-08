// @ts-check

import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const githubPagesBase = '/shattered_memories_blog';
const withBasePath = (path) => `${githubPagesBase.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
const isRootRelative = (value) => typeof value === 'string' && value.startsWith('/') && !value.startsWith(`${githubPagesBase}/`);
const prefixRootRelativeUrls = () => (tree) => {
	const visit = (node) => {
		if (!node || typeof node !== 'object') {
			return;
		}

		if (node.properties) {
			for (const property of ['href', 'src']) {
				if (isRootRelative(node.properties[property])) {
					node.properties[property] = withBasePath(node.properties[property]);
				}
			}
		}

		if (Array.isArray(node.children)) {
			node.children.forEach(visit);
		}
	};

	visit(tree);
};

// https://astro.build/config
export default defineConfig({
	site: 'https://breakinglead.github.io',
	base: githubPagesBase,
	integrations: [mdx(), sitemap()],
	markdown: {
		processor: unified({
			smartypants: false,
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex, prefixRootRelativeUrls],
		}),
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
