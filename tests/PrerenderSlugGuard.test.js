// @vitest-environment node
// Runs in node, not jsdom: importing vite.config.js pulls in esbuild-backed
// plugins, and jsdom's TextEncoder shim breaks esbuild.
import { describe, it, expect, beforeAll } from 'vitest'
import { execSync } from 'node:child_process'
import { readdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { articleSlugs } from '../vite.config.js'

// Guards the soft-404 SEO bug fixed in #8: the blog slug list is derived twice
// (sitemap imports articles.js; vite.config.js regex-greps it for prerender
// routes). If they diverge, articles vanish from the static output while the
// sitemap still advertises their URLs — and `vite-ssg build` still exits 0.
// This test fails the moment the three slug sources stop agreeing.

const sorted = arr => [...arr].sort()

let importedSlugs
let distSlugs

beforeAll(async () => {
    // (a) Real ES import — the same source the sitemap generator reads.
    const { articles } = await import('../src/blog/articles.js')
    importedSlugs = articles.map(a => a.slug)

    // (c) Fresh build, then read what vite-ssg actually prerendered.
    execSync('npm run build', { cwd: process.cwd(), stdio: 'inherit' })
    const blogDir = resolve(process.cwd(), 'dist/blog')
    distSlugs = readdirSync(blogDir)
        .filter(f => f.endsWith('.html'))
        .map(f => f.replace(/\.html$/, ''))
}, 120_000)

describe('Prerender slug divergence guard', () => {
    it('parses at least one slug from articles.js via the vite.config regex', () => {
        expect(articleSlugs().length).toBeGreaterThan(0)
    })

    it('regex slugs (b) match the imported slugs (a)', () => {
        expect(sorted(articleSlugs())).toEqual(sorted(importedSlugs))
    })

    it('prerendered HTML files (c) match the imported slugs (a)', () => {
        expect(sorted(distSlugs)).toEqual(sorted(importedSlugs))
    })

    it('emits a real HTML file for every article — no missing prerender', () => {
        for (const slug of importedSlugs) {
            expect(existsSync(resolve(process.cwd(), `dist/blog/${slug}.html`))).toBe(true)
        }
    })
})
