<!-- The FinGrab mark, same drawing as the extension (components/FinGrabMark.vue
     there): a price line over two table rows on a 16 px grid. `small` is the
     toolbar variant — header row over two rows, whole pixels only — for sizes
     where the diagonal would blur. -->
<template>
    <svg :width="size" :height="size" viewBox="0 0 16 16" aria-hidden="true" class="shrink-0">
        <rect width="16" height="16" rx="3" :class="tile === 'accent' ? 'fill-accent' : 'fill-ink'" />
        <g v-if="small" class="fill-white">
            <rect x="3" y="4" width="10" height="2" />
            <rect x="3" y="7" width="3" height="2" />
            <rect x="7" y="7" width="6" height="2" />
            <rect x="3" y="10" width="3" height="2" />
            <rect x="7" y="10" width="6" height="2" />
        </g>
        <template v-else>
            <path d="M3 7.25 6 4.25 9 6.25 13 2.75" fill="none" class="stroke-white" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" />
            <g class="fill-white">
                <rect x="3" y="9" width="3" height="2" />
                <rect x="7" y="9" width="6" height="2" />
                <rect x="3" y="12" width="3" height="2" />
                <rect x="7" y="12" width="6" height="2" />
            </g>
        </template>
    </svg>
</template>

<script setup>
defineProps({
    size: { type: Number, default: 24 },
    tile: { type: String, default: 'ink', validator: v => ['ink', 'accent'].includes(v) },
    small: { type: Boolean, default: false },
})
</script>
