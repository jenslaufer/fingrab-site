import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HistoricalStockPriceData from '../src/components/articles/HistoricalStockPriceData.vue'

const mockRouter = {
    install(app) {
        app.component('router-link', {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
        })
    },
}

describe('HistoricalStockPriceData', () => {
    it('renders', () => {
        const wrapper = mount(HistoricalStockPriceData, { global: { plugins: [mockRouter] } })
        expect(wrapper.exists()).toBe(true)
    })

    it('has a heading about OHLCV data', () => {
        const wrapper = mount(HistoricalStockPriceData, { global: { plugins: [mockRouter] } })
        expect(wrapper.text()).toContain('What is OHLCV data')
    })

    it('has a CTA link to Chrome Web Store', () => {
        const wrapper = mount(HistoricalStockPriceData, { global: { plugins: [mockRouter] } })
        const link = wrapper.find('a[href*="chromewebstore.google.com"]')
        expect(link.exists()).toBe(true)
    })

    it('links to the FinGrab landing page', () => {
        const wrapper = mount(HistoricalStockPriceData, { global: { plugins: [mockRouter] } })
        const link = wrapper.find('a[href="/"]')
        expect(link.exists()).toBe(true)
    })
})
