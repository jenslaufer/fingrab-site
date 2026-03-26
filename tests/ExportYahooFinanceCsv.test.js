import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExportYahooFinanceCsv from '../src/components/articles/ExportYahooFinanceCsv.vue'

const mockRouter = {
    install(app) {
        app.component('router-link', {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
        })
    },
}

describe('ExportYahooFinanceCsv', () => {
    it('renders', () => {
        const wrapper = mount(ExportYahooFinanceCsv, { global: { plugins: [mockRouter] } })
        expect(wrapper.exists()).toBe(true)
    })

    it('has a heading about exporting Yahoo Finance data', () => {
        const wrapper = mount(ExportYahooFinanceCsv, { global: { plugins: [mockRouter] } })
        expect(wrapper.text()).toContain('Why export Yahoo Finance data as CSV')
    })

    it('has a CTA link to Chrome Web Store', () => {
        const wrapper = mount(ExportYahooFinanceCsv, { global: { plugins: [mockRouter] } })
        const link = wrapper.find('a[href*="chromewebstore.google.com"]')
        expect(link.exists()).toBe(true)
    })

    it('links to the FinGrab landing page', () => {
        const wrapper = mount(ExportYahooFinanceCsv, { global: { plugins: [mockRouter] } })
        const link = wrapper.find('a[href="/"]')
        expect(link.exists()).toBe(true)
    })
})
