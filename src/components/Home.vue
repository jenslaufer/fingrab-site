<template>
    <header class="sticky top-0 z-10 border-b border-line bg-white">
        <div class="fg-wrap flex h-16 items-center justify-between gap-8">
            <h1>
                <a href="#top" class="flex items-center gap-2 font-semibold tracking-tight">
                    <FinGrabMark :size="24" />
                    {{ productName }}
                </a>
            </h1>
            <nav class="hidden items-center gap-8 text-ink-2 md:flex" aria-label="Sections">
                <a v-for="item in sections" :key="item.href" :href="item.href"
                    class="transition-colors duration-150 ease-snap hover:text-ink">{{ item.label }}</a>
                <router-link to="/blog" class="transition-colors duration-150 ease-snap hover:text-ink">Blog</router-link>
            </nav>
            <a :href="url" class="fg-link font-semibold">Add to Chrome</a>
        </div>
    </header>

    <main id="top">
        <section class="fg-wrap grid grid-cols-12 gap-y-16 pt-16 pb-24 sm:gap-x-8 md:pt-24 md:pb-32">
            <div class="col-span-12 lg:col-span-7">
                <p class="fg-label mb-8">{{ badge }}</p>
                <h2 class="text-display font-semibold text-balance">{{ headline }}</h2>
                <p class="mt-8 max-w-measure text-lead text-ink-2">{{ uvp }}</p>
                <StoreCta :url="url" :cta="cta" :note="ctaFooter" class="mt-12" />
            </div>
            <HeroSpecimen class="col-span-12 lg:col-span-5 lg:mt-16" />
        </section>

        <section id="how" class="border-t border-line">
            <div class="fg-wrap grid grid-cols-12 gap-y-12 py-24 sm:gap-x-8 md:py-32 lg:grid-rows-[auto_auto_1fr]">
                <SectionHeading number="01" title="How it works" class="col-span-12 lg:col-span-4" />
                <StepTabs :steps="steps" list-class="col-span-12 lg:col-span-4"
                    panel-class="col-span-12 lg:col-span-8 lg:col-start-5 lg:row-span-3 lg:row-start-1 lg:pt-16" />
                <p class="col-span-12 self-start lg:col-span-4">
                    <router-link to="/stock-prices-in-excel" class="fg-link">
                        See it live: get stock prices into Excel in two clicks →
                    </router-link>
                </p>
            </div>
        </section>

        <section class="border-t border-line">
            <div class="fg-wrap grid grid-cols-12 gap-y-12 py-24 sm:gap-x-8 md:py-32">
                <SectionHeading number="02" title="What you can export" class="col-span-12 lg:col-span-4" />
                <dl class="col-span-12 border-t border-ink lg:col-span-8">
                    <div v-for="(feat, i) in features" :key="feat.title"
                        class="grid grid-cols-12 gap-y-2 border-b border-line py-6 sm:gap-x-8">
                        <dt class="col-span-12 flex gap-4 font-semibold sm:col-span-5">
                            <span class="font-mono font-normal text-ink-3 tnum" aria-hidden="true">{{ pad(i + 1) }}</span>
                            {{ feat.title }}
                        </dt>
                        <dd class="col-span-12 pl-8 text-ink-2 sm:col-span-7 sm:pl-0">{{ feat.desc }}</dd>
                    </div>
                </dl>
            </div>
        </section>

        <section class="bg-paper">
            <div class="fg-wrap py-24 md:py-32">
                <SectionHeading number="03" title="Use cases" class="mb-16" />
                <div class="grid grid-cols-1 border-t border-line-2 md:grid-cols-3">
                    <article v-for="(uc, i) in useCases" :key="uc.title"
                        :class="['py-8 md:py-0 md:pt-8', i < useCases.length - 1 ? 'border-b border-line-2 md:border-b-0' : '',
                            i > 0 ? 'md:border-l md:border-line-2 md:pl-8' : '', i < useCases.length - 1 ? 'md:pr-8' : '']">
                        <h3 class="text-h3 font-semibold tracking-tight">{{ uc.title }}</h3>
                        <p class="mt-4 max-w-measure-narrow text-ink-2">{{ uc.desc }}</p>
                    </article>
                </div>
            </div>
        </section>

        <ReviewWall id="reviews" number="04" :reviews="testimonials" :reviews-url="reviewsUrl" lead="Ben Victor" />

        <section id="faq">
            <div class="fg-wrap grid grid-cols-12 gap-y-12 py-24 sm:gap-x-8 md:py-32">
                <SectionHeading number="05" title="Frequently asked questions" class="col-span-12 lg:col-span-4" />
                <div class="col-span-12 border-t border-ink lg:col-span-7">
                    <details v-for="(faq, i) in faqs" :key="faq.q" class="group border-b border-line" :open="i === 0">
                        <summary
                            class="flex cursor-pointer list-none items-center justify-between gap-8 py-6 font-semibold transition-colors duration-150 ease-snap hover:text-ink-2 focus-visible:-outline-offset-2">
                            {{ faq.q }}
                            <span aria-hidden="true"
                                class="font-mono text-h3 font-normal text-ink-3 transition-transform duration-200 ease-fold group-open:rotate-45">+</span>
                        </summary>
                        <p class="max-w-measure pb-6 text-ink-2">{{ faq.a }}</p>
                    </details>
                </div>
            </div>
        </section>

        <section class="border-t border-line">
            <div class="fg-wrap grid grid-cols-12 gap-y-12 py-24 sm:gap-x-8 md:py-32">
                <SectionHeading number="06" title="Guides & tutorials" class="col-span-12 lg:col-span-4">
                    <p class="mt-4 max-w-measure-narrow text-ink-2">Free, no-code walkthroughs for getting financial data into your spreadsheet.</p>
                </SectionHeading>
                <div class="col-span-12 lg:col-span-8">
                    <ArticleIndex :articles="featuredGuides" />
                    <p class="mt-8">
                        <router-link to="/blog" class="fg-link">Browse all guides →</router-link>
                    </p>
                </div>
            </div>
        </section>

        <section class="bg-paper">
            <div class="fg-wrap py-24 md:py-32">
                <h2 class="max-w-4xl text-display font-semibold">Start exporting financial data</h2>
                <p class="mt-6 max-w-measure text-lead text-ink-2">Install FinGrab and download your first dataset in under 2 minutes.</p>
                <StoreCta :url="url" :cta="cta" class="mt-12" />
            </div>
        </section>
    </main>

    <SiteFooter :product-name="productName" />
