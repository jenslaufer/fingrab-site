<template>
    <!-- Hero -->
    <div class="min-h-screen bg-linear-to-b bg-brand2 text-slate-100 flex items-center justify-center px-4">
        <div class="max-w-2xl w-full text-center">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full border border-white/10 bg-white/5 backdrop-blur">
                <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{{ badge }}</span>
            </div>

            <h1 class="text-sm tracking-[0.25em] uppercase text-slate-400 mb-2">
                {{ productName }}
            </h1>

            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                {{ headline }}
            </h2>

            <p class="text-sm sm:text-base lg:text-lg text-slate-300 mb-8 leading-relaxed">
                {{ uvp }}
            </p>

            <div class="flex flex-col items-center justify-center gap-3">
                <a :href="url" class="inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-semibold
                 bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30
                 transition-transform duration-150 hover:-translate-y-0.5">
                    {{ cta }}
                </a>
                <div class="text-xs sm:text-sm text-slate-400">
                    {{ ctaFooter }}
                </div>
            </div>
        </div>
    </div>

    <!-- How it works -->
    <section class="bg-slate-900 text-slate-100 py-20 px-4">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-semibold text-center mb-12">How it works</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div v-for="(step, i) in steps" :key="i" class="text-center">
                    <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl font-bold">
                        {{ i + 1 }}
                    </div>
                    <h3 class="font-semibold mb-2">{{ step.title }}</h3>
                    <p class="text-sm text-slate-400">{{ step.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- What you can export -->
    <section class="bg-slate-950 text-slate-100 py-20 px-4">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-semibold text-center mb-12">What you can export</h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="feat in features" :key="feat.title"
                     class="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h3 class="font-semibold mb-2">{{ feat.title }}</h3>
                    <p class="text-sm text-slate-400">{{ feat.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Use cases -->
    <section class="bg-slate-900 text-slate-100 py-20 px-4">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-semibold text-center mb-12">Use cases</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div v-for="uc in useCases" :key="uc.title"
                     class="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h3 class="font-semibold mb-2">{{ uc.title }}</h3>
                    <p class="text-sm text-slate-400">{{ uc.desc }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="bg-slate-950 text-slate-100 py-20 px-4">
        <div class="max-w-2xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-semibold text-center mb-12">Frequently asked questions</h2>
            <div class="space-y-4">
                <details v-for="faq in faqs" :key="faq.q"
                         class="rounded-xl border border-white/10 bg-white/5 p-4 group">
                    <summary class="font-semibold cursor-pointer list-none flex items-center justify-between">
                        {{ faq.q }}
                        <span class="text-slate-500 group-open:rotate-45 transition-transform text-xl">+</span>
                    </summary>
                    <p class="mt-3 text-sm text-slate-400">{{ faq.a }}</p>
                </details>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-brand2 text-slate-100 py-20 px-4">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-2xl sm:text-3xl font-semibold mb-4">Start exporting financial data</h2>
            <p class="text-slate-300 mb-8">Install FinGrab and download your first dataset in under 2 minutes.</p>
            <a :href="url" class="inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-semibold
                 bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30
                 transition-transform duration-150 hover:-translate-y-0.5">
                {{ cta }}
            </a>
            <div class="mt-12 text-xs text-slate-500">
                <router-link to="/privacy" class="hover:text-slate-300 underline underline-offset-2">Privacy Policy</router-link>
            </div>
        </div>
    </section>
</template>
<script setup>
import { useHead } from '@unhead/vue'

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

const steps = [
    { title: 'Install the extension', desc: 'Add FinGrab from the Chrome Web Store. Takes less than a minute.' },
    { title: 'Open Yahoo Finance', desc: 'Navigate to any stock, ETF, or index on finance.yahoo.com.' },
    { title: 'Export as CSV', desc: 'Click the FinGrab icon to download raw data instantly.' },
]

const features = [
    { title: 'Historical price data', desc: 'Open, High, Low, Close, Volume (OHLCV) for any time range.' },
    { title: 'Financial statements', desc: 'Income statements, balance sheets, and cash flow data.' },
    { title: 'Key statistics', desc: 'Ratios, valuation metrics, and fundamental data points.' },
    { title: 'Dividend history', desc: 'Complete dividend payment records with ex-dates and amounts.' },
    { title: 'Multiple time ranges', desc: 'Daily, weekly, or monthly data across custom date ranges.' },
]

const useCases = [
    { title: 'Portfolio analysis in Excel', desc: 'Export OHLCV data and build custom charts, pivot tables, and performance models in your spreadsheet.' },
    { title: 'Academic research', desc: 'Download structured financial data for papers, theses, and quantitative studies without API complexity.' },
    { title: 'Trading backtesting', desc: 'Feed historical price data into your backtesting framework to validate trading strategies.' },
]

const faqs = [
    { q: 'Is FinGrab free?', a: 'Yes. The free tier includes basic exports. Premium features are available for power users.' },
    { q: 'What data formats are supported?', a: 'CSV files compatible with Excel, Google Sheets, LibreOffice, Numbers, and any analysis tool that reads CSV.' },
    { q: 'Does it work with all Yahoo Finance pages?', a: 'FinGrab works with individual stock, ETF, and index pages on finance.yahoo.com.' },
    { q: 'Is my data stored anywhere?', a: 'No. All processing happens locally in your browser. No data is sent to external servers.' },
]
</script>
