/**
 * Holds the site to the extension's look: white and grey, hairlines, one
 * orange accent, Inter plus mono. The tokens are copied from the extension's
 * assets/style.css so site and panel read as one product.
 *
 * Until the light redesign every page was violet (`brand2`) with emerald
 * buttons, slate text, gradients and frosted glass. This suite fails if any of
 * that comes back, and if the tokens it depends on go missing.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const SRC = resolve('src')
const STYLE = join(SRC, 'style.css')

function vueFiles(dir) {
    return readdirSync(dir).flatMap(entry => {
        const full = join(dir, entry)
        if (statSync(full).isDirectory()) return vueFiles(full)
        return entry.endsWith('.vue') ? [full] : []
    })
}

const FILES = [...vueFiles(SRC), STYLE]

// Every Tailwind default palette hue. The site has its own tokens; a stock
// hue in a class is a colour that bypasses them.
const STOCK_HUE =
    /\b(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/
const GRADIENT = /\bbg-(?:gradient|linear|radial|conic)-|(?:^|[\s:"'`])(?:from|via|to)-[a-z0-9[]/
const BLUR = /\b(?:backdrop-)?blur\b|backdrop-filter|\bblur\(/
const OLD_FONTS = /montserrat|merriweather/i
const OLD_BRAND = /\bbrand[0-2]\b/

function offenders(pattern) {
    return FILES.flatMap(file =>
        readFileSync(file, 'utf-8')
            .split('\n')
            .map((line, i) => ({ line, at: `${file.replace(SRC, 'src')}:${i + 1}` }))
            .filter(({ line }) => pattern.test(line))
            .map(({ at, line }) => `${at}  ${line.trim()}`)
    )
}

describe('no colour, font or effect from the old violet scheme', () => {
    it('uses no stock Tailwind hue (slate, emerald, indigo, violet, purple, …)', () => {
        expect(offenders(STOCK_HUE)).toEqual([])
    })

    it('uses no gradient utilities or colour stops', () => {
        expect(offenders(GRADIENT)).toEqual([])
    })

    it('uses no blur', () => {
        expect(offenders(BLUR)).toEqual([])
    })

    it('loads neither Montserrat nor Merriweather', () => {
        expect(offenders(OLD_FONTS)).toEqual([])
        const pkg = readFileSync(resolve('package.json'), 'utf-8')
        expect(pkg).not.toMatch(OLD_FONTS)
    })

    it('has dropped the violet brand tokens', () => {
        expect(offenders(OLD_BRAND)).toEqual([])
    })
})

describe('the extension tokens are defined once, in style.css', () => {
    const css = readFileSync(STYLE, 'utf-8')
    const theme = css.match(/@theme\s*{([^}]*)}/)?.[1] ?? ''

    it.each([
        ['ink', '#111418'],
        ['ink-2', '#454b52'],
        ['ink-3', '#646a71'],
        ['line', '#e3e4e6'],
        ['line-2', '#cfd2d6'],
        ['paper', '#f5f5f4'],
        ['accent', '#c2410c'],
        ['accent-hover', '#a3360a'],
    ])('--color-%s is %s', (name, hex) => {
        const value = theme.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1]
        expect(value?.toLowerCase()).toBe(hex)
    })

    it('sets Inter as the sans face', () => {
        expect(theme).toMatch(/--font-sans:\s*"Inter Variable"/)
    })
})

// Without this the scans could silently match nothing — a green suite that
// proves nothing the day a pattern is mistyped.
describe('control: the patterns catch the old scheme', () => {
    it.each([
        [STOCK_HUE, 'class="bg-emerald-500 hover:bg-emerald-400"'],
        [STOCK_HUE, 'class="text-slate-300"'],
        [GRADIENT, 'class="bg-linear-to-b from-indigo-600 to-violet-500"'],
        [GRADIENT, 'class="bg-ink to-transparent"'],
        [BLUR, 'class="bg-white/5 backdrop-blur"'],
        [OLD_FONTS, '@import "@fontsource-variable/montserrat";'],
        [OLD_BRAND, 'class="bg-brand2"'],
    ])('%s matches %s', (pattern, sample) => {
        expect(pattern.test(sample)).toBe(true)
    })

    it.each([
        'class="text-ink-2 border-line bg-paper"',
        'class="fg-link" to="/blog"',
        'Add FinGrab from the Chrome Web Store. Takes less than a minute.',
    ])('leaves the new scheme alone: %s', sample => {
        for (const p of [STOCK_HUE, GRADIENT, BLUR, OLD_FONTS, OLD_BRAND]) {
            expect(p.test(sample)).toBe(false)
        }
    })
})
