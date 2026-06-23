import React, { useEffect, useMemo, useRef, useState } from "react";

type BlogPostItem = {
	id: string;
	title: string;
	description: string;
	pubDate: string;
	formattedDate: string;
	filename: string;
	href: string;
	path: string;
	isLatest: boolean;
	searchText: string;
};

type BlogFolderGroup = {
	directory: string;
	posts: BlogPostItem[];
};

type Props = {
	groups: BlogFolderGroup[];
	directoryCount: number;
	postCount: number;
};

const FOLDER_STATE_KEY = "blog-folder-state:v1";
const FOCUS_DURATION = 1400;

const createInitialOpenFolders = (groups: BlogFolderGroup[]) =>
	Object.fromEntries(groups.map((group) => [group.directory, true]));

const formatVisibleCount = (
	activeFilter: string,
	visibleFiles: number,
	visibleFolders: number,
) =>
	activeFilter
		? `${visibleFiles} files in ${visibleFolders} folders`
		: `${visibleFiles} files visible`;

export default function BlogFolderBrowser({
	groups,
	directoryCount,
	postCount,
}: Props) {
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(() =>
		createInitialOpenFolders(groups),
	);
	const [filter, setFilter] = useState("");
	const [focusedPostId, setFocusedPostId] = useState<string | null>(null);
	const rowRefs = useRef<Record<string, HTMLLIElement | null>>({});

	const normalizedFilter = filter.toLowerCase().trim();
	const latestPost = useMemo(
		() => groups.flatMap((group) => group.posts).find((post) => post.isLatest),
		[groups],
	);

	const visibleGroups = useMemo(() => {
		return groups
			.map((group) => {
				const folderMatches =
					normalizedFilter.length > 0 &&
					group.directory.toLowerCase().includes(normalizedFilter);
				const posts = group.posts.filter((post) => {
					return (
						!normalizedFilter ||
						folderMatches ||
						post.searchText.includes(normalizedFilter)
					);
				});

				return {
					...group,
					posts,
					isVisible: !normalizedFilter || posts.length > 0,
				};
			})
			.filter((group) => group.isVisible);
	}, [groups, normalizedFilter]);

	const visibleFiles = visibleGroups.reduce(
		(total, group) => total + group.posts.length,
		0,
	);
	const allFoldersOpen = groups.every(
		(group) => openFolders[group.directory] !== false,
	);
	const filterStatus = formatVisibleCount(
		normalizedFilter,
		visibleFiles,
		visibleGroups.length,
	);

	useEffect(() => {
		try {
			const rawState = localStorage.getItem(FOLDER_STATE_KEY);
			const savedState = rawState ? JSON.parse(rawState) : null;

			if (savedState && typeof savedState === "object") {
				setOpenFolders((current) => ({
					...current,
					...(savedState as Record<string, boolean>),
				}));
			}
		} catch {
			// Folder state is optional; the browser remains usable without storage.
		}
	}, []);

	useEffect(() => {
		if (!normalizedFilter) return;

		setOpenFolders((current) => {
			const next = { ...current };
			let changed = false;

			for (const group of visibleGroups) {
				if (!next[group.directory]) {
					next[group.directory] = true;
					changed = true;
				}
			}

			return changed ? next : current;
		});
	}, [normalizedFilter, visibleGroups]);

	const persistOpenFolders = (nextState: Record<string, boolean>) => {
		try {
			localStorage.setItem(FOLDER_STATE_KEY, JSON.stringify(nextState));
		} catch {
			// Folder state is optional; the browser remains usable without storage.
		}
	};

	const updateOpenFolders = (
		updater: (current: Record<string, boolean>) => Record<string, boolean>,
		persist = true,
	) => {
		setOpenFolders((current) => {
			const next = updater(current);
			if (persist) {
				persistOpenFolders(next);
			}
			return next;
		});
	};

	const setFolderOpen = (directory: string, shouldOpen: boolean) => {
		updateOpenFolders((current) => ({
			...current,
			[directory]: shouldOpen,
		}));
	};

	const toggleAllFolders = () => {
		const shouldOpen = !allFoldersOpen;
		updateOpenFolders(() =>
			Object.fromEntries(
				groups.map((group) => [group.directory, shouldOpen]),
			),
		);
	};

	const jumpToLatestPost = () => {
		if (!latestPost) return;

		setFilter("");
		const latestGroup = groups.find((group) =>
			group.posts.some((post) => post.id === latestPost.id),
		);
		if (latestGroup) {
			setFolderOpen(latestGroup.directory, true);
		}

		window.setTimeout(() => {
			const row = rowRefs.current[latestPost.id];
			row?.scrollIntoView({
				behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
					? "auto"
					: "smooth",
				block: "center",
			});
			setFocusedPostId(latestPost.id);
			window.setTimeout(() => setFocusedPostId(null), FOCUS_DURATION);
		}, 230);
	};

	return (
		<>
			<header className="browser-header">
				<div>
					<p className="browser-kicker">/src/content/blog</p>
					<h1>Blog Files</h1>
					<p className="browser-summary">
						Browse notes as a folder tree. Published Markdown and MDX entries
						are listed with their generated route, date, and short description.
					</p>
				</div>
				<div className="browser-actions">
					<div className="browser-stats" aria-label="Blog library stats">
						<span>{directoryCount} folders</span>
						<span>{postCount} files</span>
					</div>
					<div className="browser-controls">
						<label className="blog-search">
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="m21 21-4.3-4.3" />
								<circle cx="11" cy="11" r="7" />
							</svg>
							<input
								type="search"
								value={filter}
								onChange={(event) => setFilter(event.currentTarget.value)}
								placeholder="Filter files"
								aria-label="Filter blog files"
								autoComplete="off"
							/>
						</label>
						<button
							className="folder-action"
							type="button"
							onClick={jumpToLatestPost}
						>
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="M12 5v14M5 12h14" />
							</svg>
							<span>Latest</span>
						</button>
						<button
							className="folder-action"
							type="button"
							aria-expanded={allFoldersOpen}
							onClick={toggleAllFolders}
						>
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="M4 6h16M4 12h16M4 18h16" />
							</svg>
							<span>{allFoldersOpen ? "Collapse all" : "Expand all"}</span>
						</button>
					</div>
				</div>
			</header>

			<section className="path-bar" aria-label="Current path">
				<span className="path-prompt">$</span>
				<span>ls -la ./blog</span>
				<span className="path-result">{filterStatus}</span>
			</section>

			<section className="folder-list" aria-label="Blog posts by folder">
				{visibleGroups.map((group, index) => {
					const isOpen = openFolders[group.directory] !== false;
					const panelId = `folder-panel-${index}-${group.directory.replaceAll(
						/[^a-zA-Z0-9_-]/g,
						"-",
					)}`;

					return (
						<section
							className="folder-group"
							data-open={isOpen}
							key={group.directory}
						>
							<button
								className="folder-heading"
								type="button"
								aria-expanded={isOpen}
								aria-controls={panelId}
								onClick={() => setFolderOpen(group.directory, !isOpen)}
							>
								<span className="folder-toggle" aria-hidden="true">
									<svg viewBox="0 0 24 24">
										<path d="m9 6 6 6-6 6" />
									</svg>
								</span>
								<span className="folder-icon" aria-hidden="true">
									<svg viewBox="0 0 24 24">
										<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
									</svg>
								</span>
								<span>
									<span className="folder-title">{group.directory}</span>
									<span className="folder-count">
										{group.posts.length} file{group.posts.length === 1 ? "" : "s"}
									</span>
								</span>
							</button>

							<div className="folder-panel" id={panelId}>
								<ul className="file-list">
									{group.posts.map((post) => (
										<li
											className={`file-row${
												focusedPostId === post.id ? " is-focused" : ""
											}`}
											key={post.id}
											ref={(element) => {
												rowRefs.current[post.id] = element;
											}}
										>
											<a href={post.href} className="file-link">
												<span className="file-icon" aria-hidden="true">
													<svg viewBox="0 0 24 24">
														<path d="M6 3.5h8l4 4v13H6v-17Z" />
														<path d="M14 3.5v4h4" />
														<path d="M9 12h6M9 15h6M9 18h4" />
													</svg>
												</span>
												<span className="file-main">
													<span className="file-title-row">
														<span className="file-title">{post.title}</span>
														{post.isLatest && (
															<span className="latest-badge">Latest</span>
														)}
													</span>
													<span className="file-description">
														{post.description}
													</span>
													<span className="file-path">{post.path}</span>
												</span>
												<span className="file-meta">
													<span className="file-name">{post.filename}</span>
													<time dateTime={post.pubDate}>{post.formattedDate}</time>
												</span>
											</a>
										</li>
									))}
								</ul>
							</div>
						</section>
					);
				})}
				{visibleFiles === 0 && <p className="empty-state">No matching posts.</p>}
			</section>
		</>
	);
}
