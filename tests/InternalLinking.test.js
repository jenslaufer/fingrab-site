import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExportYahooFinanceCsv from '../src/components/articles/ExportYahooFinanceCsv.vue'
import HistoricalStockPriceData from '../src/components/articles/HistoricalStockPriceData.vue'
import ExcelStockAnalysis from '../src/components/articles/ExcelStockAnalysis.vue'

const mockRouter = {
    install(app) {
        app.component('router-link', {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
        })
    },
}

const mountOpts = { global: { plugins: [mockRouter] } }

function getRelatedLinks(wrapper) {
    const section = wrapper.findAll('h2').find(h => h.text().includes('Related Articles'))
    if (!section) return []
    // All router-link anchors after the Related Articles heading
    let el = section.element.nextElementSibling
    const links = []
    while (el) {
        el.querySelectorAll('a[href^="/blog/"]').forEach(a => links.push(a.getAttribute('href')))
        el = el.nextElementSibling
    }
    return links
}

describe('Internal Linking - ExportYahooFinanceCsv', () => {
    it('has a Related Articles section', () => {
        const wrapper = mount(ExportYahooFinanceCsv, mountOpts)
        const heading = wrapper.findAll('h2').find(h => h.text().includes('Related Articles'))
        expect(heading).toBeTruthy()
    })

    it('renders at least 2 related article links', () => {
        const wrapper = mount(ExportYahooFinanceCsv, mountOpts)
        const links = getRelatedLinks(wrapper)
        expect(links.length).toBeGreaterThanOrEqual(2)
    })

    it('links use correct /blog/slug paths', () => {
        const wrapper = mount(ExportYahooFinanceCsv, mountOpts)
        const links = getRelatedLinks(wrapper)
        links.forEach(href => expect(href).toMatch(/^\/blog\/[a-z0-9-]+$/))
    })
})

describe('Internal Linking - HistoricalStockPriceData', () => {
    it('has a Related Articles section', () => {
        const wrapper = mount(HistoricalStockPriceData, mountOpts)
        const heading = wrapper.findAll('h2').find(h => h.text().includes('Related Articles'))
        expect(heading).toBeTruthy()
    })

    it('renders at least 2 related article links', () => {
        const wrapper = mount(HistoricalStockPriceData, mountOpts)
        const links = getRelatedLinks(wrapper)
        expect(links.length).toBeGreaterThanOrEqual(2)
    })

    it('links use correct /blog/slug paths', () => {
        const wrapper = mount(HistoricalStockPriceData, mountOpts)
        const links = getRelatedLinks(wrapper)
        links.forEach(href => expect(href).toMatch(/^\/blog\/[a-z0-9-]+$/))
    })
})

describe('Internal Linking - ExcelStockAnalysis', () => {
    it('has a Related Articles section', () => {
        const wrapper = mount(ExcelStockAnalysis, mountOpts)
        const heading = wrapper.findAll('h2').find(h => h.text().includes('Related Articles'))
        expect(heading).toBeTruthy()
    })

    it('renders at least 2 related article links', () => {
        const wrapper = mount(ExcelStockAnalysis, mountOpts)
        const links = getRelatedLinks(wrapper)
        expect(links.length).toBeGreaterThanOrEqual(2)
    })

    it('links use correct /blog/slug paths', () => {
        const wrapper = mount(ExcelStockAnalysis, mountOpts)
        const links = getRelatedLinks(wrapper)
        links.forEach(href => expect(href).toMatch(/^\/blog\/[a-z0-9-]+$/))
    })
})
