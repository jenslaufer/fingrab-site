// Route table, kept separate from main.js so tests can import it without
// booting the app (main.js pulls in style.css and calls ViteSSG).
//
// Every static page is prerendered as a flat file (dist/privacy.html), which
// GitHub Pages serves at BOTH /privacy and /privacy.html. So each page also
// needs to match its .html URL — otherwise the SPA hydrates, misses, and the
// catch-all silently turns the page into the homepage. That URL is what
// external forms which reject '#' fragments get (Chrome Web Store privacy
// policy field), so it has to survive hydration. Guarded by
// tests/HtmlUrlRoutes.test.js.
export const routes = [
    {
        path: '/',
        props: {
            badge: 'FinGrab.app • Chrome Extension for Financial Data',
            headline: 'Grab financial raw data–in seconds, with one click',
            uvp: 'Analyze financial data on your terms. Download raw data from Yahoo Finance with the FinGrab Chrome Extension—ready for Excel, Google Sheets, OpenOffice, or your favorite analysis tool',
            cta: 'Add FinGrab.app to Chrome',
            ctaFooter: '15 free exports. No signup. Setup in under 2 minutes.',
            productName: 'FinGrab.app',
            url: 'https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm'
        },
        component: () => import('./components/Home.vue'),
    },
    {
        path: '/privacy',
        alias: '/privacy.html',
        component: () => import('./components/PrivacyPolicy.vue'),
    },
    {
        path: '/stock-prices-in-excel',
        alias: '/stock-prices-in-excel.html',
        component: () => import('./components/StockPricesInExcel.vue'),
    },
    {
        path: '/blog',
        alias: '/blog.html',
        component: () => import('./components/BlogHome.vue'),
    },
    {
        path: '/blog/:slug',
        alias: '/blog/:slug.html',
        component: () => import('./components/BlogArticle.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]
