<template>
    <h2>Related Articles</h2>
    <ul class="list-none border-t border-ink pl-0">
        <li v-for="article in related" :key="article.slug" class="mb-0 border-b border-line py-4">
            <router-link :to="'/blog/' + article.slug" class="font-semibold">
                {{ article.title }}
            </router-link>
            <p class="mt-1 mb-0 text-ink-3">{{ article.description }}</p>
        </li>
    </ul>
</template>

<script setup>
import { computed } from 'vue'
import { articles } from '../blog/articles.js'

const props = defineProps({
    slugs: {
        type: Array,
        required: true,
    },
})

const related = computed(() =>
    props.slugs.map(slug => articles.find(a => a.slug === slug)).filter(Boolean)
)
</script>
