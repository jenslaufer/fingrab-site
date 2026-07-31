#!/usr/bin/env node
/**
 * Checks FREE_EXPORTS against the extension package that is LIVE in the
 * Chrome Web Store.
 *
 * This is the one invariant the unit suite cannot express: the extension is a
 * different repo on a different host, so every test in this repo can only
 * confirm that the copy agrees with the constant — never that the constant
 * agrees with reality. Both quota defects shipped through exactly that gap.
 *
 * Reading a release commit is NOT a substitute. On 2026-07-31 the commit
 * titled "release 2.0.3" said 3 while the branch tip (and the uploaded
 * package) said 5. Only the artifact is authoritative.
 *
 *   npm run verify:quota
 *
 * Exits 0 when the constant matches the shipped build, 1 when it does not,
 * and 2 when the live value could not be determined (offline, store layout
 * changed) — an unknown is never reported as agreement.
 */
import { inflateRawSync } from 'node:zlib'
import { FREE_EXPORTS } from '../src/config.js'

const ITEM_ID = 'blajbhgoiomncfkpcfgiibcicifklgpm'
const CRX_URL =
    'https://clients2.google.com/service/update2/crx' +
    `?response=redirect&acceptformat=crx2,crx3&prodversion=120&x=id%3D${ITEM_ID}%26uc`

function fail(code, message) {
    console.error(message)
    process.exit(code)
}

/** Strip the CRX container (v2 or v3) and return the raw zip bytes. */
function zipBytesFrom(crx) {
    if (crx.toString('latin1', 0, 4) !== 'Cr24') throw new Error('not a CRX package')
    const version = crx.readUInt32LE(4)
    if (version === 3) return crx.subarray(12 + crx.readUInt32LE(8))
    return crx.subarray(16 + crx.readUInt32LE(8) + crx.readUInt32LE(12))
}

/**
 * Minimal zip reader over the central directory. A dependency would be the
 * obvious alternative, but this script has to keep working years from now
 * when someone runs it to answer "what does the store actually enforce" —
 * fewer moving parts is the point.
 */
function* entries(zip) {
    const EOCD = 0x06054b50
    let eocd = zip.length - 22
    while (eocd >= 0 && zip.readUInt32LE(eocd) !== EOCD) eocd--
    if (eocd < 0) throw new Error('zip end-of-central-directory not found')

    let at = zip.readUInt32LE(eocd + 16)
    const count = zip.readUInt16LE(eocd + 10)

    for (let i = 0; i < count; i++) {
        const nameLen = zip.readUInt16LE(at + 28)
        const extraLen = zip.readUInt16LE(at + 30)
        const commentLen = zip.readUInt16LE(at + 32)
        const name = zip.toString('utf8', at + 46, at + 46 + nameLen)
        const localAt = zip.readUInt32LE(at + 42)
        const method = zip.readUInt16LE(at + 10)
        const compressedSize = zip.readUInt32LE(at + 20)

        // The local header repeats the name/extra lengths, and its extra field
        // routinely differs in length from the central one — always read the
        // local header to find where the bytes start.
        const localNameLen = zip.readUInt16LE(localAt + 26)
        const localExtraLen = zip.readUInt16LE(localAt + 28)
        const from = localAt + 30 + localNameLen + localExtraLen
        const raw = zip.subarray(from, from + compressedSize)

        yield { name, read: () => (method === 0 ? raw : inflateRawSync(raw)) }
        at += 46 + nameLen + extraLen + commentLen
    }
}

let response
try {
    response = await fetch(CRX_URL, { redirect: 'follow' })
} catch (error) {
    fail(2, `could not reach the Chrome update service: ${error.message}`)
}
if (!response.ok) fail(2, `Chrome update service answered ${response.status}`)

const crx = Buffer.from(await response.arrayBuffer())

let version
let quota
try {
    for (const entry of entries(zipBytesFrom(crx))) {
        if (entry.name === 'manifest.json') {
            version = JSON.parse(entry.read().toString('utf8')).version
        } else if (entry.name.endsWith('.js')) {
            // VITE_MAX_FREE_QUOTA is constant-folded into the bundle, so the
            // literal never appears — the ref that carries it does. Overlay.vue
            // passes it to the Quota component as :max-quota.
            //
            // Resolved in two steps rather than one window-limited regex: the
            // binding and the declaration sit ~10k characters apart in the
            // current build, and any fixed window is a guess that silently
            // stops matching after a bundler change.
            const source = entry.read().toString('utf8')
            const binding = source.match(/"max-quota":(\w+)\.value/)
            if (binding) {
                const declared = source.match(new RegExp(`\\b${binding[1]}=\\w+\\((\\d+)\\)`))
                if (declared) quota = Number(declared[1])
            }
        }
    }
} catch (error) {
    fail(2, `could not read the shipped package: ${error.message}`)
}

if (!version) fail(2, 'no manifest.json in the shipped package')
if (quota === undefined) {
    fail(
        2,
        'could not find the max-quota binding in the shipped bundle.\n' +
            'The build output shape probably changed. Re-derive it by hand before trusting any number:\n' +
            `  curl -sL -o fg.crx "${CRX_URL}"\n` +
            '  then unzip past the CRX header and grep the overlay chunk for the :max-quota prop.',
    )
}

const where = `live store version ${version}`
if (quota !== FREE_EXPORTS) {
    fail(
        1,
        `MISMATCH: the site promises ${FREE_EXPORTS} free exports, ${where} enforces ${quota}.\n` +
            'Set FREE_EXPORTS in src/config.js to the enforced value, and update the Chrome Web\n' +
            'Store detailed description as well — it is a dashboard-only field that no test can see.',
    )
}

console.log(`OK: site promises ${FREE_EXPORTS} free exports, ${where} enforces ${quota}.`)
