import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createHead } from '@unhead/vue/client'
import BlogHome from '../src/components/BlogHome.vue'

const mockRouter = {
    install(app) {
        app.component('router-link', {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
        })
    },
}

function mountBlogHome() {
    return mount(BlogHome, {
        global: { plugins: [mockRouter, createHead()] },
    })
}

describe('BlogHome', () => {
    it('renders the blog heading', () => {
        const wrapper = mountBlogHome()
        expect(wrapper.find('h1').text()).toBe('FinGrab Blog')
    })

    it('renders all article links', () => {
        const wrapper = mountBlogHome()
        const links = wrapper.findAll('a[href^="/blog/"]')
        expect(links.length).toBe(6)
    })

    it('links to each article slug', () => {
        const wrapper = mountBlogHome()
        const hrefs = wrapper.findAll('a[href^="/blog/"]').map(a => a.attributes('href'))
        expect(hrefs).toContain('/blog/export-yahoo-finance-csv')
        expect(hrefs).toContain('/blog/historical-stock-price-data')
        expect(hrefs).toContain('/blog/excel-stock-analysis')
        expect(hrefs).toContain('/blog/best-free-stock-screeners')
        expect(hrefs).toContain('/blog/stock-portfolio-tracker-google-sheets')
        expect(hrefs).toContain('/blog/yahoo-finance-api-alternatives')
    })
})
