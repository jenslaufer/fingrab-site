// Single source of truth for numbers the site promises about the product.
//
// These are claims a visitor acts on, so they must match what the extension
// that is LIVE in the Chrome Web Store actually enforces — not what a branch
// enforces, and not what we intend to ship next.

/**
 * Free CSV exports before the paywall.
 *
 * The extension live in the store (2.0.3) enforces 5. Measured in the shipped
 * package itself, not in a branch: the overlay chunk binds `:max-quota` to
 * `g(5)`, constant-folded from `VITE_MAX_FREE_QUOTA` at build time. The tips
 * of release/2.0.3 and release/2.0.4 both say 5, so this does not move when
 * 2.0.4 ships.
 *
 * Do not read this number off a release commit. The commit titled "release
 * 2.0.3" (cee72e8) says 3; the branch took one more commit before upload
 * (d0bfa3f, "Set free export quota to 5"). That mistake is how the site spent
 * 2026-07-31 promising 3. Run `npm run verify:quota` instead — it reads the
 * package the store is actually serving.
 *
 * Both directions of error cost something. Promising more than the build
 * delivers earns 1-star reviews; promising less makes the free tier sound
 * stingier than it is, right beside the install button.
 */
export const FREE_EXPORTS = 5

/**
 * The permissions the SHIPPED extension declares, with the purpose the privacy
 * page states for each.
 *
 * Read off the manifest of the built package, never off the template. On
 * 2026-08-21 the published policy listed `sidePanel` and `activeTab` and
 * nothing else, while the shipped 2.0.8 manifest declared
 * `permissions: ["storage","sidePanel"]` plus three `host_permissions` — so
 * the page named one permission the extension does not have and hid the whole
 * host-access class, which is the part a reader and an add-on reviewer care
 * about most. The list is here, and only here, so the drift cannot come back:
 * `tests/PrivacyPermissions.test.js` pins the rendered copy to it, and
 * `npm run verify:permissions` pins it to the package the store is serving.
 *
 * `activeTab` was never declared in 2.0.6 either — this was not a permission
 * that got removed, it was a claim that was never true.
 *
 * The Firefox build (2.0.8) differs: it has `sidebar_action` instead of
 * `sidePanel` and additionally `https://extensionpay.com/*`. Extend this list
 * when that listing goes live, and say which browser each line belongs to.
 */
export const EXTENSION_PERMISSIONS = [
    {
        name: 'storage',
        purpose: 'Stores your settings and licence status locally in your browser. Nothing is sent anywhere.',
    },
    {
        name: 'sidePanel',
        purpose: "Opens the extension interface in Chrome's side panel. No data is read or transmitted.",
    },
    {
        name: 'https://finance.yahoo.com/*',
        purpose: 'Reads the Yahoo Finance page you are on to pick up the ticker symbol. Used locally, never transmitted to FinGrab.',
    },
    {
        name: 'https://query1.finance.yahoo.com/*',
        purpose: 'Fetches the OHLCV data for your export directly from the public Yahoo Finance API.',
    },
    {
        name: 'https://query2.finance.yahoo.com/*',
        purpose: 'Fallback endpoint for the same public Yahoo Finance API, used when query1 does not answer.',
    },
]
