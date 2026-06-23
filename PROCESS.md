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

## Work Process

I first inspected the Astro project structure and kept the changes aligned with the existing `src/pages`, `src/components`, `src/layouts`, and `src/content/blog` layout. The homepage was rewritten as a terminal-card resume and the broad global stylesheet was split into focused files: `theme.css`, `base.css`, `home.css`, and `blog-index.css`.

For note publishing, I added `scripts/publish-notes.mjs` and `pnpm publish:notes`. The script scans `/mnt/ssdmain/note`, reads frontmatter, and copies only Markdown files with `blog-publish: true` into `src/content/blog` while preserving directory structure.

For the blog page, I replaced the card grid with a file-browser style list. Posts are grouped by directory using their content IDs, and each group uses native `<details>` / `<summary>` so the folder list can collapse without client-side JavaScript.

For the later folder control, I added a small button in the blog header. It reads all `.folder-group` details elements, opens or closes them in one pass, and updates its label between `Expand all` and `Collapse all` based on the current state.

For folder animations, I kept the semantic `<details>` and `<summary>` structure but intercepted summary clicks in the blog page script. The script measures the folder content height, animates from `0px` to the measured height when opening, and reverses the transition before finally removing `open` when closing. A `prefers-reduced-motion` check disables the animation for users who request reduced motion.

For the later content import, I added computer and Japanese notes as separate content folders under `src/content/blog`. The Astro content collection handled the new Markdown files without schema changes because each file included `title`, `description`, and `pubDate` frontmatter.

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

## Verification

- `pnpm build` passed after the final changes.
- `dist` contains `.katex` / `.katex-display` output for math posts.
- Work was committed as `741a56b`.
- The remark/rehype switch was verified with `pnpm build` and committed as `ec0e1c8`.
- The computer and Japanese note import was verified with `pnpm build`, producing 80 pages, and committed as `dabc965`.
- The expand/collapse-all control was verified with `pnpm build` and committed as `cbb537e`.
- The folder expansion animation was verified with `pnpm build` and committed as `615bc45`.
