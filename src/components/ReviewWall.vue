<!-- Store reviews: one set large as the lead, the rest as an index under it.
     The DOM keeps the listing's order (newest first) for every reader; only
     the lead is lifted to the top visually, with CSS order. -->
<template>
    <section class="border-b border-line">
        <div class="fg-wrap grid grid-cols-12 gap-y-16 py-24 sm:gap-x-8 md:py-32">
            <SectionHeading :number="number" title="Loved by analysts and investors"
                class="col-span-12 lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
                <p class="mt-4 text-ink-2">Real reviews from the Chrome Web Store.</p>
                <p class="mt-8">
                    <a :href="reviewsUrl" target="_blank" rel="noopener" class="fg-link">
                        Read all reviews on the Chrome Web Store
                    </a>
                </p>
            </SectionHeading>

            <div class="col-span-12 grid content-start gap-x-8 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
                <figure v-for="r in reviews" :key="r.author"
                    :class="r.author === lead
                        ? 'order-first mb-16 border-t border-ink pt-8 sm:col-span-2 xl:col-span-3'
                        : 'mb-8 border-t border-line pt-4'">
                    <div role="img" aria-label="5 out of 5 stars"
                        :class="r.author === lead ? 'tracking-widest' : 'text-label tracking-widest'">★★★★★</div>
                    <blockquote
                        :class="r.author === lead ? 'mt-6 text-quote font-medium text-balance' : 'mt-2'">“{{ r.quote }}”</blockquote>
                    <figcaption :class="['font-mono text-label text-ink-3', r.author === lead ? 'mt-6' : 'mt-2']">
                        {{ r.author }} · Chrome Web Store
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>
</template>

<script setup>
import SectionHeading from './SectionHeading.vue'

defineProps({
    number: { type: String, default: '' },
    // [{ author, quote }], in the order the store lists them
    reviews: { type: Array, required: true },
    reviewsUrl: { type: String, required: true },
    // author of the review set large
    lead: { type: String, default: '' },
})
</script>
