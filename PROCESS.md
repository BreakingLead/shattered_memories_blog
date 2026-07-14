# Process Notes

## Commit Timeline

- `415050d` - Initial commit from Astro. Created the base Astro blog scaffold, content collection, starter pages, RSS, assets, and global styling.
- `541adc5` - Build terminal resume homepage. Added `AGENTS.md`, rebuilt the homepage as a terminal-style resume, introduced dark/light theme behavior, and revised header/footer styling.
- `4463775` - add pnpm-workspace.yaml. Adjusted the workspace configuration.
- `741a56b` - Update blog UI and math rendering. Split styles, added the note publishing script, copied published math notes, rebuilt the blog index as a collapsible folder list, and added KaTeX styling support.
- `ec0e1c8` - Switch markdown math to remark rehype. Configured Astro's remark/rehype processor with `remark-math` and `rehype-katex`.
- `dabc965` - Add computer and Japanese notes. Added 49 published Markdown notes under `src/content/blog/05_计算机` and `src/content/blog/06_日语`.
- `cbb537e` - Add blog folder expand toggle. Added a blog-level control to expand or collapse every folder group in the file-browser list.
- `615bc45` - Animate blog folder expansion. Added height, opacity, and vertical-offset transitions for folder content when opening or closing groups.
- `9cc5e96` - Add blog browser discovery tools. Added quick filtering, persistent folder expansion state, and a latest-post jump action to the blog file browser.
- `1353f98` - Migrate blog browser to React island. Added Astro's React integration and moved the interactive blog folder browser from inline page script into `BlogFolderBrowser.tsx`.
- `1e1d609` - Import Zhihu articles. Imported 18 Zhihu posts into `src/content/blog/zhihu/` and saved public profile/article manifests under `data/zhihu/`.
- `3a1de9e` - Fix Vite dev blog browser. Removed the React island path that triggered Vite's dev React refresh failure and restored the blog browser as Astro markup with a local script.
- `4375efe` - Add recent blog ordering. Set the production site URL to Netlify and added a `Folders` / `Recent` switch on the blog list.
- `0b7638c` - Update blog content. Committed the latest blog content changes, added new notes, removed three starter posts, and cleaned a conflict-marker artifact from the high-geometry notes.
- `b0f7312` - Publish Obsidian image assets. Rewrote Obsidian image embeds to public Markdown image URLs and copied referenced note assets into the site.
- `9b0a9d1` - Document Obsidian image assets. Recorded the image publishing workflow, principles, verification steps, and implementation commit hash in this process log.
- `bdb71c6` - Replace about page with CV. Added the `/cv/` resume page, moved navigation from `About` to `CV`, removed the starter about page, and added CV-specific styles.
- `947375e` - Split CV into Chinese and English pages. Moved the English CV to `/cv/en/`, added a Chinese CV at `/cv/zh/`, kept `/cv/` as a redirect, and added language switching.
- Pending - Configure GitHub Pages deployment. Switched production URLs to `https://breakinglead.github.io/shattered_memories_blog/`, added base-path-safe internal links, and configured the Pages workflow for `master`.
- Pending - Continue the C tutorial series. Added `c-tutorial-1.md` as a new lesson about variables, scope, function parameters, null pointers, and dangling pointers.

## Work Process

I first inspected the Astro project structure and kept the changes aligned with the existing `src/pages`, `src/components`, `src/layouts`, and `src/content/blog` layout. The homepage was rewritten as a terminal-card resume and the broad global stylesheet was split into focused files: `theme.css`, `base.css`, `home.css`, and `blog-index.css`.

For note publishing, I added `scripts/publish-notes.mjs` and `pnpm publish:notes`. The script scans `/mnt/ssdmain/note`, reads frontmatter, and copies only Markdown files with `blog-publish: true` into `src/content/blog` while preserving directory structure.

For the blog page, I replaced the card grid with a file-browser style list. Posts are grouped by directory using their content IDs, and each group uses native `<details>` / `<summary>` so the folder list can collapse without client-side JavaScript.

For the later folder control, I added a small button in the blog header. It reads all `.folder-group` details elements, opens or closes them in one pass, and updates its label between `Expand all` and `Collapse all` based on the current state.

For folder animations, I kept the semantic `<details>` and `<summary>` structure but intercepted summary clicks in the blog page script. The script measures the folder content height, animates from `0px` to the measured height when opening, and reverses the transition before finally removing `open` when closing. A `prefers-reduced-motion` check disables the animation for users who request reduced motion.

