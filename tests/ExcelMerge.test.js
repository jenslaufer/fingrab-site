import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { articles, findArticle, headTitle } from '../src/blog/articles.js'
import { routes } from '../src/routes.js'
import ExportYahooFinanceCsv from '../src/components/articles/ExportYahooFinanceCsv.vue'

// 2026-10-30: /blog/yahoo-finance-data-to-excel sat 11 days in "Discovered -
// currently not indexed" while Google showed the indexed CSV guide for the
// Excel queries (~260 impressions in 90 days, position ~40). The Excel content
// moves into the indexed URL; the old slug redirects there.
const mockRouter = {
    install(app) {
        app.component('router-link', { props: ['to'], template: '<a :href="to"><slot /></a>' })
    },
}

describe('Excel guide folded into the CSV guide', () => {
    it('the separate Excel article is gone', () => {
        expect(articles.map(a => a.slug)).not.toContain('yahoo-finance-data-to-excel')
    })

    it('the old Excel URL redirects to the CSV guide', () => {
        const r = routes.find(r => r.path === '/blog/yahoo-finance-data-to-excel')
        expect(r?.redirect).toBe('/blog/export-yahoo-finance-csv')
    })

    it('the CSV guide targets Excel in title and search snippet', () => {
        const a = findArticle('export-yahoo-finance-csv')
        expect(a.title).toMatch(/Excel/)
        expect(headTitle(a)).toMatch(/Excel/)
        expect(headTitle(a).length).toBeLessThanOrEqual(60)
        expect(a.description.length).toBeLessThanOrEqual(160)
    })

    it('the CSV guide explains the Excel import and Power Query', () => {
        const text = mount(ExportYahooFinanceCsv, { global: { plugins: [mockRouter] } }).text()
        expect(text).toContain('From Text/CSV')
        expect(text).toContain('Power Query')
    })

    it('the CSV guide says the Yahoo download button needs Gold, with the source', () => {
        const w = mount(ExportYahooFinanceCsv, { global: { plugins: [mockRouter] } })
        expect(w.text()).toMatch(/Gold/)
        expect(w.find('a[href="https://help.yahoo.com/kb/SLN2311.html"]').exists()).toBe(true)
    })
})
