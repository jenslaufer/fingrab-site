/**
 * Pins the permission list on the privacy page to the permissions the shipped
 * extension actually declares.
 *
 * Why this file exists: on 2026-08-21 the published policy
 * (https://fingrab.app/privacy) listed exactly two permissions under
 * "3. Chrome Permissions" — `sidePanel` and `activeTab`. Measured against the
 * manifest of the shipped package (2.0.8, and the same list already in 2.0.6):
 * `activeTab` is NOT declared, while `storage` and all three
 * `host_permissions` on finance.yahoo.com / query1 / query2 are — and never
 * appear in the list. The page named a permission the extension does not have
 * and hid the whole class a reader cares about most. Nothing failed, because
 * the names were hardcoded in the template and no test read the manifest.
 *
 * Three properties, and all three are needed:
 *
 *   1. RENDERED: the page a visitor sees lists exactly the permissions in the
 *      constant — no extra, none missing. That list is the claim.
 *   2. SOURCE: no permission identifier anywhere in src/ disagrees with the
 *      constant. This is what catches `activeTab` creeping back into some
 *      other component later.
 *   3. CONTROL: the extractor still rejects a wrong list. Without it the
 *      rendered check quietly becomes a decoy the day the markup is reshaped
 *      past the selector — green, and proving nothing.
 *
 * The names are READ from the constant, never written here. Writing them twice
 * would move the drift instead of removing it. The constant itself is checked
 * against the LIVE package by `npm run verify:permissions`, the same split the
 * free-quota claim uses (offline test pins the copy, online script pins the
 * constant).
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createHead } from '@unhead/vue/client'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { EXTENSION_PERMISSIONS } from '../src/config.js'
import PrivacyPolicy from '../src/components/PrivacyPolicy.vue'

const SRC = resolve('src')

// useHead() needs a head instance in the app context, same as FreeQuotaClaim.test.js.
const mountPolicy = () =>
    mount(PrivacyPolicy, { global: { plugins: [createHead()] } })

// Chrome/Firefox permission identifiers that could plausibly show up in this
// product's copy. Listed explicitly rather than pattern-matched: a regex over
// camelCase words would flag half the prose and get loosened until it flags
// nothing. Bare-word permissions (`storage`, `tabs`, `history`, `privacy`) are
// deliberately absent — they are ordinary English here, so scanning for them
// produces hits that force the guard to be loosened until it catches nothing.
const KNOWN_PERMISSION_NAMES = [
    'activeTab', 'sidePanel', 'sidebarAction', 'clipboardRead', 'clipboardWrite',
    'webRequest', 'declarativeNetRequest', 'nativeMessaging', 'contextMenus',
    'webNavigation', 'browsingData', 'topSites', 'pageCapture', 'desktopCapture',
]

const declared = EXTENSION_PERMISSIONS.map(p => p.name)

function sourceFiles(dir) {
    return readdirSync(dir).flatMap(entry => {
        const full = join(dir, entry)
        if (statSync(full).isDirectory()) return sourceFiles(full)
        return /\.(vue|js)$/.test(entry) ? [full] : []
    })
}

// The rendered names are the <span> cells that carry the mono class the
// template uses for a permission identifier.
function renderedPermissionNames(wrapper) {
    return wrapper.findAll('[data-permission]').map(el => el.text().trim())
}

describe('privacy policy permission list', () => {
    it('declares at least the permissions the shipped manifest has', () => {
        // Guards the constant itself against being emptied to make the suite pass.
        expect(declared).toContain('storage')
        expect(declared).toContain('sidePanel')
        expect(declared).toContain('https://finance.yahoo.com/*')
        expect(declared).toContain('https://query1.finance.yahoo.com/*')
        expect(declared).toContain('https://query2.finance.yahoo.com/*')
    })

    it('never claims a permission the shipped manifest does not declare', () => {
        expect(declared).not.toContain('activeTab')
    })

    it('renders exactly the permissions in the constant', () => {
        const wrapper = mountPolicy()
        expect(renderedPermissionNames(wrapper).sort()).toEqual([...declared].sort())
    })

    it('gives every permission a purpose the page shows', () => {
        const wrapper = mountPolicy()
        const text = wrapper.text()
        for (const { purpose } of EXTENSION_PERMISSIONS) {
            expect(purpose.length).toBeGreaterThan(0)
            expect(text).toContain(purpose)
        }
    })

    it('mentions no permission identifier anywhere in src/ that is not declared', () => {
        const stray = []
        for (const file of sourceFiles(SRC)) {
            if (file.endsWith(join('src', 'config.js'))) continue
            const body = readFileSync(file, 'utf8')
            for (const name of KNOWN_PERMISSION_NAMES) {
                if (declared.includes(name)) continue
                // Word boundary so `privacy` in a route or class name is not a hit.
                if (new RegExp(`\\b${name}\\b`).test(body)) {
                    stray.push(`${file}: ${name}`)
                }
            }
        }
        expect(stray).toEqual([])
    })

    it('CONTROL: the rendered extractor rejects a list that disagrees', () => {
        const wrapper = mountPolicy()
        const rendered = renderedPermissionNames(wrapper)
        expect(rendered.length).toBeGreaterThan(0)
        expect(rendered.sort()).not.toEqual([...declared, 'activeTab'].sort())
    })
})
