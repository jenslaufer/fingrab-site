// JSON-LD for the whole site. App.vue puts the site graph on every page, so
// FinGrab and its publisher are described once, with stable @ids, the same way
// everywhere. Pages reference them by @id instead of restating them.
import { PRODUCT_SUMMARY, SITE_URL, STORE_URL } from './config.js'

export const ORG_ID = `${SITE_URL}/#organization`
export const APP_ID = `${SITE_URL}/#app`

export const siteGraph = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': ORG_ID,
            name: 'FinGrab',
            url: SITE_URL,
            logo: `${SITE_URL}/apple-touch-icon.png`,
            sameAs: [STORE_URL],
        },
        {
            '@type': 'SoftwareApplication',
            '@id': APP_ID,
            name: 'FinGrab',
            url: SITE_URL,
            description: PRODUCT_SUMMARY,
            applicationCategory: 'BrowserApplication',
            operatingSystem: 'Chrome',
            browserRequirements: 'Google Chrome',
            installUrl: STORE_URL,
            publisher: { '@id': ORG_ID },
            // The only price the repo knows: installing and the free exports.
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
    ],
}

export function faqPage(faqs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    }
}

// key lets unhead tell the blocks apart instead of dropping one as a duplicate.
export const ldScript = (key, data) => ({ key, type: 'application/ld+json', innerHTML: JSON.stringify(data) })
