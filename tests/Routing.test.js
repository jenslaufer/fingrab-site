import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const mainPath = resolve(process.cwd(), 'src/main.js')
const mainSrc = readFileSync(mainPath, 'utf-8')

describe('Routing', () => {
    it('does not use hash history', () => {
        expect(mainSrc).not.toContain('createWebHashHistory')
    })

    it('uses a history-mode SSG/router entry, not hash', () => {
        // Either vite-ssg (manages HTML5 history) or an explicit createWebHistory.
        expect(mainSrc).toMatch(/ViteSSG|createWebHistory/)
    })
})
