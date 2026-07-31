// Single source of truth for numbers the site promises about the product.
//
// These are claims a visitor acts on, so they must match what the extension
// that is LIVE in the Chrome Web Store actually enforces — not what a branch
// enforces, and not what we intend to ship next.

/**
 * Free CSV exports before the paywall.
 *
 * Live extension 2.0.3 sets `VITE_MAX_FREE_QUOTA=3` (release commit cee72e8,
 * "release 2.0.3: store rename (#88) + free quota 15->3"), and
 * `src/pages/Overlay.vue` reads that env var, so 3 is the wall the user meets.
 *
 * 2.0.4 is built with 5 and waiting on a store upload. Flip this to 5 the day
 * 2.0.4 is live — not before. Promising more than the build delivers is the
 * direction that earns 1-star reviews; promising less costs nothing.
 */
export const FREE_EXPORTS = 3
