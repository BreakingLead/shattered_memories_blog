export const getBaseUrl = (base = import.meta.env.BASE_URL) =>
	base === '/' ? '/' : `${base.replace(/\/+$/, '')}/`;

export const withBase = (path: string | undefined, base = import.meta.env.BASE_URL) => {
	if (!path || /^(?:[a-z]+:)?\/\//i.test(path) || /^[a-z]+:/i.test(path) || path.startsWith('#')) {
		return path;
	}

	const relativePath = path.replace(/^\/+/, '');
	return relativePath ? `${getBaseUrl(base)}${relativePath}` : getBaseUrl(base);
};
