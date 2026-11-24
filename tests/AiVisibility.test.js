// @vitest-environment node
// Checks the build output an LLM crawler or AI agent reads: robots.txt,
// llms.txt, the Markdown copies of the pages, the JSON-LD, the IndexNow key
// and the plain sentence on the homepage. dist/ comes from tests/build.setup.js.
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { articles } from '../src/blog/articles.js'
import { FREE_EXPORTS, PRODUCT_SUMMARY, STORE_URL } from '../src/config.js'

const BASE = 'https://fingrab.app'
const dist = (...p) => resolve(process.cwd(), 'dist', ...p)
const read = (...p) => readFileSync(dist(...p), 'utf-8')

const PAGES = [
    'index.html',
    'privacy.html',
    'blog.html',
    'stock-prices-in-excel.html',
    ...articles.map(a => `blog/${a.slug}.html`),
]

// Every JSON-LD node on a page, @graph flattened.
function jsonLd(page) {
    const blocks = [...read(page).matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    return blocks.flatMap(m => {
        const data = JSON.parse(m[1])
        return data['@graph'] ?? [data]
    })
}
const ofType = (nodes, type) => nodes.filter(n => n['@type'] === type)

describe('robots.txt', () => {
    const robots = read('robots.txt')
    const crawlers = [
        'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User',
        'PerplexityBot', 'Perplexity-User', 'Bingbot', 'Googlebot',
        'GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot',
    ]

    it.each(crawlers)('names %s explicitly', bot => {
        expect(robots).toMatch(new RegExp(`^User-agent: ${bot}$`, 'm'))
    })

    it('blocks nothing', () => {
        expect(robots).not.toMatch(/^Disallow:\s*\S/m)
    })

    it('keeps the catch-all rule and the sitemap', () => {
        expect(robots).toMatch(/^User-agent: \*\nAllow: \/$/m)
        expect(robots).toContain(`Sitemap: ${BASE}/sitemap.xml`)
    })

    it('records the training-crawler decision', () => {
        expect(robots).toMatch(/training crawlers: allowed/i)
    })
})

describe('llms.txt', () => {
    const llms = read('llms.txt')
    const mdLinks = [...llms.matchAll(/\]\((https:\/\/fingrab\.app\/[^)]+\.md)\)/g)].map(m => m[1])

    it('opens with the name as H1 and the summary as blockquote', () => {
        const [h1, , quote] = llms.split('\n')
        expect(h1).toBe('# FinGrab')
        expect(quote).toBe(`> ${PRODUCT_SUMMARY}`)
    })

    it('links the Markdown copies of the key pages', () => {
        expect(mdLinks).toContain(`${BASE}/index.md`)
        expect(mdLinks).toContain(`${BASE}/stock-prices-in-excel.md`)
        for (const a of articles) expect(mdLinks).toContain(`${BASE}/blog/${a.slug}.md`)
    })

    it('links only Markdown files the build emits', () => {
        for (const url of mdLinks) expect(existsSync(dist(url.slice(BASE.length + 1)))).toBe(true)
    })

    it('states the shipped free-export count and no other', () => {
        const counts = [...llms.matchAll(/(\d+)\s+free\s+exports?/gi)].map(m => Number(m[1]))
        expect(counts.length).toBeGreaterThan(0)
        expect(counts.every(n => n === FREE_EXPORTS)).toBe(true)
    })

    it('links the Chrome Web Store listing', () => {
        expect(llms).toContain(STORE_URL)
    })
})

describe('Markdown copies', () => {
    it.each(PAGES)('%s has a Markdown twin with its title and content', page => {
        const md = read(page.replace(/\.html$/, '.md'))
        const title = read(page).match(/<title>([^<]*)<\/title>/)[1]
        expect(md.startsWith(`# ${title.replace(/&amp;/g, '&')}\n`)).toBe(true)
        expect(md).toContain(`${BASE}/`)
        expect(md.length).toBeGreaterThan(500)
        expect(md).not.toMatch(/<(div|section|span|main)\b/)
        expect(md).not.toMatch(/\]\(\/[^)]/) // links are absolute
    })

    it('carries the homepage FAQ', () => {
        expect(read('index.md')).toContain('Is FinGrab free?')
    })
})

describe('JSON-LD', () => {
    it.each(PAGES)('%s describes the app and the organization exactly once', page => {
        const nodes = jsonLd(page)
        expect(ofType(nodes, 'SoftwareApplication')).toHaveLength(1)
        expect(ofType(nodes, 'Organization')).toHaveLength(1)
    })

    it('marks FinGrab as a Chrome browser app with a priced offer', () => {
        const [app] = ofType(jsonLd('index.html'), 'SoftwareApplication')
        expect(app.applicationCategory).toBe('BrowserApplication')
        expect(app.operatingSystem).toBe('Chrome')
        expect(app.offers).toMatchObject({ '@type': 'Offer', price: '0', priceCurrency: 'USD' })
        expect(app.publisher).toEqual({ '@id': `${BASE}/#organization` })
    })

    it('links the organization to the Chrome Web Store listing', () => {
        const [org] = ofType(jsonLd('index.html'), 'Organization')
        expect(org['@id']).toBe(`${BASE}/#organization`)
        expect(org.sameAs).toContain(STORE_URL)
    })

    it.each(['index.html', 'stock-prices-in-excel.html'])('%s carries a FAQPage', page => {
        const [faq] = ofType(jsonLd(page), 'FAQPage')
        expect(faq.mainEntity.length).toBeGreaterThan(0)
        expect(faq.mainEntity[0]['@type']).toBe('Question')
    })

    it('points blog articles at the shared organization', () => {
        const [article] = ofType(jsonLd(`blog/${articles[0].slug}.html`), 'Article')
        expect(article.publisher).toEqual({ '@id': `${BASE}/#organization` })
    })
})

describe('homepage', () => {
    it('says in one plain sentence what FinGrab does and for whom', () => {
        expect(read('index.html')).toContain(PRODUCT_SUMMARY)
    })
})

describe('IndexNow key', () => {
    const keys = readdirSync(resolve(process.cwd(), 'public')).filter(f => /^[0-9a-f]{32}\.txt$/.test(f))

    it('sits in the web root, containing its own key', () => {
        expect(keys).toHaveLength(1)
        expect(read(keys[0]).trim()).toBe(keys[0].replace('.txt', ''))
    })
})
