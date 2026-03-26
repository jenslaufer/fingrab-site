import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExcelStockAnalysis from '../src/components/articles/ExcelStockAnalysis.vue'

const mockRouter = {
    install(app) {
        app.component('router-link', {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
        })
    },
}

describe('ExcelStockAnalysis', () => {
    it('renders', () => {
        const wrapper = mount(ExcelStockAnalysis, { global: { plugins: [mockRouter] } })
        expect(wrapper.exists()).toBe(true)
    })

    it('has a heading about Excel stock analysis', () => {
        const wrapper = mount(ExcelStockAnalysis, { global: { plugins: [mockRouter] } })
        expect(wrapper.text()).toContain('Why Excel for stock analysis')
    })

    it('has a CTA link to Chrome Web Store', () => {
        const wrapper = mount(ExcelStockAnalysis, { global: { plugins: [mockRouter] } })
        const link = wrapper.find('a[href*="chromewebstore.google.com"]')
        expect(link.exists()).toBe(true)
    })

    it('links to the FinGrab landing page', () => {
        const wrapper = mount(ExcelStockAnalysis, { global: { plugins: [mockRouter] } })
        const link = wrapper.find('a[href="/"]')
        expect(link.exists()).toBe(true)
    })
})
