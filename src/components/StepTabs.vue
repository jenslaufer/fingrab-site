<!-- Steps as tabs: the list sits in the left rail, the still for the selected
     step fills the right. Click or arrow keys; one still visible at a time.
     Renders two roots so the parent grid can place each. -->
<template>
    <div role="tablist" aria-label="Steps" aria-orientation="vertical" :class="['border-b border-line', listClass]">
        <button v-for="(step, i) in steps" :id="`step-tab-${i}`" :key="step.title" type="button"
            role="tab" :aria-selected="selected === i" :aria-controls="`step-panel-${i}`"
            :tabindex="selected === i ? 0 : -1"
            class="group block w-full cursor-pointer border-t-2 border-ink py-6 text-left transition-colors duration-150 ease-snap focus-visible:-outline-offset-2 aria-[selected=false]:border-line aria-[selected=false]:hover:border-line-2"
            @click="selected = i" @keydown="onKey($event, i)">
            <span class="flex gap-4">
                <span class="font-mono text-ink-3 tnum">{{ i + 1 }}</span>
                <span>
                    <span class="block font-semibold text-ink group-aria-[selected=false]:text-ink-2">{{ step.title }}</span>
                    <span class="mt-2 block text-ink-2 group-aria-[selected=false]:text-ink-3">{{ step.desc }}</span>
                </span>
            </span>
        </button>
    </div>
    <div :class="panelClass">
        <div v-for="(step, i) in steps" :id="`step-panel-${i}`" :key="step.still.src" role="tabpanel"
            :aria-labelledby="`step-tab-${i}`" :hidden="selected !== i" class="step-panel">
            <img :src="step.still.src" :width="step.still.width" :height="step.still.height" :alt="step.still.alt"
                :loading="i === 0 ? 'eager' : 'lazy'" class="block h-auto w-full border border-line" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    // [{ title, desc, still: { src, width, height, alt } }]
    steps: { type: Array, required: true },
    listClass: { type: String, default: '' },
    panelClass: { type: String, default: '' },
})

const selected = ref(0)

const STEP = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }

function onKey(event, i) {
    const d = STEP[event.key]
    if (!d) return
    event.preventDefault()
    const next = (i + d + props.steps.length) % props.steps.length
    selected.value = next
    document.getElementById(`step-tab-${next}`)?.focus()
}
</script>

<style scoped>
.step-panel:not([hidden]) {
    animation: show 200ms var(--ease-snap);
}
@keyframes show {
    from { opacity: 0; transform: translateY(8px); }
}
</style>