</template>
<script setup>
import { useHead } from '@unhead/vue'
import { findArticle } from '../blog/articles.js'
import { FREE_EXPORTS } from '../config.js'
import { STORE_REVIEWS as testimonials } from '../reviews.js'
import { STILLS } from '../stills.js'
import ArticleIndex from './ArticleIndex.vue'
import FinGrabMark from './FinGrabMark.vue'
import HeroSpecimen from './HeroSpecimen.vue'
import ReviewWall from './ReviewWall.vue'
import SectionHeading from './SectionHeading.vue'
import SiteFooter from './SiteFooter.vue'
import StepTabs from './StepTabs.vue'
import StoreCta from './StoreCta.vue'

const props = defineProps({
    badge: { type: String, required: true },
    productName: { type: String, required: true },
    headline: { type: String, required: true },
    uvp: { type: String, required: true },
    cta: { type: String, required: true },
    ctaFooter: { type: String, required: true },
    url: { type: String, required: false }
})

useHead({
    title: `${props.productName}–${props.headline}`,
})

const reviewsUrl = props.url ? `${props.url}/reviews` : '#'

const sections = [
    { href: '#how', label: 'How it works' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#faq', label: 'FAQ' },
]

const pad = n => String(n).padStart(2, '0')

// Internal links from the indexed homepage into the blog. Titles/descriptions
// come from articles.js (single source of truth) so they never drift. These
// give Google a crawl path from the trusted homepage to specific articles.
const featuredGuides = [
    'export-yahoo-finance-csv',
    'historical-stock-price-data',
    'best-free-stock-screeners',
].map(findArticle).filter(Boolean)

const steps = [
    { title: 'Install the extension', desc: 'Add FinGrab from the Chrome Web Store. Takes less than a minute.' },
    { title: 'Open Yahoo Finance', desc: 'Navigate to any stock, ETF, or index on finance.yahoo.com.' },
    { title: 'Export as CSV', desc: 'Click the FinGrab icon to download raw data instantly.' },
].map((step, i) => ({ ...step, still: STILLS[i] }))

const features = [
    { title: 'Historical price data', desc: 'Open, High, Low, Close, Volume (OHLCV) for any time range.' },
    { title: 'Adjusted close', desc: 'Prices adjusted for splits and dividends, so long-range charts stay consistent.' },
    { title: 'Multiple time ranges', desc: 'Daily, weekly, or monthly data across custom date ranges.' },
]

const useCases = [
    { title: 'Portfolio analysis in Excel', desc: 'Export OHLCV data and build custom charts, pivot tables, and performance models in your spreadsheet.' },
    { title: 'Academic research', desc: 'Download structured financial data for papers, theses, and quantitative studies without API complexity.' },
    { title: 'Trading backtesting', desc: 'Feed historical price data into your backtesting framework to validate trading strategies.' },
]

const faqs = [
    { q: 'Is FinGrab free?', a: `Yes — ${FREE_EXPORTS} free exports with full access to all time ranges and intervals. No signup required. Need more? Upgrade to unlock unlimited downloads.` },
    { q: 'What data formats are supported?', a: 'CSV files compatible with Excel, Google Sheets, LibreOffice, Numbers, and any analysis tool that reads CSV.' },
    { q: 'Does it work with all Yahoo Finance pages?', a: 'FinGrab works with individual stock, ETF, and index pages on finance.yahoo.com.' },
    { q: 'Is my data stored anywhere?', a: 'No. All processing happens locally in your browser. No data is sent to external servers.' },
]
</script>
