<template>
    <div class="min-h-screen bg-slate-950 text-slate-100">
        <header class="bg-brand2 py-12 px-4">
            <div class="max-w-3xl mx-auto">
                <router-link to="/blog" class="text-sm text-slate-400 hover:text-emerald-400 mb-4 inline-block">&larr; All articles</router-link>
                <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight">{{ article.title }}</h1>
                <time class="text-sm text-slate-400 mt-2 block">{{ article.date }}</time>
            </div>
        </header>

        <main class="max-w-3xl mx-auto px-4 py-12">
            <article class="prose-blog">
                <component :is="articleComponent" />
            </article>
        </main>
    </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { findArticle } from '../blog/articles.js'

const route = useRoute()
const article = computed(() => findArticle(route.params.slug))

const articleComponent = computed(() => {
    const a = article.value
    if (!a) return null
    return defineAsyncComponent(a.component)
})

useHead(computed(() => {
    const a = article.value
    if (!a) return {}
    return {
        title: `${a.title} – FinGrab Blog`,
        meta: [{ name: 'description', content: a.description }],
        script: [{
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: a.title,
                description: a.description,
                datePublished: a.date,
                publisher: {
                    '@type': 'Organization',
                    name: 'FinGrab',
                    url: 'https://fingrab.app',
                },
            }),
        }],
    }
}))
</script>
