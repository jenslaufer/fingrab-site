import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { articles } from '../src/blog/articles.js'

const sitemapPath = resolve(process.cwd(), 'public/sitemap.xml')
const sitemap = readFileSync(sitemapPath, 'utf-8')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])

describe('Sitemap', () => {
    it('lists a clean URL for every article in articles.js', () => {
        for (const article of articles) {
            const expected = `https://fingrab.app/blog/${article.slug}`
            expect(locs).toContain(expected)
        }
    })

    it('contains the core routes', () => {
        expect(locs).toContain('https://fingrab.app/')
        expect(locs).toContain('https://fingrab.app/blog')
        expect(locs).toContain('https://fingrab.app/privacy')
    })

    it('has no <loc> containing a # fragment', () => {
        for (const loc of locs) {
            expect(loc).not.toContain('#')
        }
    })
})
