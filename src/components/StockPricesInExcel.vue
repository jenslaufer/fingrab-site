<template>
    <main>
        <section class="fg-wrap grid grid-cols-12 gap-y-16 pt-16 pb-24 sm:gap-x-8 md:pt-24 md:pb-32">
            <div class="col-span-12 lg:col-span-9">
                <p class="fg-label mb-8">FinGrab.app • How-to</p>
                <h1 class="text-display font-semibold text-balance">
                    Get stock prices into Excel — without writing code
                </h1>
                <p class="mt-8 max-w-measure text-lead text-ink-2">
                    No API key, no Python, no copy-paste. Two clicks on any Yahoo Finance page
                    turn a year of price history into a clean CSV that opens straight in Excel,
                    Google Sheets, or Numbers.
                </p>
                <StoreCta :url="storeUrl" cta="Add FinGrab to Chrome"
                    :note="`${FREE_EXPORTS} free exports. No signup. Setup in under 2 minutes.`" class="mt-12" />
            </div>

            <figure class="col-span-12 lg:col-span-10">
                <img src="/demo/excel-demo.gif" width="800" height="500"
                    alt="Demo: exporting one year of AAPL daily prices from Yahoo Finance to CSV with the FinGrab Chrome extension"
                    class="block h-auto w-full border border-line" loading="eager" />
                <figcaption class="mt-4 max-w-measure text-ink-3">
                    Real screen captures: Apple (AAPL), 1 year of daily OHLCV data, exported as CSV — no code involved.
                </figcaption>
            </figure>
        </section>

        <section class="border-t border-line">
            <div class="fg-wrap py-24 md:py-32">
                <SectionHeading number="01" title="Three steps, two clicks" class="mb-16" />
                <ol class="border-t border-ink">
                    <li v-for="(step, i) in steps" :key="step.title"
                        class="grid grid-cols-12 gap-y-8 border-b border-line py-12 sm:gap-x-8">
                        <div class="col-span-12 flex gap-4 lg:col-span-4">
                            <span class="font-mono text-ink-3 tnum" aria-hidden="true">{{ i + 1 }}</span>
                            <div>
                                <h3 class="text-h3 font-semibold tracking-tight">{{ step.title }}</h3>
                                <p class="mt-4 max-w-measure text-ink-2">{{ step.desc }}</p>
                            </div>
                        </div>
                        <img :src="step.still.src" :alt="step.still.alt" :width="step.still.width"
                            :height="step.still.height" loading="lazy"
                            class="col-span-12 block h-auto w-full border border-line lg:col-span-8" />
                    </li>
                </ol>
            </div>
        </section>

        <section class="bg-paper">
            <div class="fg-wrap grid grid-cols-12 gap-y-12 py-24 sm:gap-x-8 md:py-32">
                <SectionHeading number="02" title="What lands in your spreadsheet" class="col-span-12 lg:col-span-4">
                    <p class="mt-4 max-w-measure-narrow text-ink-2">
                        A plain CSV — the file format every spreadsheet opens natively. One row per trading day
                        (or week, or month), ready for formulas, pivot tables, and charts.
                    </p>
                </SectionHeading>
                <dl class="col-span-12 border-t border-ink lg:col-span-8">
                    <div v-for="(feat, i) in facts" :key="feat.title"
                        class="grid grid-cols-12 gap-y-2 border-b border-line-2 py-6 sm:gap-x-8">
                        <dt class="col-span-12 flex gap-4 font-semibold sm:col-span-5">
                            <span class="font-mono font-normal text-ink-3 tnum" aria-hidden="true">{{ pad(i + 1) }}</span>
                            {{ feat.title }}
                        </dt>
                        <dd class="col-span-12 pl-8 text-ink-2 sm:col-span-7 sm:pl-0">{{ feat.desc }}</dd>
                    </div>
                </dl>
            </div>
        </section>

        <section>
            <div class="fg-wrap grid grid-cols-12 gap-y-12 py-24 sm:gap-x-8 md:py-32">
                <SectionHeading number="03" title="The other ways to do it" class="col-span-12 lg:col-span-4">
                    <p class="mt-4 max-w-measure-narrow text-ink-2">
                        All of these work. They just assume tools or patience you may not have.
                    </p>
                </SectionHeading>
                <div class="col-span-12 border-t border-ink lg:col-span-8">
                    <div v-for="alt in alternatives" :key="alt.title" class="border-b border-line py-6">
                        <h3 class="font-semibold">{{ alt.title }}</h3>
                        <p class="mt-2 max-w-measure text-ink-2">{{ alt.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="border-t border-line">
            <div class="fg-wrap grid grid-cols-12 gap-y-12 py-24 sm:gap-x-8 md:py-32">
                <SectionHeading number="04" title="Frequently asked questions" class="col-span-12 lg:col-span-4" />
                <div class="col-span-12 border-t border-ink lg:col-span-7">
                    <div v-for="faq in faqs" :key="faq.q" class="border-b border-line py-6">
                        <h3 class="font-semibold">{{ faq.q }}</h3>
                        <p class="mt-2 max-w-measure text-ink-2">{{ faq.a }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-paper">
            <div class="fg-wrap py-24 md:py-32">
                <h2 class="max-w-4xl text-display font-semibold">Try it on the next stock you look up</h2>
                <p class="mt-6 max-w-measure text-lead text-ink-2">
                    {{ FREE_EXPORTS }} free exports to see if it fits your workflow. No signup, no API key.
                </p>
                <StoreCta :url="storeUrl" cta="Add FinGrab to Chrome" class="mt-12" />
            </div>
        </section>

        <section>
            <div class="fg-wrap grid grid-cols-12 gap-y-12 py-24 sm:gap-x-8 md:py-32">
                <h3 class="col-span-12 text-h2 font-semibold lg:col-span-4">Keep reading</h3>
                <ArticleIndex :articles="relatedGuides" title-tag="h4" class="col-span-12 lg:col-span-8" />
            </div>
        </section>
    </main>

    <SiteFooter :links="footerLinks" />
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { findArticle } from '../blog/articles.js'
import { FREE_EXPORTS, STORE_URL } from '../config.js'
import { STILLS } from '../stills.js'
import { faqPage, ldScript } from '../structuredData.js'
import ArticleIndex from './ArticleIndex.vue'
import SectionHeading from './SectionHeading.vue'
import SiteFooter from './SiteFooter.vue'
import StoreCta from './StoreCta.vue'

const storeUrl = STORE_URL

const pad = n => String(n).padStart(2, '0')

const footerLinks = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/privacy', label: 'Privacy' },
]

const steps = [
    {
        title: 'Open any stock on Yahoo Finance',
        desc: 'Look up a ticker on finance.yahoo.com the way you always do — stocks, ETFs, indices, or crypto. The dark FinGrab button sits in the top-right corner of every quote page.',
        still: STILLS[0],
    },
    {
        title: 'Click it — the ticker is already detected',
        desc: 'The export dialog opens with the symbol filled in. Pick a time period — six months up to maximum history, all of it available on the free exports too — and an interval: daily, weekly, or monthly candles. The data is fetched directly from Yahoo Finance and processed locally in your browser.',
        still: STILLS[1],
    },
    {
        title: 'Download CSV — open it in Excel',
        desc: 'One more click and the file is in your downloads folder, named like AAPL_1y_1d.csv. Double-click it and Excel opens a clean table: one row per trading day, seven tidy columns, no cleanup needed.',
        still: STILLS[2],
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
        a: `Yes, to start: you get ${FREE_EXPORTS} free exports — no signup, no credit card, and every time range from six months to maximum history is open on them. If it earns a place in your workflow, Pro lifts the export count.`,
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
    script: [ldScript('ld-page', faqPage(faqs))],
})
</script>
