<!-- Page foot: small mark and name, then the quiet links. -->
<template>
    <footer class="border-t border-line">
        <div class="fg-wrap flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <span class="flex items-center gap-2 font-semibold">
                <FinGrabMark :size="16" small />
                {{ productName }}
            </span>
            <nav class="flex gap-8" aria-label="Footer">
                <router-link v-for="link in links" :key="link.to" :to="link.to" class="fg-nav-link">
                    {{ link.label }}
                </router-link>
            </nav>
        </div>
    </footer>
</template>

<script setup>
import FinGrabMark from './FinGrabMark.vue'

defineProps({
    productName: { type: String, default: 'FinGrab.app' },
    links: {
        type: Array,
        default: () => [
            { to: '/blog', label: 'Blog' },
            { to: '/privacy', label: 'Privacy Policy' },
        ],
    },
})
</script>