For the blog browser discovery pass, I chose three small features that fit the file-manager metaphor without adding dependencies. The first is a filter input that matches folder names, titles, descriptions, generated routes, and filenames, then opens matching folders while showing the visible file count. The second is persistent folder state through `localStorage`, so manual expand/collapse choices survive page reloads but gracefully fall back if storage is unavailable. The third is a latest-post action that identifies the newest `pubDate`, marks it with a badge, opens its folder, scrolls it into view, and briefly highlights the row.

For the React migration, I followed Astro's official integration pattern: install `@astrojs/react`, `react`, and `react-dom`; add `react()` to `astro.config.mjs`; and render the complex browser as a `client:load` island. `src/pages/blog/index.astro` now keeps only content loading and prop shaping, while `src/components/BlogFolderBrowser.tsx` owns filter state, folder expansion state, latest-post focus, and event handlers. The folder animation moved from measured inline height changes to a CSS grid-row transition driven by React's `data-open` state.

For the later content import, I added computer and Japanese notes as separate content folders under `src/content/blog`. The Astro content collection handled the new Markdown files without schema changes because each file included `title`, `description`, and `pubDate` frontmatter.

For the Zhihu article import, I used the installed `zhihu-fetcher` skill as the workflow reference. The public profile API exposed the account metadata, but the article-list endpoint required an authenticated browser session. I copied the local Firefox cookie database to `/tmp`, extracted only Zhihu cookie records into `/tmp/zhihu-workspace/zhihu_cookies.json`, and used that temporary cookie file for requests without printing or committing cookie values. The import script fetched `ggmyfriendxd`'s 18 article records, called each `zhuanlan.zhihu.com/api/articles/{id}` endpoint, converted article HTML to Markdown, and wrote the results under `src/content/blog/zhihu/`. A separate `data/zhihu/ggmyfriendxd.articles.json` manifest records source URLs, generated files, and article IDs for future refreshes.

For the Vite dev fix, I reproduced the issue by starting `pnpm dev` and requesting the React island module directly. The page HTML rendered with status 200, but `/src/components/BlogFolderBrowser.tsx` and the Astro React renderer returned 500 from Vite with `Missing field moduleType` in `builtin:vite-react-refresh-wrapper`. The lockfile showed Astro using Vite 7.3.5 while `@astrojs/react` brought `@vitejs/plugin-react` through Vite 8.0.16, so the failure was in the dev-only React refresh path rather than the blog content. I removed the React island, deleted the React integration and dependencies, and moved the blog browser back to server-rendered Astro markup plus a small page script for filtering, expand/collapse state, and latest-post focus.

For the deployment and blog-list update, I set Astro's `site` to `https://infmemories.netlify.app` so canonical URLs, RSS, and sitemap output use the Netlify domain. I also added a two-option blog list control: `Folders` keeps the existing directory tree, and `Recent` shows all posts in descending `pubDate` order. The filter, expand/collapse button, and latest-post jump reuse the same local script and operate on whichever view is active.

For the blog content cleanup, I scanned `src/content/blog` for merge conflict markers and frontmatter problems before committing the pending content edits. The only true conflict artifact was in `07_数学/高等几何/周兴和.md`, where empty `<mark class="conflict ...">` markup had leaked into both the description and body. I replaced it with a plain placeholder description and body, confirmed every Markdown/MDX file had `title` and `pubDate`, and left `markdown-style-guide.md` / `using-mdx.mdx` untouched as requested.

For the Obsidian image fix, I scanned published Markdown for `![[...]]` embeds, copied the referenced source files from `/mnt/ssdmain/note/assets` into `public/obsidian-assets/`, and rewrote the Markdown to standard `![alt](/obsidian-assets/file.ext)` image syntax. I also updated `scripts/publish-notes.mjs` so future `pnpm publish:notes` runs build an asset index from the note vault, copy referenced image files, and rewrite Obsidian image embeds during publishing instead of leaving broken links in Astro content.

For the current content checkpoint, I inspected the worktree before writing this note. `src/content/blog/07_数学/高等几何/周兴和.md` has an uncommitted change that reintroduces empty `<mark class="conflict ...">` markup in the description and body. Treat that file as unresolved content: clean or regenerate it intentionally before including it in the next content commit.

