<!-- Hero illustration: the launcher as it sits on Yahoo Finance, and the file
     it produces. The launcher is a picture of a button, not a button — so no
     hover, no pointer, hidden from assistive tech, and captioned. -->
<template>
    <div>
        <div role="figure" aria-labelledby="launcher-caption"
            class="mb-6 flex flex-wrap-reverse items-center justify-end gap-x-4 gap-y-2">
            <span id="launcher-caption" class="fg-label">The FinGrab button on Yahoo Finance</span>
            <span aria-hidden="true"
                class="inline-flex h-11 cursor-default select-none items-center gap-2 rounded-lg bg-ink pr-4 pl-2 text-sm font-semibold text-white shadow-launcher">
                <FinGrabMark :size="28" />
                FinGrab
                <span class="border-l border-white/30 pl-2 font-normal text-white/80">Export CSV</span>
            </span>
        </div>

        <div aria-hidden="true" class="border border-line bg-white">
            <div class="flex items-baseline justify-between gap-4 border-b border-line px-6 py-4">
                <span class="font-mono font-medium">AAPL_1y_1d.csv</span>
                <span class="fg-label tnum">250 rows</span>
            </div>
            <div class="border-b border-line bg-paper px-6 pt-6 pb-4">
                <svg viewBox="0 0 300 80" class="block h-auto w-full overflow-visible">
                    <line x1="0" y1="80" x2="300" y2="80" class="stroke-line-2" stroke-width="1" />
                    <polyline class="spark stroke-ink" pathLength="1" fill="none" stroke-width="1.25"
                        stroke-linejoin="round" stroke-linecap="round" :points="sparkline" />
                </svg>
                <div class="mt-2 flex justify-between font-mono text-label text-ink-3 tnum">
                    <span>{{ span.from }}</span><span>close</span><span>{{ span.to }}</span>
                </div>
            </div>
            <pre class="overflow-x-auto p-6 font-mono text-label leading-loose text-ink tnum"><span
                class="text-ink-3">date,open,high,low,close,adjClose,volume</span>
<template v-for="row in rows" :key="row[0]">{{ row.join(',') }}
</template><span class="text-ink-3">…</span></pre>
        </div>
    </div>
</template>

<script setup>
import FinGrabMark from './FinGrabMark.vue'

// Specimen, as drawn in the approved mockup: the CSV header and first rows of
// an AAPL 1y/1d export, and a sketch of its close. An illustration of the file
// format, not a data claim — the dates under the line are its two ends.
const rows = [
    ['2025-07-11', '210.57', '212.13', '209.86', '211.16', '210.33', '39765800'],
    ['2025-07-14', '209.93', '210.91', '207.54', '208.62', '207.80', '38840100'],
    ['2025-07-15', '209.22', '211.89', '208.92', '209.11', '208.28', '42296300'],
    ['2025-07-16', '210.30', '212.40', '208.64', '210.16', '209.33', '47490500'],
    ['2025-07-17', '210.57', '211.80', '209.59', '210.02', '209.19', '48068100'],
]
const span = { from: '2025-07-11', to: '2025-07-31' }
const sparkline =
    '0,38.4 21.4,62.2 42.9,57.6 64.3,47.7 85.7,49 107.1,38.2 128.6,26 150,8 171.4,10.3 192.9,14 214.3,12.9 235.7,11.3 257.1,37.3 278.6,58.1 300,72'
</script>

<style scoped>
/* The line draws once — the same gesture as the launcher's mark. */
.spark {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: draw 900ms var(--ease-snap) 200ms forwards;
}
@keyframes draw {
    to { stroke-dashoffset: 0; }
}
@media (prefers-reduced-motion: reduce) {
    .spark { animation: none; stroke-dashoffset: 0; }
}
</style>
