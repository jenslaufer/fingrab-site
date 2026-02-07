<template>
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
</template>
<script setup>
import { useHead } from '@unhead/vue'

const props = defineProps({
    badge: {
        type: String,
        required: true
    },
    productName: {
        type: String,

        required: true
    },
    headline: {
        type: String,
        required: true
    },
    uvp: {
        type: String,
        required: true
    },
    cta: {
        type: String,
        required: true

    },
    ctaFooter: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    }
})


useHead({
    title: `${props.productName}–${props.headline}`,
})
</script>