For the CV page migration, I replaced the starter `about.astro` route with `src/pages/cv.astro` and updated the header navigation from `About` to `CV`. The public resume content was based on `/mnt/ssdmain/note/ira-memories/簡歷.typ`, the existing homepage summary, and the public GitHub profile for `BreakingLead`. I kept private contact details such as phone and WeChat out of the public page, while retaining email, GitHub, blog, project, skill, experience, and education information. CV-specific styling lives in `src/styles/cv.css` instead of expanding global or homepage CSS.

For the bilingual CV split, I moved the original English resume to `src/pages/cv/en.astro`, added a Chinese version at `src/pages/cv/zh.astro`, and kept `/cv/` as a lightweight redirect page to `/cv/zh/`. Both language pages share `src/styles/cv.css` and include an in-page language switcher, while the site header points to the Chinese CV as the default public entry.

For the GitHub Pages deployment pass, I changed Astro's production `site` back to `https://breakinglead.github.io` and set `base` to `/shattered_memories_blog` because this repository deploys as a project site. I added `src/lib/paths.ts` so component and page links can consistently prepend `import.meta.env.BASE_URL`, updated RSS and CV/blog links to use it, and added a Markdown rehype pass that prefixes root-relative Markdown `href` and `src` values such as `/obsidian-assets/...`. The GitHub Pages workflow now listens to the current local branch, `master`, and uses the existing Astro Pages action flow.

For the second C tutorial lesson, I read the completed `c-tutorial-0.md` first and kept its memory-model teaching frame. The new article separates declaration, definition, and initialization; distinguishes scope from lifetime; explains C's pass-by-value model through pointer parameters; and connects array decay, `NULL`, and dangling pointers to the question of whether an address still refers to a live object. The ending deliberately leads into stack storage, heap storage, and `malloc` for the next lesson.

## Theme Principle

The light/dark mode works through CSS custom properties. `theme.css` defines semantic tokens such as `--bg`, `--text`, `--surface`, `--border`, and `--accent`. A small inline script in `BaseHead.astro` reads `localStorage.theme`, falls back to `prefers-color-scheme`, and sets `document.documentElement.dataset.theme`. Components then use the same semantic variables, so switching theme only changes token values rather than duplicating component styles.

## Math Rendering Principle

Astro's default Markdown path did not render LaTeX. The current implementation uses Astro's remark/rehype pipeline through `unified()` from `@astrojs/markdown-remark`. `remark-math` parses inline and display math into Markdown AST nodes, and `rehype-katex` renders those nodes to KaTeX HTML. `BaseHead.astro` imports `katex/dist/katex.min.css` so the generated markup has the required fonts and layout.

The important fix was to prefer the standard plugin chain over a project-local renderer. It keeps inline formulas in valid paragraph structure and makes the math path easier for future contributors to recognize.

## Lessons Learned

- The remark/rehype route is simpler for this project because `remark-math` and `rehype-katex` are established plugins with fewer local moving parts.
- Astro scoped styles do not automatically match Markdown slot content. Use `:global(...)` or global CSS for generated Markdown/KaTeX selectors.
- Generated output must be checked, not just config. Searching `dist` for `.katex-display` quickly revealed whether formulas were converted.
- Native HTML elements such as `<details>` are enough for individual collapsible folder lists; a tiny script is only needed for coordinated actions like expanding or collapsing all folders.
- Native `<details>` closes immediately, so smooth close animations require delaying removal of the `open` attribute until the transition finishes.
- Lightweight discovery features should reuse server-rendered content data whenever possible. Adding `data-search-text`, `data-folder-id`, and `data-latest` kept the client script simple and avoided a second client-side data model.
- Persisted UI state should be treated as optional. Wrapping `localStorage` reads and writes prevents privacy-mode or quota errors from breaking the blog list.
- In Astro, React is useful when several controls share state. The blog browser had filtering, expand-all, per-folder state, persistence, and latest-post focus, so moving it to a React island made the state model clearer than coordinating many DOM queries.
- Props passed into hydrated islands should be plain serializable data. The Astro page converts content entries into strings, booleans, and arrays before passing them to React.
- Browser cookies should be treated as runtime credentials. Keep extracted cookies in `/tmp` or another ignored workspace, never print their values, and never store them beside imported content.
- Imported third-party HTML needs normalization before it enters the Astro content collection. Every generated Markdown file must include the required `title` and `pubDate` fields so `pnpm build` catches bad imports immediately.
- Zhihu equation images can preserve visual formulas even when the source is not native Markdown math. This is acceptable for a first import, but future cleanup could decode equation URLs into LaTeX where useful.
- A dependency can pass production build while still breaking dev HMR. When Vite reports a client-only transform failure, request the exact module URL from the dev server before changing content or routes.
- React is not worth keeping for a small isolated widget when it pulls in a fragile dev transform path. The folder browser is simple enough as Astro HTML plus scoped browser script.
- Canonical site configuration should be verified in generated files, not just in `astro.config.mjs`; checking `dist/rss.xml` and `dist/sitemap-0.xml` catches stale deployment URLs.
- A second list view should reuse the same post row data instead of introducing a separate content model. The recent view is just a pre-sorted projection of the same content entries.
- Content cleanup should separate real defects from intentional placeholders. `占坑`, `待续`, and `empty` can be valid note states, while explicit conflict markup should be removed before publishing.
- Obsidian image embeds are editor-specific syntax, not portable Markdown. Published notes should use public/static asset URLs so Astro and deployed static hosts can serve them without Obsidian resolution logic.
- Asset filenames need URL-safe normalization, but the original filename should remain the lookup key. This lets notes keep human-readable Obsidian names while the site serves predictable lowercase paths.
- Tutorial installments should advance one conceptual layer at a time. Reusing the previous lesson's memory and address model made scope, lifetime, and pointer validity feel like consequences of the same model instead of unrelated C rules.

