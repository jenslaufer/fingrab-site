import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createHead } from '@unhead/vue/client'
import Home from '../src/components/Home.vue'
import { STORE_REVIEWS } from '../src/reviews.js'
import { FREE_EXPORTS, STORE_URL } from '../src/config.js'

const mockRouter = {
    install(app) {
        app.component('router-link', { props: ['to'], template: '<a :href="to"><slot /></a>' })
    },
}

function mountHome() {
    return mount(Home, {
        props: {
            badge: 'b', headline: 'h', uvp: 'u', cta: 'c', ctaFooter: 'f',
            productName: 'FinGrab.app', url: STORE_URL,
        },
        global: { plugins: [mockRouter, createHead()] },
    })
}

describe('Store reviews on the homepage', () => {
    it('carries every 5-star review from the store listing (13 as of 2026-09-30)', () => {
        expect(STORE_REVIEWS).toHaveLength(13)
        expect(STORE_REVIEWS.every(r => r.rating === 5)).toBe(true)
    })

    it('renders one card per review, newest first', () => {
        const figures = mountHome().findAll('figure')
        expect(figures).toHaveLength(STORE_REVIEWS.length)
        expect(figures[0].text()).toContain('Marshall')
        expect(figures.at(-1).text()).toContain('Robert El Hussein')
    })

    it('never quotes a free-export count the extension does not enforce', () => {
        for (const r of STORE_REVIEWS) {
            const m = r.quote.match(/(\d+) free exports?/i)
            if (m) expect(Number(m[1])).toBe(FREE_EXPORTS)
        }
    })
})
