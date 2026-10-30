import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'

// FinGrab exports one thing: the Yahoo chart endpoint as CSV — date, open, high,
// low, close, adjusted close, volume (fingrab utils/chart-rows.js, DATE_FIELDS).
// Until 2026-10-30 the homepage and seven articles also promised financial
// statements, key statistics and dividend history. None of that ships.
// Any sentence that names FinGrab must not promise those data types.
const FORBIDDEN = /statement|key stat|dividend (history|record|data|payment)|financials|fundamentals/i

const dir = resolve(process.cwd(), 'src/components')
const files = [
    ...readdirSync(dir).filter(f => f.endsWith('.vue')).map(f => join(dir, f)),
    ...readdirSync(join(dir, 'articles')).map(f => join(dir, 'articles', f)),
]

const sentences = (src) => src
    .replace(/<script[\s\S]*?<\/script>/g, (s) => s.replace(/[{},]/g, '.'))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?:])\s|\.\s*(?=\{)/)

describe('FinGrab export claims', () => {
    for (const file of files) {
        it(`${file.split('/').slice(-2).join('/')}: never promises data FinGrab does not export`, () => {
            const bad = sentences(readFileSync(file, 'utf-8'))
                .filter(s => /fingrab/i.test(s) && FORBIDDEN.test(s))
            expect(bad).toEqual([])
        })
    }

    it('homepage feature list names no statements, statistics or dividend history', () => {
        const home = readFileSync(join(dir, 'Home.vue'), 'utf-8')
        expect(home).not.toMatch(/title: 'Financial statements'|title: 'Key statistics'|title: 'Dividend history'/)
    })
})
