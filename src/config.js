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
