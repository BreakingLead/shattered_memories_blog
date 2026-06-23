# Repository Guidelines

## Project Structure & Module Organization

This is an Astro blog project. Route pages live in `src/pages/`, including `src/pages/blog/[...slug].astro` for generated blog post routes. Reusable UI components are in `src/components/`, page layouts are in `src/layouts/`, and Markdown processing helpers are in `src/lib/`. Blog content lives under `src/content/blog/`; imported notes may preserve nested folders. Styles are split by scope in `src/styles/`, while images and local fonts belong in `src/assets/`. Static files served as-is should go in `public/`.

## Build, Test, and Development Commands

Use `pnpm` from the repository root.

- `pnpm dev`: start the Astro development server.
- `pnpm build`: build the static site into `dist/` and validate content/routes.
- `pnpm preview`: serve the production build locally.
- `pnpm publish:notes`: copy Markdown notes from `/mnt/ssdmain/note` when their frontmatter has `blog-publish: true`.
- `pnpm astro -- --help`: inspect Astro CLI options.

## Coding Style & Naming Conventions

Use ES modules and Astro/TypeScript-friendly syntax. Follow nearby file style: existing Astro, CSS, and script files mostly use tabs. Name components in PascalCase, such as `BaseHead.astro`; keep route filenames lowercase or bracketed for dynamic routes. Prefer descriptive Markdown filenames and stable directory names for blog content. Keep page-specific CSS in files such as `home.css` or `blog-index.css`; reserve `theme.css` and `base.css` for shared tokens and base elements.

## Testing Guidelines

No dedicated test runner is configured. Treat `pnpm build` as the required verification step before submitting UI, Markdown, route, or content schema changes. For math-heavy posts, also inspect generated output for KaTeX classes such as `.katex` and ensure raw `language-math` nodes are not left in built HTML.

## Commit & Pull Request Guidelines

Recent commits use concise imperative messages, for example `Update blog UI and math rendering` and `Document implementation process`. Keep commits focused and include generated content only when it is intended to be published. Pull requests should include a short summary, verification steps, linked issues when relevant, and screenshots for visual changes.

## Process Documentation

Maintain `PROCESS.md` when making substantial repository changes. Record what changed, the implementation process, core principles, lessons learned, and the relevant commit hash for each work batch. Keep entries factual and useful for future contributors; avoid duplicating full diffs.

## Security & Configuration Tips

Do not commit secrets or local environment files. Update `site` in `astro.config.mjs` before production deployment so canonical URLs, RSS, and sitemap output are correct.
