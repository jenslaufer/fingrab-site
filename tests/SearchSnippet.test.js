import { describe, it, expect } from 'vitest'
import { findArticle, headTitle } from '../src/blog/articles.js'

// The three articles on Google page 1 (GSC 28 d to 2026-09-28, pos 7.5–8.6, CTR ~1 %).
// Google cuts titles near 60 characters and descriptions near 160.
const PAGE_ONE = [
    'stock-portfolio-tracker-google-sheets',
    'yahoo-finance-api-alternatives',
    'download-stock-data-google-finance',
]

describe('search snippet of page-1 articles', () => {
    for (const slug of PAGE_ONE) {
        const a = findArticle(slug)

        it(`${slug}: title fits in the search result`, () => {
            expect(headTitle(a).length).toBeLessThanOrEqual(60)
        })

        it(`${slug}: description fits in the search result`, () => {
            expect(a.description.length).toBeLessThanOrEqual(160)
        })
    }

    it('articles without metaTitle keep the blog suffix', () => {
        const a = findArticle('export-yahoo-finance-csv')
        expect(headTitle(a)).toBe(`${a.title} – FinGrab Blog`)
    })
})
