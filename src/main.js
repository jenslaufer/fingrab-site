import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './style.css'

const routes = [
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
        component: () => import('./components/PrivacyPolicy.vue'),
    },
    {
        path: '/blog',
        component: () => import('./components/BlogHome.vue'),
    },
    {
        path: '/blog/:slug',
        component: () => import('./components/BlogArticle.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]

// vite-ssg manages the router history (HTML5 history on the client,
// memory history while prerendering) — no hash mode. The route list to
// prerender lives in ssgOptions.includedRoutes (vite.config.js).
export const createApp = ViteSSG(App, { routes })
