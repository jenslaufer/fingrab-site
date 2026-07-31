<template>
    <!-- Hero -->
    <div class="bg-brand2 text-slate-100 px-4 pt-20 pb-16">
        <div class="max-w-3xl mx-auto text-center">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full border border-white/10 bg-white/5 backdrop-blur">
                <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>FinGrab.app • How-to</span>
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                Get stock prices into Excel — without writing code
            </h1>

            <p class="text-sm sm:text-base lg:text-lg text-slate-300 mb-8 leading-relaxed">
                No API key, no Python, no copy-paste. Two clicks on any Yahoo Finance page
                turn a year of price history into a clean CSV that opens straight in Excel,
                Google Sheets, or Numbers.
            </p>

            <div class="flex flex-col items-center justify-center gap-3 mb-12">
                <a :href="storeUrl" class="inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-semibold
                 bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30
                 transition-transform duration-150 hover:-translate-y-0.5">
                    Add FinGrab to Chrome
                </a>
                <div class="text-xs sm:text-sm text-slate-400">
                    {{ FREE_EXPORTS }} free exports. No signup. Setup in under 2 minutes.
                </div>
            </div>

            <figure class="rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                <img src="/demo/excel-demo.gif" width="800" height="500"
                    alt="Demo: exporting one year of AAPL daily prices from Yahoo Finance to CSV with the FinGrab Chrome extension"
                    class="w-full" loading="eager" />
                <figcaption class="bg-slate-950/80 text-xs text-slate-400 px-4 py-2 text-left">
                    Real screen captures: Apple (AAPL), 1 year of daily OHLCV data, exported as CSV — no code involved.
                </figcaption>
            </figure>
        </div>
    </div>

    <!-- Steps -->
    <section class="bg-slate-900 text-slate-100 py-20 px-4">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-semibold text-center mb-12">Three steps, two clicks</h2>
            <div class="space-y-16">
                <div v-for="(step, i) in steps" :key="i" class="grid md:grid-cols-2 gap-8 items-center">
                    <div :class="i % 2 === 1 ? 'md:order-2' : ''">
                        <div
                            class="w-10 h-10 mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg font-bold">
                            {{ i + 1 }}
                        </div>
                        <h3 class="text-xl font-semibold mb-3">{{ step.title }}</h3>
                        <p class="text-sm text-slate-400 leading-relaxed">{{ step.desc }}</p>
                    </div>
                    <figure :class="i % 2 === 1 ? 'md:order-1' : ''"
                        class="rounded-xl border border-white/10 overflow-hidden shadow-xl">
                        <img :src="step.img" :alt="step.alt" class="w-full" loading="lazy" width="1200"
                            :height="step.imgHeight" />
                    </figure>
                </div>
            </div>
        </div>
    </section>

    <!-- What you get -->
    <section class="bg-slate-950 text-slate-100 py-20 px-4">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-semibold text-center mb-6">What lands in your spreadsheet</h2>
            <p class="text-sm sm:text-base text-slate-400 text-center max-w-2xl mx-auto mb-12">
                A plain CSV — the file format every spreadsheet opens natively. One row per trading day
                (or week, or month), ready for formulas, pivot tables, and charts.
            </p>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="feat in facts" :key="feat.title" class="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h3 class="font-semibold mb-2">{{ feat.title }}</h3>
                    <p class="text-sm text-slate-400">{{ feat.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Honest alternatives -->
    <section class="bg-slate-900 text-slate-100 py-20 px-4">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-semibold text-center mb-6">The other ways to do it</h2>
            <p class="text-sm sm:text-base text-slate-400 text-center max-w-2xl mx-auto mb-12">
                All of these work. They just assume tools or patience you may not have.
            </p>
            <div class="space-y-4">
                <div v-for="alt in alternatives" :key="alt.title"
                    class="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h3 class="font-semibold mb-2">{{ alt.title }}</h3>
                    <p class="text-sm text-slate-400 leading-relaxed">{{ alt.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="bg-slate-950 text-slate-100 py-20 px-4">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-semibold text-center mb-12">Frequently asked questions</h2>
            <div class="space-y-8">
                <div v-for="faq in faqs" :key="faq.q">
                    <h3 class="font-semibold mb-2">{{ faq.q }}</h3>
                    <p class="text-sm text-slate-400 leading-relaxed">{{ faq.a }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA + related guides -->
    <section class="bg-brand2 text-slate-100 py-20 px-4">
        <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-2xl sm:text-3xl font-semibold mb-4">Try it on the next stock you look up</h2>
            <p class="text-sm sm:text-base text-slate-400 mb-8">
                {{ FREE_EXPORTS }} free exports to see if it fits your workflow. No signup, no API key.
            </p>
            <a :href="storeUrl" class="inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-semibold
             bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30
             transition-transform duration-150 hover:-translate-y-0.5 mb-16">
                Add FinGrab to Chrome
            </a>

            <h3 class="text-lg font-semibold mb-6">Keep reading</h3>
            <div class="grid sm:grid-cols-3 gap-4 text-left">
                <router-link v-for="guide in relatedGuides" :key="guide.slug" :to="`/blog/${guide.slug}`"
                    class="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
                    <div class="font-semibold text-sm mb-2">{{ guide.title }}</div>
                    <div class="text-xs text-slate-400 leading-relaxed">{{ guide.description }}</div>
                </router-link>
            </div>

            <nav class="mt-16 flex items-center justify-center gap-6 text-xs text-slate-500">
                <router-link to="/" class="hover:text-slate-300 transition-colors">Home</router-link>
                <router-link to="/blog" class="hover:text-slate-300 transition-colors">Blog</router-link>
                <router-link to="/privacy" class="hover:text-slate-300 transition-colors">Privacy</router-link>
            </nav>
        </div>
    </section>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { findArticle } from '../blog/articles.js'
import { FREE_EXPORTS } from '../config.js'

const storeUrl =
    'https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm'

const steps = [
    {
        title: 'Open any stock on Yahoo Finance',
        desc: 'Look up a ticker on finance.yahoo.com the way you always do — stocks, ETFs, indices, or crypto. The purple FinGrab button sits in the top-right corner of every quote page.',
        img: '/demo/step-1-yahoo-button.webp',
        imgHeight: 750,
        alt: 'Yahoo Finance quote page for Apple (AAPL) with the FinGrab "Download Data for Ticker" button in the top-right corner',
    },
    {
        title: 'Click it — the ticker is already detected',
        desc: 'The export dialog opens with the symbol filled in. Pick a time period (up to one year free, full history on Pro) and an interval: daily, weekly, or monthly candles. The data is fetched directly from Yahoo Finance and processed locally in your browser.',
        img: '/demo/step-2-export-dialog.webp',
        imgHeight: 750,
        alt: 'FinGrab Historical Data Export dialog with the AAPL ticker auto-detected and time period and interval selectors',
    },
    {
        title: 'Download CSV — open it in Excel',
        desc: 'One more click and the file is in your downloads folder, named like AAPL_1y_1d.csv. Double-click it and Excel opens a clean table: one row per trading day, seven tidy columns, no cleanup needed.',
        img: '/demo/step-3-csv-result.webp',
        imgHeight: 754,
        alt: 'The exported CSV opened as a spreadsheet: date, open, high, low, close, adjusted close, and volume columns with one year of AAPL data',
    },
]

const facts = [
    { title: 'OHLCV + adjusted close', desc: 'date, open, high, low, close, adjClose, volume — the columns every analysis starts from.' },
    { title: 'Splits & dividends handled', desc: 'The adjusted close column accounts for splits and dividend payouts, so long-range charts stay honest.' },
    { title: 'Daily, weekly, monthly', desc: 'Choose the candle size that fits your model — from day-trading granularity to decade overviews.' },
    { title: 'Any Yahoo Finance ticker', desc: 'Stocks, ETFs, indices, currencies, crypto — if it has a quote page, it exports.' },
    { title: 'Opens everywhere', desc: 'CSV is native to Excel, Google Sheets, Numbers, and OpenOffice. No import wizard needed.' },
    { title: 'Local processing', desc: 'Data goes from Yahoo Finance straight into your browser and onto your disk. No account, no middleman server.' },
]

const alternatives = [
    {
        title: 'Copy-paste from the Historical Data tab',
        desc: 'Free and obvious, but you get a page at a time, the formatting breaks on paste, and you redo it every time the data updates. Fine once, painful weekly.',
    },
    {
        title: 'Excel’s STOCKHISTORY function',
        desc: 'Elegant if you have it — but it requires a Microsoft 365 subscription, covers fewer tickers than Yahoo Finance, and leaves you inside Excel’s data types rather than a plain portable file.',
    },
    {
        title: 'The yfinance Python library',
        desc: 'The right tool if you already write Python. If you don’t, it means installing Python, learning pandas, and debugging scripts — a big detour when all you wanted was a CSV.',
    },
    {
        title: 'Financial data APIs',
        desc: 'Powerful for apps, overkill for spreadsheets: API keys, request limits, JSON parsing, and often a paid tier before you get meaningful history.',
    },
]

const faqs = [
    {
        q: 'Is FinGrab free?',
        a: `You get ${FREE_EXPORTS} free exports — no signup, no credit card. If it earns a place in your workflow, Pro unlocks unlimited exports and full price history (2 years, 5 years, maximum).`,
    },
    {
        q: 'Do I need an API key or a Yahoo account?',
        a: 'No. FinGrab reads the data for the quote page you are on, directly from Yahoo Finance, and processes it locally in your browser. There is nothing to register and no key to manage.',
    },
    {
        q: 'Which tickers does it work with?',
        a: 'Anything with a Yahoo Finance quote page: stocks, ETFs, indices, currencies, and crypto. The button appears on every quote page automatically.',
    },
    {
        q: 'What exactly is in the CSV file?',
        a: 'Seven columns — date, open, high, low, close, adjusted close, volume — with one row per interval (day, week, or month) over the time period you picked.',
    },
    {
        q: 'Does it work with Google Sheets?',
        a: 'Yes. CSV is a universal format: upload the file to Google Drive or use File → Import in Sheets, and it lands as a clean table, same as in Excel.',
    },
]

const relatedGuides = [
    'excel-stock-analysis',
    'export-yahoo-finance-csv',
    'historical-stock-price-data',
].map(findArticle).filter(Boolean)

useHead({
    title: 'Get Stock Prices into Excel — No Code, 2 Clicks | FinGrab',
    meta: [
        {
            name: 'description',
            content:
                `How to get stock prices into Excel without code, APIs, or copy-paste: two clicks on any Yahoo Finance page export historical prices as a clean CSV. ${FREE_EXPORTS} free exports.`,
        },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map(f => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            }),
        },
    ],
})
</script>
