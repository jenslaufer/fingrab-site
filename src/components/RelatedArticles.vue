<template>
    <h2>Related Articles</h2>
    <ul class="list-none pl-0 space-y-3">
        <li v-for="article in related" :key="article.slug">
            <router-link :to="'/blog/' + article.slug" class="text-blue-600 hover:underline">
                {{ article.title }}
            </router-link>
            <p class="text-sm text-gray-500 mt-1 mb-0">{{ article.description }}</p>
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
