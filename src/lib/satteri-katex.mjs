import katex from 'katex';

const classList = (node) => {
	const className = node.properties?.className ?? node.properties?.class;
	if (Array.isArray(className)) {
		return className.map(String);
	}
	if (typeof className === 'string') {
		return className.split(/\s+/);
	}
	return [];
};

const textContent = (node) => {
	if (node.type === 'text') {
		return node.value;
	}
	if (!('children' in node)) {
		return '';
	}
	return node.children.map(textContent).join('');
};

const mathNode = (tex, displayMode) => ({
	type: 'raw',
	value: katex.renderToString(tex, {
		displayMode,
		throwOnError: false,
		strict: false,
	}),
});

export const satteriKatexPlugin = {
	name: 'satteri-katex',
	element: {
		filter: ['code', 'pre'],
		visit(node) {
			const classes = classList(node);

			if (node.tagName === 'code' && classes.includes('math-inline')) {
				return mathNode(textContent(node), false);
			}

			if (node.tagName !== 'pre') {
				return;
			}

			const code = node.children?.find((child) => child.type === 'element' && child.tagName === 'code');
			if (!code || !classList(code).includes('language-math')) {
				return;
			}

			return mathNode(textContent(code), true);
		},
	},
};
