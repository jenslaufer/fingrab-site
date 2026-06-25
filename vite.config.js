import { defineConfig } from 'vite'
import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Read article slugs from the source text rather than importing articles.js:
// that module dynamically imports .vue components, which esbuild cannot bundle
// while loading this config. Single source of truth, no drift.
// Exported so tests can assert these slugs match the real import + the build.
export function articleSlugs() {
  const src = readFileSync(resolve(process.cwd(), 'src/blog/articles.js'), 'utf-8')
  const slugs = [...src.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
  // Returning [] would silently drop EVERY article from the prerender while the
  // build still exits 0 — the exact soft-404 bug #8 fixed. Fail loud instead:
  // a refactor (backtick/computed slug) that defeats the regex must break here.
  if (slugs.length === 0) {
    throw new Error(
      'articleSlugs(): parsed 0 slugs from src/blog/articles.js — the slug regex ' +
      'no longer matches. Prerender would drop all articles. Fix the regex or the source.'
    )
  }
  return slugs
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()],
  // vite-ssg reads this block.
  ssgOptions: {
    // Prerender every static route to real HTML, expanding /blog/:slug
    // from the article list so each article becomes its own crawlable URL.
    includedRoutes() {
      return [
        '/',
        '/privacy',
        '/blog',
        ...articleSlugs().map(slug => `/blog/${slug}`),
      ]
    },
    // GitHub Pages SPA fallback: any deep link that lacks a prerendered
    // file serves 404.html, which boots the SPA instead of hard-404ing.
    onFinished() {
      const dist = resolve(process.cwd(), 'dist')
      const index = resolve(dist, 'index.html')
      // No index.html means the homepage failed to prerender — without it the
      // SPA fallback is missing and deep links hard-404. Fail loud, don't skip.
      if (!existsSync(index)) {
        throw new Error('onFinished(): dist/index.html missing — cannot create 404.html SPA fallback.')
      }
      copyFileSync(index, resolve(dist, '404.html'))
    },
  },
})
