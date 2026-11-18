<template>
    <div>
        <header class="border-b border-line">
            <div class="fg-wrap pt-16 pb-16 md:pt-24 md:pb-24">
                <router-link to="/" class="fg-nav-link">&larr; Back to FinGrab.app</router-link>
                <h1 class="mt-12 text-display font-semibold">FinGrab Blog</h1>
                <p class="mt-6 max-w-measure text-lead text-ink-2">Guides and tips for exporting and analyzing financial data.</p>
            </div>
        </header>

        <main class="fg-wrap py-16 md:py-24">
            <ArticleIndex :articles="articles" title-tag="h2" show-date class="max-w-4xl" />
        </main>
    </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { articles } from '../blog/articles.js'
import ArticleIndex from './ArticleIndex.vue'

useHead({
    title: 'FinGrab Blog – Guides for Financial Data Export',
    meta: [{ name: 'description', content: 'Guides and tips for exporting and analyzing financial data from Yahoo Finance.' }],
})
</script>
