# FinGrab Site Context

Landing page for FinGrab.app, a Chrome extension designed to export financial data from Yahoo Finance.

## Tech Stack
- **Framework:** Vue 3 (Composition API with `<script setup>`)
- **Build Tool:** Vite + vite-ssg (static prerender)
- **Styling:** Tailwind CSS v4
- **Routing:** Vue Router, HTML5 history mode (clean URLs, managed by `ViteSSG` in `src/main.js`)
- **SEO/Head Management:** Unhead (@unhead/vue)
- **Deployment:** GitHub Pages (via GitHub Actions)

## Project Structure
- `src/main.js`: Entry point, defines routes and static content passed as props to components.
- `src/App.vue`: Root component, renders `router-view`.
- `src/components/Home.vue`: Main landing page component, uses props for dynamic content.
- `src/style.css`: Global styles including Tailwind directives.
- `.github/workflows/deploy.yml`: CI/CD pipeline for deploying to GitHub Pages.

## Core Content
Content is managed in `src/main.js` within the router configuration. This includes:
- Product name: FinGrab.app
- Headline and UVP (Unique Value Proposition)
- Call to Action (CTA) details and link to the Chrome Web Store.

## Development & Build
- `npm run dev`: Start development server.
- `npm run build`: Build for production (output to `dist/`). Runs `prebuild` first.
- `npm run preview`: Preview the production build locally.
- `npm test`: Run the vitest suite.

## SSG Prerender Pipeline
The blog is prerendered to static HTML at clean URLs so crawlers see real content (no SPA soft-404s). Two stages, one source of truth — `src/blog/articles.js`:

1. **`prebuild` → `scripts/generate-sitemap.js`**: real ES `import` of `articles.js`, writes `public/sitemap.xml` with a clean `/blog/<slug>` URL per article (no `#` fragments).
2. **`vite-ssg build`** (`vite.config.js`): `ssgOptions.includedRoutes()` expands `/blog/:slug` into one prerendered route per article. Slugs come from `articleSlugs()`, which **regex-greps** `articles.js` text (it can't `import` the module — that pulls in `.vue` dynamic imports esbuild won't bundle during config load). `onFinished()` copies `dist/index.html` to `dist/404.html` as the GitHub Pages SPA fallback.

**Divergence guard** (the slug list is derived twice — sitemap import vs. config regex — and they must never disagree, or articles silently vanish from the static output while the sitemap still advertises them, with the build still exiting 0):
- `articleSlugs()` **throws** if it parses zero slugs (e.g. a backtick/computed slug defeats the regex) — never returns `[]`.
- `onFinished()` **throws** if `dist/index.html` is missing.
- `tests/PrerenderSlugGuard.test.js` builds and asserts three slug sets are identical: the real import, the `articleSlugs()` regex, and the emitted `dist/blog/*.html` files.

To add an article: append to `src/blog/articles.js` (and its `.vue` component). The sitemap, prerender routes, and guard test pick it up automatically.

## Deployment
Automated via GitHub Actions on push to `main` branch.
- Deployment target: GitHub Pages.
- Domain: `fingrab.app` (configured via `CNAME` in build step).
- Branch: `site` (pushed to `site` branch by the action).
