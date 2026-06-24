import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createHead } from '@unhead/vue/client'
import Home from '../src/components/Home.vue'

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

function mountHome() {
    return mount(Home, {
        props: {
            badge: 'FinGrab.app • Chrome Extension for Financial Data',
            headline: 'Grab financial raw data',
            uvp: 'Download raw data from Yahoo Finance.',
            cta: 'Add FinGrab.app to Chrome',
            ctaFooter: '15 free exports. No signup. Setup in under 2 minutes.',
            productName: 'FinGrab.app',
            url: storeUrl,
        },
        global: { plugins: [mockRouter, createHead()] },
    })
}

describe('Home — social proof', () => {
    it('renders a testimonials/reviews section', () => {
        const wrapper = mountHome()
        const heading = wrapper
            .findAll('h2')
            .find(h => /review|loved|what users say/i.test(h.text()))
        expect(heading).toBeTruthy()
    })

    it('shows two real Chrome Web Store quotes verbatim', () => {
        const text = mountHome().text()
        expect(text).toContain('This is exactly what I needed. It just works')
        expect(text).toContain('it worked for me')
    })

    it('attributes the testimonials to the Chrome Web Store', () => {
        const text = mountHome().text()
        expect(text).toContain('Chrome Web Store')
    })

    it('links the social-proof section to the live store reviews', () => {
        const wrapper = mountHome()
        const link = wrapper.find('a[href*="/reviews"]')
        expect(link.exists()).toBe(true)
        expect(link.attributes('href')).toContain('chromewebstore.google.com')
    })
})

describe('Home — concrete free-tier offer', () => {
    it('states the concrete "15 free exports" offer in the FAQ, not a vague tier', () => {
        const text = mountHome().text()
        expect(text).toContain('15 free exports')
        expect(text).not.toContain('basic exports')
    })

    it('surfaces the free-export count near the primary CTA footer', () => {
        // ctaFooter is passed as a prop; the page must render it.
        expect(mountHome().text()).toContain('15 free exports')
    })
})
