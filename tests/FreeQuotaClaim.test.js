/**
 * Pins every free-quota claim on the site to the number the shipped extension
 * actually enforces.
 *
 * Why this file exists: on 2026-07-31 the site promised "15 free exports" on
 * six surfaces — homepage CTA, homepage FAQ, landing hero, landing body,
 * landing FAQ (which is also emitted as FAQPage structured data) and the page
 * meta description — while the extension live in the store, 2.0.3, capped the
 * free tier at 3. A visitor installed on a 5x overstatement and hit the wall
 * at 3. The quota had been tightened 15 -> 3 in the extension repo; the number
 * was hardcoded as a string here six times, so nothing could propagate and
 * nothing failed. Worse, two existing tests asserted `toContain('15 free
 * exports')` — they held the drift in place instead of catching it.
 *
 * Three properties, and all three are needed:
 *
 *   1. RENDERED: the pages a visitor actually sees state the count from the
 *      constant, and state no other count. This is the claim the user acts on.
 *   2. SOURCE: no literal "<n> free exports" in src/ disagrees with the
 *      constant. This catches a hardcoded number creeping back in later.
 *   3. CONTROL: the matcher still rejects a wrong number. Without it the
 *      source scan quietly becomes a decoy the day the copy is reworded past
 *      the pattern — a green test proving nothing, which is the failure mode
 *      this suite exists to prevent.
 *
 * The number is READ from the constant, never written here. Writing it twice
 * would move the drift instead of removing it.
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createHead } from '@unhead/vue/client'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { FREE_EXPORTS } from '../src/config.js'
import { routes } from '../src/routes.js'
import Home from '../src/components/Home.vue'
import StockPricesInExcel from '../src/components/StockPricesInExcel.vue'

// resolve() off the working directory, not import.meta.url: vitest rewrites
// import.meta.url for the browser-ish test environment, which turns
// new URL('../src', import.meta.url) into the useless path "/src".
const SRC = resolve('src')

// Matches the shapes the copy uses. Kept loose on the noun so a reworded claim
// is still caught rather than silently escaping the guard.
const CLAIM = /(\d+)\s+free\s+(?:CSV\s+)?(?:exports?|downloads?)/gi

const mockRouter = {
    install(app) {
        app.component('router-link', {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
        })
    },
}

const homeProps = routes.find(r => r.path === '/').props

function claimsIn(text) {
    return [...text.matchAll(CLAIM)].map(m => Number(m[1]))
}

function sourceFiles(dir) {
    return readdirSync(dir).flatMap(entry => {
        const full = join(dir, entry)
        if (statSync(full).isDirectory()) return sourceFiles(full)
        return /\.(vue|js|json)$/.test(entry) ? [full] : []
    })
}

// Blog articles compare third-party API free tiers ("500 free downloads per
// day"). Those are statements about other products and must not be pinned to
// our quota.
const OURS = f => !f.includes('/components/articles/') && !f.includes('/blog/')

describe('rendered pages state the shipped free-export count', () => {
    const pages = [
        ['Home', () => mount(Home, { props: homeProps, global: { plugins: [mockRouter, createHead()] } })],
        ['StockPricesInExcel', () => mount(StockPricesInExcel, { global: { plugins: [mockRouter, createHead()] } })],
    ]

    for (const [name, mountPage] of pages) {
        it(`${name} states "${FREE_EXPORTS} free exports" and no other count`, () => {
            const text = mountPage().text()
            // Present at all — fails loudly if the claim is reworded away
            // rather than passing vacuously.
            expect(text).toContain(`${FREE_EXPORTS} free exports`)
            // And every count that IS rendered agrees with the constant.
            const rendered = claimsIn(text)
            expect(rendered.length).toBeGreaterThan(0)
            expect(rendered).toEqual(rendered.map(() => FREE_EXPORTS))
        })
    }

    it('the homepage CTA footer carries the count (it comes in as a route prop)', () => {
        expect(homeProps.ctaFooter).toContain(`${FREE_EXPORTS} free exports`)
    })
})

describe('source carries no hardcoded count that disagrees', () => {
    for (const file of sourceFiles(SRC).filter(OURS)) {
        const claims = claimsIn(readFileSync(file, 'utf8'))
        if (claims.length === 0) continue
        it(`${file.replace(SRC, 'src')} claims only ${FREE_EXPORTS}`, () => {
            expect(claims).toEqual(claims.map(() => FREE_EXPORTS))
        })
    }

    it('rejects a claim that disagrees with the constant (positive control)', () => {
        const wrong = `Try it: ${FREE_EXPORTS + 1} free exports, no signup.`
        expect(claimsIn(wrong)).toEqual([FREE_EXPORTS + 1])
        expect(claimsIn(wrong).every(n => n === FREE_EXPORTS)).toBe(false)
    })

    it('still reads the files it claims to scan (positive control)', () => {
        const scanned = sourceFiles(SRC).filter(OURS)
        expect(scanned.some(f => f.endsWith('routes.js'))).toBe(true)
        expect(scanned.some(f => f.endsWith('Home.vue'))).toBe(true)
        expect(scanned.some(f => f.endsWith('StockPricesInExcel.vue'))).toBe(true)
    })
})

describe('the constant itself', () => {
    it('is a positive integer', () => {
        expect(Number.isInteger(FREE_EXPORTS)).toBe(true)
        expect(FREE_EXPORTS).toBeGreaterThan(0)
    })

    /**
     * The honest limit of everything above: once all copy interpolates the
     * constant, the tests follow whatever the constant says. Verified by
     * flipping it to 9 — the whole suite stayed green. So those tests catch a
     * hardcoded number, not a WRONG one.
     *
     * The invariant that actually matters is cross-repo — this constant must
     * equal `VITE_MAX_FREE_QUOTA` in the extension build that is live in the
     * Chrome Web Store. The extension lives in a different repo on a different
     * host, so no test here can read it.
     *
     * What this assertion buys instead: the number cannot be changed casually.
     * Editing it forces editing this line, which forces reading the checklist.
     * That is exactly the step that was skipped when the quota went 15 -> 3.
     *
     * CHECKLIST before changing this number:
     *   1. Read the LIVE version from the store item data, not from a branch:
     *      curl -sL "https://chromewebstore.google.com/detail/\
     *      blajbhgoiomncfkpcfgiibcicifklgpm?ucbcb=1&hl=en" \
     *        | grep -o '"version": "[0-9.]*"' | head -1
     *   2. In the extension repo, read `VITE_MAX_FREE_QUOTA` from the .env at
     *      THAT version's release commit — not from the working tree.
     *   3. Set both numbers below to that value.
     *   4. Update the Chrome Web Store detailed description too. It is a
     *      dashboard-only field, invisible to every test in every repo, and it
     *      is where this defect survived longest.
     */
    it('matches the free quota of the extension version live in the store', () => {
        const LIVE_STORE_VERSION = '2.0.3'
        const QUOTA_IN_THAT_RELEASE = 3 // .env at release commit cee72e8

        expect(FREE_EXPORTS).toBe(QUOTA_IN_THAT_RELEASE)
        // Recorded so the provenance is greppable, not just prose.
        expect(LIVE_STORE_VERSION).toBe('2.0.3')
    })
})
