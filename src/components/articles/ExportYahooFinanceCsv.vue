<template>
    <h2>Why export Yahoo Finance data as CSV?</h2>
    <p>
        Yahoo Finance is one of the most popular sources for stock market data. Whether you need historical prices,
        financial statements, or dividend records, the data is there — but getting it into a usable format like CSV
        is not always straightforward.
    </p>
    <p>
        A CSV file lets you work with the data in Excel, Google Sheets, R, Python, or any analysis tool you prefer.
        No vendor lock-in, no proprietary format. Just clean, structured data.
    </p>

    <h2>Method 1: Manual download from Yahoo Finance</h2>
    <p>
        Yahoo Finance offers a built-in download button on the Historical Data tab for any stock. Navigate to a
        stock page, click "Historical Data", set your date range, and click "Download".
    </p>
    <h3>Limitations</h3>
    <ul>
        <li>Only historical price data (OHLCV) — no financial statements or key statistics</li>
        <li>One ticker at a time</li>
        <li>Date range picker can be finicky</li>
        <li>No dividend or earnings data in the download</li>
    </ul>

    <h2>Method 2: Yahoo Finance API (Python)</h2>
    <p>
        Libraries like <code>yfinance</code> access Yahoo Finance data programmatically. You write a Python script,
        call the API, and save the result as CSV.
    </p>
    <pre><code>import yfinance as yf
data = yf.download("AAPL", start="2024-01-01")
data.to_csv("aapl.csv")</code></pre>
    <h3>Limitations</h3>
    <ul>
        <li>Requires Python installed and basic coding knowledge</li>
        <li>API can break without notice (unofficial, undocumented)</li>
        <li>Rate limiting on frequent requests</li>
        <li>Not practical for quick, one-off exports</li>
    </ul>

    <h2>Method 3: Browser extension (FinGrab)</h2>
    <p>
        <router-link to="/">FinGrab</router-link> is a Chrome extension that adds a one-click CSV export directly
        on Yahoo Finance pages. Open any stock page, click the extension icon, and download.
    </p>
    <h3>What you can export</h3>
    <ul>
        <li><strong>OHLCV data</strong> — historical prices for any date range</li>
        <li><strong>Financial statements</strong> — income statements, balance sheets, cash flow</li>
        <li><strong>Key statistics</strong> — valuation ratios, fundamentals</li>
        <li><strong>Dividend history</strong> — payment records with ex-dates</li>
    </ul>
    <h3>How it works</h3>
    <ol>
        <li>Install FinGrab from the <a :href="ctaUrl" target="_blank" rel="noopener">Chrome Web Store</a></li>
        <li>Open any stock page on finance.yahoo.com</li>
        <li>Click the FinGrab icon in Chrome's side panel</li>
        <li>Select the data type and date range</li>
        <li>Click export — CSV downloads instantly</li>
    </ol>
    <p>
        No coding, no API keys, no Python setup. The data goes straight from Yahoo Finance to your local CSV file.
        All processing happens in your browser.
    </p>

    <h2>Comparison</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Data types</th>
                    <th>Coding required</th>
                    <th>Speed</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Manual download</td>
                    <td>OHLCV only</td>
                    <td>No</td>
                    <td>Slow</td>
                </tr>
                <tr>
                    <td>Python (yfinance)</td>
                    <td>All types</td>
                    <td>Yes</td>
                    <td>Medium</td>
                </tr>
                <tr>
                    <td>FinGrab extension</td>
                    <td>All types</td>
                    <td>No</td>
                    <td>Fast</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2>Get started</h2>
    <p>
        If you need Yahoo Finance data in CSV, the fastest path is a browser extension.
        <a :href="ctaUrl" target="_blank" rel="noopener">Install FinGrab</a> and export your first dataset in
        under two minutes.
    </p>

    <RelatedArticles :slugs="['historical-stock-price-data', 'excel-stock-analysis']" />
</template>

<script setup>
import RelatedArticles from '../RelatedArticles.vue'

const ctaUrl = 'https://chromewebstore.google.com/detail/fingrab'
</script>
