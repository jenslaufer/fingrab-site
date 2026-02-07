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
                badge: 'PDFuse.app • Chrome Extension for modifying PDFs',
                headline: 'Stop Uploading Sensitive PDFs to Random Websites',
                uvp: 'PDFuse splits, merges, and manipulates PDFs directly in Chrome—your documents never leave your browser. Fast, private, secure.',
                cta: 'Add PDFuse.app to Chrome',
                ctaFooter: 'No signup. Setup in under 2 minutes.',
                productName: 'PDFuse.app',
                url: 'https://chromewebstore.google.com/detail/pdfuse-%E2%80%93-effortless-pdf-s/goidgjhddnkahdillfckdkhcdjdenecj'
            },
            component: () => import('./components/Home.vue'),
        }
    ]
})


createApp(App)
    .use(router)
    .use(createHead())
    .mount('#app')

