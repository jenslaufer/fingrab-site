<!-- A list of articles as full-row links: title, arrow, description, and the
     date when asked for. Hairlines between rows, a heavier rule on top. -->
<template>
    <ul class="border-t border-ink">
        <li v-for="article in articles" :key="article.slug" class="border-b border-line">
            <router-link :to="`/blog/${article.slug}`"
                class="group grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 py-6 focus-visible:-outline-offset-2">
                <time v-if="showDate" :datetime="article.date" class="col-start-1 fg-label tnum">{{ article.date }}</time>
                <component :is="titleTag"
                    class="col-start-1 text-h3 font-semibold tracking-tight transition-colors duration-150 ease-snap group-hover:text-accent">
                    {{ article.title }}
                </component>
                <span aria-hidden="true"
                    class="col-start-2 row-span-2 self-center text-h3 text-accent transition-transform duration-150 ease-snap group-hover:translate-x-1"
                    :class="showDate ? 'row-start-2' : 'row-start-1'">→</span>
                <p class="col-start-1 max-w-measure text-ink-2">{{ article.description }}</p>
            </router-link>
        </li>
    </ul>
</template>

<script setup>
defineProps({
    // [{ slug, title, description, date }]
    articles: { type: Array, required: true },
    titleTag: { type: String, default: 'h3' },
    showDate: { type: Boolean, default: false },
})
</script>
