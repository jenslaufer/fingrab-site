<template>
    <main class="fg-wrap pt-16 pb-24 md:pt-24 md:pb-32">
        <header class="border-b border-line pb-16">
            <div class="mb-8 flex flex-wrap gap-x-8 gap-y-2">
                <p class="fg-label">Last updated: March 5, 2026</p>
                <h1 class="fg-label order-first">FinGrab</h1>
            </div>
            <h2 class="text-display font-semibold">Privacy Policy</h2>
            <p class="mt-8 max-w-measure text-lead text-ink-2">
                FinGrab is a browser extension that exports historical OHLCV data from Yahoo Finance as CSV.
                This policy explains what data is handled, by whom, and your rights under applicable law
                including the GDPR.
            </p>
        </header>

        <section class="grid grid-cols-12 gap-y-4 border-b border-line py-12 sm:gap-x-8">
            <h3 class="col-span-12 text-h3 font-semibold tracking-tight lg:col-span-4">1. No Personal Data Collected</h3>
            <div class="col-span-12 max-w-measure text-ink-2 lg:col-span-7">
                <p>
                    FinGrab does not collect, store, transmit, or process any personal data on any
                    server operated by FinGrab. The extension requires no account, no registration,
                    and no login. No cookies are set by the extension.
                </p>
            </div>
        </section>

        <section class="grid grid-cols-12 gap-y-4 border-b border-line py-12 sm:gap-x-8">
            <h3 class="col-span-12 text-h3 font-semibold tracking-tight lg:col-span-4">2. Local Processing Only</h3>
            <div class="col-span-12 max-w-measure text-ink-2 lg:col-span-7">
                <p>
                    All data processing happens entirely within your browser. When you trigger an
                    export, the extension fetches publicly available OHLCV data directly from Yahoo
                    Finance and writes it to a CSV file on your device. No data passes through any
                    FinGrab-controlled server at any point.
                </p>
            </div>
        </section>

        <section class="grid grid-cols-12 gap-y-4 border-b border-line py-12 sm:gap-x-8">
            <h3 class="col-span-12 text-h3 font-semibold tracking-tight lg:col-span-4">3. Browser Permissions</h3>
            <div class="col-span-12 max-w-measure text-ink-2 lg:col-span-7">
                <p class="mb-4">
                    FinGrab declares the following permissions. This list is generated from the
                    manifest of the package published in the store, so it cannot drift away from
                    what you actually grant on install.
                </p>
                <ul class="border-t border-ink">
                    <li v-for="permission in permissions" :key="permission.name"
                        class="flex flex-col gap-1 border-b border-line py-4">
                        <span data-permission
                            class="font-mono text-sm break-all text-ink">{{ permission.name }}</span>
                        <span>{{ permission.purpose }}</span>
                    </li>
                </ul>
                <p class="mt-4">
                    The extension runs only on Yahoo Finance pages. It is not active on any other site.
                </p>
            </div>
        </section>

        <section class="grid grid-cols-12 gap-y-4 border-b border-line py-12 sm:gap-x-8">
            <h3 class="col-span-12 text-h3 font-semibold tracking-tight lg:col-span-4">4. Third-Party Services</h3>
            <div class="col-span-12 max-w-measure text-ink-2 lg:col-span-7">
                <p class="mb-6">
                    FinGrab interacts with two external services. Their own privacy policies govern
                    how they handle data.
                </p>

                <div class="border-t border-ink">
                    <div class="border-b border-line py-4">
                        <h4 class="mb-1 font-semibold text-ink">Yahoo Finance API</h4>
                        <p class="text-ink-2">
                            OHLCV data is fetched directly from
                            <span class="font-mono text-sm text-ink">query1.finance.yahoo.com</span>
                            (with <span class="font-mono text-sm text-ink">query2.finance.yahoo.com</span> as
                            fallback). These are public API endpoints. Your request will carry standard
                            browser metadata (IP address, User-Agent) as governed by
                            Yahoo's privacy policy at
                            <a href="https://legal.yahoo.com/us/en/yahoo/privacy/index.html"
                                class="fg-link break-all"
                                target="_blank" rel="noopener noreferrer">
                                legal.yahoo.com/us/en/yahoo/privacy
                            </a>.
                        </p>
                    </div>

                    <div class="border-b border-line py-4">
                        <h4 class="mb-1 font-semibold text-ink">ExtPay (Payment Processing)</h4>
                        <p class="text-ink-2">
                            Payment status for the paid tier is managed by ExtPay
                            (<a href="https://extensionpay.com"
                                class="fg-link"
                                target="_blank" rel="noopener noreferrer">extensionpay.com</a>).
                            FinGrab does not process payments, store payment data, or have access to
                            your billing details. Any personal data you provide during checkout is
                            handled solely by ExtPay under their privacy policy at
                            <a href="https://extensionpay.com/privacy"
                                class="fg-link"
                                target="_blank" rel="noopener noreferrer">
                                extensionpay.com/privacy
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="grid grid-cols-12 gap-y-4 border-b border-line py-12 sm:gap-x-8">
            <h3 class="col-span-12 text-h3 font-semibold tracking-tight lg:col-span-4">5. Analytics and Tracking</h3>
            <div class="col-span-12 max-w-measure text-ink-2 lg:col-span-7">
                <p>
                    FinGrab contains no analytics, crash reporting, advertising SDKs, or any other
                    tracking mechanism. No usage data is collected in any form.
                </p>
            </div>
        </section>

        <section class="grid grid-cols-12 gap-y-4 border-b border-line py-12 sm:gap-x-8">
            <h3 class="col-span-12 text-h3 font-semibold tracking-tight lg:col-span-4">6. Data Retention</h3>
            <div class="col-span-12 max-w-measure text-ink-2 lg:col-span-7">
                <p>
                    Because FinGrab collects no personal data, there is nothing to retain or delete on
                    our side. Exported CSV files are saved to your local device and remain fully under
                    your control.
                </p>
            </div>
        </section>

        <section class="grid grid-cols-12 gap-y-4 border-b border-line py-12 sm:gap-x-8">
            <h3 class="col-span-12 text-h3 font-semibold tracking-tight lg:col-span-4">7. Your Rights (GDPR)</h3>
            <div class="col-span-12 max-w-measure text-ink-2 lg:col-span-7">
                <p class="mb-4">
                    If you are located in the European Economic Area, you have rights under the General
                    Data Protection Regulation (GDPR) including access, rectification, erasure,
                    restriction, portability, and the right to object. Because FinGrab processes no
                    personal data, these rights have no practical application to FinGrab's own
                    operations.
                </p>
                <p>
                    For data processed by Yahoo Finance or ExtPay, please contact those services
                    directly via their respective privacy policies linked in Section 4.
                </p>
            </div>
        </section>

        <section class="grid grid-cols-12 gap-y-4 border-b border-line py-12 sm:gap-x-8">
            <h3 class="col-span-12 text-h3 font-semibold tracking-tight lg:col-span-4">8. Children's Privacy</h3>
            <div class="col-span-12 max-w-measure text-ink-2 lg:col-span-7">
                <p>
                    FinGrab is not directed at children under 13 (or under 16 in the EEA). No
                    information is knowingly collected from children.
                </p>
            </div>
        </section>

        <section class="grid grid-cols-12 gap-y-4 border-b border-line py-12 sm:gap-x-8">
            <h3 class="col-span-12 text-h3 font-semibold tracking-tight lg:col-span-4">9. Changes to This Policy</h3>
            <div class="col-span-12 max-w-measure text-ink-2 lg:col-span-7">
                <p>
                    If this policy changes materially, the updated version will be published here with
                    a revised "Last updated" date. Continued use of the extension after a change
                    constitutes acceptance of the revised policy.
                </p>
            </div>
        </section>

        <section class="grid grid-cols-12 gap-y-4 border-b border-line py-12 sm:gap-x-8">
            <h3 class="col-span-12 text-h3 font-semibold tracking-tight lg:col-span-4">10. Contact</h3>
            <div class="col-span-12 max-w-measure text-ink-2 lg:col-span-7">
                <p>
                    Questions or concerns about this privacy policy can be sent to
                    <a href="mailto:jens.laufer@solytics.de"
                        class="fg-link">
                        jens.laufer@solytics.de
                    </a>.
                </p>
            </div>
        </section>
    </main>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { EXTENSION_PERMISSIONS as permissions } from '../config.js'

useHead({
    title: 'FinGrab – Privacy Policy',
})
</script>
