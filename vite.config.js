import { defineConfig } from 'vite'
import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Read article slugs from the source text rather than importing articles.js:
// that module dynamically imports .vue components, which esbuild cannot bundle
// while loading this config. Single source of truth, no drift.
function articleSlugs() {
  const src = readFileSync(resolve(process.cwd(), 'src/blog/articles.js'), 'utf-8')
  return [...src.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
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
      if (existsSync(index)) {
        copyFileSync(index, resolve(dist, '404.html'))
      }
    },
  },
})
