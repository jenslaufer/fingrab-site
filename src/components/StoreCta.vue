<!-- The orange "Add … to Chrome" button with its note beside it. The note's
     first sentence (the free offer) is set in ink, the rest in grey. -->
<template>
    <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <a :href="url" class="fg-btn-primary">{{ cta }}</a>
        <p v-if="note" class="text-ink-3">
            <span class="font-semibold text-ink">{{ noteLead }}</span> {{ noteRest }}
        </p>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    url: { type: String, default: undefined },
    cta: { type: String, required: true },
    note: { type: String, default: '' },
})

const cut = computed(() => props.note.indexOf('. '))
const noteLead = computed(() => (cut.value < 0 ? props.note : props.note.slice(0, cut.value + 1)))
const noteRest = computed(() => (cut.value < 0 ? '' : props.note.slice(cut.value + 2)))
</script>
