/**
 * The site shows the same mark as the extension.
 *
 * On 2026-11-18 the light redesign drew the header and footer mark on an ink
 * tile while the extension's toolbar icon and panel mark sit on the orange
 * accent tile, and the browser tab still showed Vite's default logo
 * (`/vite.svg`). A visitor who installs sees a different icon in the toolbar
 * than the one the site taught them to look for.
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import FinGrabMark from '../src/components/FinGrabMark.vue'

const html = readFileSync(resolve('index.html'), 'utf8')

describe('brand mark', () => {
    it('draws every mark on the accent tile, like the extension', () => {
        for (const props of [{}, { small: true }]) {
            const tile = mount(FinGrabMark, { props }).find('rect')
            expect(tile.classes()).toContain('fill-accent')
            expect(tile.classes()).not.toContain('fill-ink')
        }
    })

    it('uses the extension toolbar icon as favicon, not the Vite logo', () => {
        expect(html).not.toContain('vite.svg')
        expect(existsSync(resolve('public/vite.svg'))).toBe(false)
        const href = html.match(/<link rel="icon" type="image\/svg\+xml" href="\/([^"]+)"/)?.[1]
        expect(href).toBe('favicon.svg')
        const svg = readFileSync(resolve('public', href), 'utf8')
        expect(svg).toContain('#C2410C')
        // A tab shows 16 px, so it gets the toolbar's pixel-grid drawing:
        // rectangles on whole pixels only, the diagonal price line blurs there.
        expect(svg).not.toContain('<path')
        expect(svg).toContain('<rect x="3" y="4" width="10" height="2"')
    })

    it('gives small tabs the pixel-grid icon as PNG', () => {
        expect(html).toMatch(/<link rel="icon" type="image\/png" sizes="32x32" href="\/favicon-32\.png"/)
        expect(existsSync(resolve('public/favicon-32.png'))).toBe(true)
        expect(html).toMatch(/<link rel="apple-touch-icon" href="\/apple-touch-icon\.png"/)
        expect(existsSync(resolve('public/apple-touch-icon.png'))).toBe(true)
    })
})