## Verification

- `pnpm build` passed after the final changes.
- `dist` contains `.katex` / `.katex-display` output for math posts.
- Work was committed as `741a56b`.
- The remark/rehype switch was verified with `pnpm build` and committed as `ec0e1c8`.
- The computer and Japanese note import was verified with `pnpm build`, producing 80 pages, and committed as `dabc965`.
- The expand/collapse-all control was verified with `pnpm build` and committed as `cbb537e`.
- The folder expansion animation was verified with `pnpm build` and committed as `615bc45`.
- The blog browser discovery tools were verified with `pnpm build`; the generated `/blog/index.html` contains the filter input, latest-post marker, and folder state script. The feature commit is `9cc5e96`.
- The React migration was verified with `pnpm build`; `/blog/index.html` contains an `astro-island` for `BlogFolderBrowser`, and searches confirmed the old blog folder DOM-query script was removed. The migration commit is `1353f98`.
- The Zhihu article import was verified with `pnpm build`, which generated 98 pages including 18 `/blog/zhihu/...` routes. The import commit is `1e1d609`.
- The Vite dev fix was verified with `pnpm build` and `pnpm dev`; `/blog/` and a `/blog/zhihu/...` article returned 200 in dev, and the generated blog page no longer references `astro-island`, `@astrojs/react`, or React refresh modules. The fix commit is `3a1de9e`.
- The Netlify site URL and recent-post view were verified with `pnpm build`; generated RSS and sitemap output use `https://infmemories.netlify.app`, and `dist/blog/index.html` contains the `Folders` / `Recent` view controls. The commit is `4375efe`.
- The blog content cleanup was verified by scanning for conflict markers, checking required frontmatter fields, and running `pnpm build`, which generated 105 pages. The content commit is `0b7638c`.
- The Obsidian image fix was verified by confirming no `![[...]]` image embeds remain in `src/content/blog`, checking every `/obsidian-assets/...` Markdown reference has a matching file in `public/obsidian-assets`, sampling generated HTML image tags, and running `pnpm build`. The commit is `b0f7312`.
- The Obsidian image process documentation was committed as `9b0a9d1`.
- Current verification before this note: `git status --short` shows only `src/content/blog/07_数学/高等几何/周兴和.md` plus this `PROCESS.md` edit as pending work.
- The CV route migration was verified with `pnpm build`, which generated `dist/cv/index.html` and no longer generated an `/about/` route. The implementation commit is `bdb71c6`.
- The bilingual CV split was verified with `pnpm build`, which generated `dist/cv/index.html`, `dist/cv/zh/index.html`, and `dist/cv/en/index.html`. The implementation commit is `947375e`.
- The GitHub Pages deployment configuration was verified with `pnpm build`, which generated 107 pages. A `rg -P '(?:href|src)="/(?!shattered_memories_blog(?:/|")|_astro/)' dist -n` scan found no unprefixed root-relative links in generated `href` or `src` attributes, and sampled RSS/CV/blog article output uses `https://breakinglead.github.io/shattered_memories_blog/` or `/shattered_memories_blog/...` URLs. The commit hash is pending.
- The second C tutorial lesson was verified with `pnpm build`, which generated 110 pages including `/blog/c-tutorial-1/index.html`. The commit hash is pending.
