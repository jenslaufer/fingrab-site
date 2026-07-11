import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createHead } from '@unhead/vue/client'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import StockPricesInExcel from '../src/components/StockPricesInExcel.vue'

const mockRouter = {
    install(app) {
        app.component('router-link', {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
        })
    },
}

const storeUrl =
    'https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm'

function mountPage() {
    return mount(StockPricesInExcel, {
        global: { plugins: [mockRouter, createHead()] },
    })
}

describe('StockPricesInExcel — content', () => {
    it('leads with the no-code Excel promise in the h1', () => {
        const h1 = mountPage().find('h1')
        expect(h1.exists()).toBe(true)
        expect(h1.text().toLowerCase()).toContain('excel')
        expect(h1.text().toLowerCase()).toContain('code')
    })

    it('shows the real-UI demo GIF as hero', () => {
        const img = mountPage().find('img[src="/demo/excel-demo.gif"]')
        expect(img.exists()).toBe(true)
        expect(img.attributes('alt')).toBeTruthy()
    })

    it('walks through the three steps with real screenshots', () => {
        const wrapper = mountPage()
        for (const still of [
            '/demo/step-1-yahoo-button.webp',
            '/demo/step-2-export-dialog.webp',
            '/demo/step-3-csv-result.webp',
        ]) {
            expect(wrapper.find(`img[src="${still}"]`).exists()).toBe(true)
        }
    })

    it('states the honest free offer (15 free exports), no vague tier', () => {
        const text = mountPage().text()
        expect(text).toContain('15 free exports')
        expect(text).not.toContain('basic exports')
    })

    it('links the CTA to the Chrome Web Store listing', () => {
        const link = mountPage().find(`a[href="${storeUrl}"]`)
        expect(link.exists()).toBe(true)
    })

    it('links into the blog so the page feeds the existing cluster', () => {
        const links = mountPage()
            .findAll('a')
            .map(a => a.attributes('href'))
            .filter(href => href && href.startsWith('/blog/'))
        expect(links.length).toBeGreaterThanOrEqual(2)
    })

    it('embeds FAQPage JSON-LD for the FAQ section', () => {
        // JSON-LD goes through useHead; assert on the component source so the
        // test does not depend on head-rendering internals.
        const src = readFileSync(
            resolve(process.cwd(), 'src/components/StockPricesInExcel.vue'),
            'utf-8'
        )
        expect(src).toContain('FAQPage')
        expect(src).toContain('application/ld+json')
    })
})

describe('StockPricesInExcel — route wiring', () => {
    const mainSrc = readFileSync(resolve(process.cwd(), 'src/main.js'), 'utf-8')
    const viteSrc = readFileSync(resolve(process.cwd(), 'vite.config.js'), 'utf-8')
    const sitemapGen = readFileSync(
        resolve(process.cwd(), 'scripts/generate-sitemap.js'),
        'utf-8'
    )

    it('is registered as a route in main.js', () => {
        expect(mainSrc).toContain("'/stock-prices-in-excel'")
    })

    it('is prerendered via includedRoutes in vite.config.js', () => {
        expect(viteSrc).toContain("'/stock-prices-in-excel'")
    })

    it('is listed in the sitemap generator static URLs', () => {
        expect(sitemapGen).toContain('/stock-prices-in-excel')
    })
})

describe('StockPricesInExcel — not an orphan', () => {
    it('is linked from the homepage', () => {
        const homeSrc = readFileSync(
            resolve(process.cwd(), 'src/components/Home.vue'),
            'utf-8'
        )
        expect(homeSrc).toContain('/stock-prices-in-excel')
    })

    it('is linked from the excel-stock-analysis article', () => {
        const articleSrc = readFileSync(
            resolve(process.cwd(), 'src/components/articles/ExcelStockAnalysis.vue'),
            'utf-8'
        )
        expect(articleSrc).toContain('/stock-prices-in-excel')
    })
})
