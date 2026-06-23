# Process Notes

## Commit Timeline

- `415050d` - Initial commit from Astro. Created the base Astro blog scaffold, content collection, starter pages, RSS, assets, and global styling.
- `541adc5` - Build terminal resume homepage. Added `AGENTS.md`, rebuilt the homepage as a terminal-style resume, introduced dark/light theme behavior, and revised header/footer styling.
- `4463775` - add pnpm-workspace.yaml. Adjusted the workspace configuration.
- `741a56b` - Update blog UI and math rendering. Split styles, added the note publishing script, copied published math notes, rebuilt the blog index as a collapsible folder list, and fixed Markdown math rendering with Sätteri plus KaTeX.

## Work Process

I first inspected the Astro project structure and kept the changes aligned with the existing `src/pages`, `src/components`, `src/layouts`, and `src/content/blog` layout. The homepage was rewritten as a terminal-card resume and the broad global stylesheet was split into focused files: `theme.css`, `base.css`, `home.css`, and `blog-index.css`.

For note publishing, I added `scripts/publish-notes.mjs` and `pnpm publish:notes`. The script scans `/mnt/ssdmain/note`, reads frontmatter, and copies only Markdown files with `blog-publish: true` into `src/content/blog` while preserving directory structure.

For the blog page, I replaced the card grid with a file-browser style list. Posts are grouped by directory using their content IDs, and each group uses native `<details>` / `<summary>` so the folder list can collapse without client-side JavaScript.

## Theme Principle

The light/dark mode works through CSS custom properties. `theme.css` defines semantic tokens such as `--bg`, `--text`, `--surface`, `--border`, and `--accent`. A small inline script in `BaseHead.astro` reads `localStorage.theme`, falls back to `prefers-color-scheme`, and sets `document.documentElement.dataset.theme`. Components then use the same semantic variables, so switching theme only changes token values rather than duplicating component styles.

## Math Rendering Principle

Astro's default Markdown path did not render LaTeX. I switched Markdown processing to `@astrojs/markdown-satteri` and enabled `features.math`. Sätteri parses math but emits it as `<code class="language-math math-inline">` or `<pre><code class="language-math math-display">`. The local plugin `src/lib/satteri-katex.mjs` runs in the HAST phase, detects those nodes, and replaces them with `katex.renderToString()` output. `BaseHead.astro` imports `katex/dist/katex.min.css` so the generated KaTeX HTML is visible.

The important fix was to use only the HAST plugin path. Returning raw HTML from the MDAST math visitor wrapped inline formulas in extra paragraphs and produced invalid HTML. HAST replacement preserves inline formulas inside the current paragraph and display formulas as block KaTeX output.

## Lessons Learned

- Sätteri supports math parsing, but it does not render math by itself; a renderer such as KaTeX is still required.
- Astro scoped styles do not automatically match Markdown slot content. Use `:global(...)` or global CSS for generated Markdown/KaTeX selectors.
- Smart punctuation can corrupt TeX-like syntax. `smartPunctuation: false` is safer for math-heavy Markdown.
- Generated output must be checked, not just config. Searching `dist` for `language-math`, `.katex-display`, and malformed annotations quickly revealed whether formulas were converted.
- Native HTML elements such as `<details>` are enough for simple collapsible folder lists and avoid unnecessary JavaScript.

## Verification

- `pnpm build` passed after the final changes.
- `dist` contains `.katex` / `.katex-display` output for math posts.
- No `language-math`, `math-inline`, or `math-display` nodes remain in built blog HTML.
- Work was committed as `741a56b`.
