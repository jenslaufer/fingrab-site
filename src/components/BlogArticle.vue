<template>
    <div class="fg-wrap grid grid-cols-12 gap-y-8 pt-16 pb-24 sm:gap-x-8 md:pt-24 md:pb-32">
        <div class="col-span-12 lg:col-span-3">
            <router-link to="/blog" class="fg-nav-link">&larr; All articles</router-link>
        </div>
        <header class="col-span-12 border-b border-line pb-12 lg:col-span-9">
            <h1 class="max-w-4xl text-h2 font-semibold text-balance">{{ article.title }}</h1>
            <time :datetime="article.date" class="fg-label mt-6 block tnum">{{ article.date }}</time>
        </header>

        <main class="col-span-12 pt-4 lg:col-span-9 lg:col-start-4">
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
import { findArticle, headTitle } from '../blog/articles.js'

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
        title: headTitle(a),
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
