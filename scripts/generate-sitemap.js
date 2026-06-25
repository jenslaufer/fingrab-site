// Generate public/sitemap.xml from the article list so it never drifts:
// adding an article to src/blog/articles.js auto-updates the sitemap on build.
// All URLs are clean history-mode paths — no `#` fragments (Google ignores
// everything after `#`, which collapsed every article to the homepage).
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { articles } from '../src/blog/articles.js'

const BASE = 'https://fingrab.app'
const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, '../public/sitemap.xml')

const staticUrls = [
    { loc: `${BASE}/`, changefreq: 'monthly', priority: '1.0' },
    { loc: `${BASE}/blog`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${BASE}/privacy`, changefreq: 'yearly', priority: '0.3' },
]

const articleUrls = articles.map(a => ({
    loc: `${BASE}/blog/${a.slug}`,
    lastmod: a.date,
    changefreq: 'monthly',
    priority: '0.7',
}))

const urls = [...staticUrls, ...articleUrls]

const body = urls
    .map(u => {
        const lastmod = u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''
        return `  <url>
    <loc>${u.loc}</loc>${lastmod}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    })
    .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

writeFileSync(outPath, xml)
console.log(`sitemap.xml written with ${urls.length} URLs (${articleUrls.length} articles)`)
