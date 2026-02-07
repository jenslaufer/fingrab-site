import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createHead } from '@unhead/vue/client'
import { createWebHashHistory, createRouter } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '',
            props: {
                badge: 'FinGrab.app • Chrome Extension for Financial Data',
                headline: 'Grab financial raw data–in seconds, with one click',
                uvp: 'Analyze financial data on your terms. Download raw data from Yahoo Finance with the FinGrab Chrome Extension—ready for Excel, Google Sheets, OpenOffice, or your favorite analysis tool',
                cta: 'Add FinGrab.app to Chrome',
                ctaFooter: 'No signup. Setup in under 2 minutes.',
                productName: 'FinGrab.app',
                url: 'https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm'
            },
            component: () => import('./components/Home.vue'),
        }
    ]
})


createApp(App)
    .use(router)
    .use(createHead())
    .mount('#app')

