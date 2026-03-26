<template>
    <div class="min-h-screen bg-slate-950 text-slate-100">
        <header class="bg-brand2 py-12 px-4">
            <div class="max-w-3xl mx-auto">
                <router-link to="/" class="text-sm text-slate-400 hover:text-emerald-400 mb-4 inline-block">&larr; Back to FinGrab.app</router-link>
                <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight">FinGrab Blog</h1>
                <p class="text-slate-300 mt-2">Guides and tips for exporting and analyzing financial data.</p>
            </div>
        </header>

        <main class="max-w-3xl mx-auto px-4 py-12">
            <div class="space-y-6">
                <router-link
                    v-for="article in articles"
                    :key="article.slug"
                    :to="`/blog/${article.slug}`"
                    class="block rounded-xl border border-white/10 bg-white/5 p-6 hover:border-emerald-500/50 transition-colors"
                >
                    <time class="text-xs text-slate-500">{{ article.date }}</time>
                    <h2 class="text-xl font-semibold mt-1 mb-2">{{ article.title }}</h2>
                    <p class="text-sm text-slate-400">{{ article.description }}</p>
                </router-link>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { articles } from '../blog/articles.js'

useHead({
    title: 'FinGrab Blog – Guides for Financial Data Export',
    meta: [{ name: 'description', content: 'Guides and tips for exporting and analyzing financial data from Yahoo Finance.' }],
})
</script>
