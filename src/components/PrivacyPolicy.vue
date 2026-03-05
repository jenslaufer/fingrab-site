<template>
    <div class="min-h-screen bg-linear-to-b bg-brand2 text-slate-100 px-4 py-16">
        <div class="max-w-2xl mx-auto">

            <div
                class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full border border-white/10 bg-white/5 backdrop-blur">
                <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span>Last updated: March 5, 2026</span>
            </div>

            <h1 class="text-sm tracking-[0.25em] uppercase text-slate-400 mb-2">
                <router-link to="/" class="hover:text-slate-200">FinGrab</router-link>
            </h1>
            <h2 class="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">Privacy Policy</h2>
            <p class="text-slate-300 leading-relaxed mb-12">
                FinGrab is a Chrome extension that exports historical OHLCV data from Yahoo Finance as CSV.
                This policy explains what data is handled, by whom, and your rights under applicable law
                including the GDPR.
            </p>

            <div class="space-y-10">

                <section>
                    <h3 class="text-lg font-semibold mb-3">1. No Personal Data Collected</h3>
                    <p class="text-slate-300 leading-relaxed">
                        FinGrab does not collect, store, transmit, or process any personal data on any
                        server operated by FinGrab. The extension requires no account, no registration,
                        and no login. No cookies are set by the extension.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-semibold mb-3">2. Local Processing Only</h3>
                    <p class="text-slate-300 leading-relaxed">
                        All data processing happens entirely within your browser. When you trigger an
                        export, the extension fetches publicly available OHLCV data directly from Yahoo
                        Finance and writes it to a CSV file on your device. No data passes through any
                        FinGrab-controlled server at any point.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-semibold mb-3">3. Chrome Permissions</h3>
                    <p class="text-slate-300 leading-relaxed mb-3">
                        FinGrab uses the following Chrome permissions:
                    </p>
                    <ul class="space-y-2 text-slate-300">
                        <li class="flex gap-3">
                            <span class="text-emerald-400 font-mono text-sm mt-0.5 shrink-0">sidePanel</span>
                            <span>Opens the extension interface in Chrome's side panel. No data is read or transmitted.</span>
                        </li>
                        <li class="flex gap-3">
                            <span class="text-emerald-400 font-mono text-sm mt-0.5 shrink-0">storage</span>
                            <span>Stores payment status and export count locally in the browser. No data is transmitted externally.</span>
                        </li>
                    </ul>
                    <p class="text-slate-300 leading-relaxed mt-3">
                        The extension declares host permissions for
                        <span class="font-mono text-sm text-slate-200">finance.yahoo.com</span>,
                        <span class="font-mono text-sm text-slate-200">query1.finance.yahoo.com</span>, and
                        <span class="font-mono text-sm text-slate-200">query2.finance.yahoo.com</span>
                        to inject the overlay UI and fetch OHLCV data. A content script runs only on
                        <span class="font-mono text-sm text-slate-200">finance.yahoo.com/quote/*</span> pages.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-semibold mb-3">4. Third-Party Services</h3>
                    <p class="text-slate-300 leading-relaxed mb-4">
                        FinGrab interacts with two external services. Their own privacy policies govern
                        how they handle data.
                    </p>

                    <div class="space-y-5">
                        <div class="rounded-xl border border-white/10 bg-white/5 p-5">
                            <h4 class="font-semibold mb-1">Yahoo Finance API</h4>
                            <p class="text-slate-300 text-sm leading-relaxed">
                                OHLCV data is fetched directly from
                                <span class="font-mono text-xs text-slate-200">query1.finance.yahoo.com</span>
                                (with <span class="font-mono text-xs text-slate-200">query2.finance.yahoo.com</span> as
                                fallback). These are public API endpoints. Your request will carry standard
                                browser metadata (IP address, User-Agent) as governed by
                                Yahoo's privacy policy at
                                <a href="https://legal.yahoo.com/us/en/yahoo/privacy/index.html"
                                    class="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 break-all"
                                    target="_blank" rel="noopener noreferrer">
                                    legal.yahoo.com/us/en/yahoo/privacy
                                </a>.
                            </p>
                        </div>

                        <div class="rounded-xl border border-white/10 bg-white/5 p-5">
                            <h4 class="font-semibold mb-1">ExtPay (Payment Processing)</h4>
                            <p class="text-slate-300 text-sm leading-relaxed">
                                Payment status for the paid tier is managed by ExtPay
                                (<a href="https://extensionpay.com"
                                    class="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                                    target="_blank" rel="noopener noreferrer">extensionpay.com</a>).
                                FinGrab does not process payments, store payment data, or have access to
                                your billing details. Any personal data you provide during checkout is
                                handled solely by ExtPay under their privacy policy at
                                <a href="https://extensionpay.com/privacy"
                                    class="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                                    target="_blank" rel="noopener noreferrer">
                                    extensionpay.com/privacy
                                </a>.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 class="text-lg font-semibold mb-3">5. Analytics and Tracking</h3>
                    <p class="text-slate-300 leading-relaxed">
                        FinGrab contains no analytics, crash reporting, advertising SDKs, or any other
                        tracking mechanism. No usage data is collected in any form.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-semibold mb-3">6. Data Retention</h3>
                    <p class="text-slate-300 leading-relaxed">
                        Because FinGrab collects no personal data, there is nothing to retain or delete on
                        our side. Exported CSV files are saved to your local device and remain fully under
                        your control.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-semibold mb-3">7. Your Rights (GDPR)</h3>
                    <p class="text-slate-300 leading-relaxed mb-3">
                        If you are located in the European Economic Area, you have rights under the General
                        Data Protection Regulation (GDPR) including access, rectification, erasure,
                        restriction, portability, and the right to object. Because FinGrab processes no
                        personal data, these rights have no practical application to FinGrab's own
                        operations.
                    </p>
                    <p class="text-slate-300 leading-relaxed">
                        For data processed by Yahoo Finance or ExtPay, please contact those services
                        directly via their respective privacy policies linked in Section 4.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-semibold mb-3">8. Children's Privacy</h3>
                    <p class="text-slate-300 leading-relaxed">
                        FinGrab is not directed at children under 13 (or under 16 in the EEA). No
                        information is knowingly collected from children.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-semibold mb-3">9. Changes to This Policy</h3>
                    <p class="text-slate-300 leading-relaxed">
                        If this policy changes materially, the updated version will be published here with
                        a revised "Last updated" date. Continued use of the extension after a change
                        constitutes acceptance of the revised policy.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-semibold mb-3">10. Contact</h3>
                    <p class="text-slate-300 leading-relaxed">
                        Questions or concerns about this privacy policy can be sent to
                        <a href="mailto:jens.laufer@solytics.de"
                            class="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                            jens.laufer@solytics.de
                        </a>.
                    </p>
                </section>

            </div>
        </div>
    </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'

useHead({
    title: 'FinGrab – Privacy Policy',
})
</script>
