<!-- Left-rail section head: a mono number above the h2, optional text below. -->
<template>
    <div>
        <p v-if="number" class="fg-label mb-4 tnum">{{ number }}</p>
        <h2 class="text-h2 font-semibold text-balance">{{ title }}</h2>
        <slot />
    </div>
</template>

<script setup>
defineProps({
    number: { type: String, default: '' },
    title: { type: String, required: true },
})
</script>
