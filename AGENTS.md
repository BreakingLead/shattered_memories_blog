# Repository Guidelines

## Project Structure & Module Organization
This is an Astro blog project. Route pages live in `src/pages/`, with dynamic blog posts handled by `src/pages/blog/[...slug].astro`. Reusable UI is in `src/components/`, page wrappers are in `src/layouts/`, and global styles are in `src/styles/global.css`. Blog content is stored as Markdown or MDX in `src/content/blog/` and validated by `src/content.config.ts`. Source-managed images and fonts belong in `src/assets/`; static files served unchanged belong in `public/`.

## Build, Test, and Development Commands
Run commands from the repository root with `pnpm`.

- `pnpm install`: install dependencies from `pnpm-lock.yaml`.
- `pnpm dev`: start the local Astro dev server, usually at `http://localhost:4321`.
- `pnpm build`: create a production build in `dist/` and validate Astro pages.
- `pnpm preview`: serve the production build locally.
- `pnpm astro -- --help`: inspect available Astro CLI commands.

## Coding Style & Naming Conventions
Use TypeScript-friendly Astro conventions and ES modules. Existing files use tabs for indentation in `.astro`, `.ts`, `.mjs`, and CSS files; keep that style when editing nearby code. Name Astro components in PascalCase, such as `BaseHead.astro`, and keep route files lowercase to match URL paths. Blog entries should use descriptive kebab-case filenames, for example `markdown-style-guide.md`.

## Testing Guidelines
There is no dedicated test runner configured yet. Treat `pnpm build` as the required verification step before submitting UI, routing, content schema, or Markdown/MDX changes. When adding tests later, document the command in `package.json` and place tests near the code they cover or in a clearly named test directory.

## Commit & Pull Request Guidelines
The current history only contains the initial Astro commit, so no project-specific commit convention is established. Use concise imperative commit messages, for example `Update homepage resume UI` or `Add blog content schema`. Pull requests should include a short summary, verification steps such as `pnpm build`, linked issues when applicable, and screenshots for visual changes.

## Security & Configuration Tips
Update `site` in `astro.config.mjs` before deploying so canonical URLs, RSS, and sitemap output are correct. Do not commit secrets or local environment files; add required environment variables to documentation instead.
