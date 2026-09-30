import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { STORE_URL } from '../src/config.js'

const ITEM_ID = 'blajbhgoiomncfkpcfgiibcicifklgpm'

function sourceFiles(dir) {
    return readdirSync(dir).flatMap(name => {
        const path = join(dir, name)
        return statSync(path).isDirectory() ? sourceFiles(path) : [path]
    })
}

// A store link without the item ID redirects to the store home page with HTTP 200,
// so no link checker notices it (issue: all 9 blog CTAs pointed there for six months).
describe('Chrome Web Store links', () => {
    it('STORE_URL points at the FinGrab listing', () => {
        expect(STORE_URL).toContain(`/detail/`)
        expect(STORE_URL.endsWith(`/${ITEM_ID}`)).toBe(true)
    })

    it('every store link in src carries the item ID', () => {
        const broken = sourceFiles('src').flatMap(file =>
            [...readFileSync(file, 'utf8').matchAll(/https:\/\/chromewebstore\.google\.com\/detail\/[^'"`\s)]*/g)]
                .map(m => m[0])
                .filter(url => !url.endsWith(`/${ITEM_ID}`))
                .map(url => `${file}: ${url}`)
        )
        expect(broken).toEqual([])
    })
})
