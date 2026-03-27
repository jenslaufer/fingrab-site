<template>
    <h2>Can you download stock data from Google Finance?</h2>
    <p>
        Google Finance shows stock quotes, charts, and basic financials — but it does not offer a direct
        CSV or Excel download. Unlike Yahoo Finance, there is no "Download" button on any Google Finance page.
        If you want the data in a spreadsheet, you need a workaround.
    </p>
    <p>
        This guide covers every method available to get stock data out of Google Finance, from built-in
        Google Sheets functions to browser extensions that export data from financial sites.
    </p>

    <h2>Method 1: GOOGLEFINANCE() function in Google Sheets</h2>
    <p>
        Google Sheets has a built-in <code>GOOGLEFINANCE()</code> function that pulls live and historical
        stock data directly into your spreadsheet.
    </p>
    <h3>Basic syntax</h3>
    <pre><code>=GOOGLEFINANCE("AAPL", "price")
=GOOGLEFINANCE("MSFT", "close", "2024-01-01", "2024-12-31", "DAILY")</code></pre>
    <h3>Available attributes</h3>
    <ul>
        <li><strong>price</strong> — real-time or delayed quote</li>
        <li><strong>open, high, low, close, volume</strong> — historical OHLCV data</li>
        <li><strong>marketcap</strong> — current market capitalization</li>
        <li><strong>pe</strong> — price-to-earnings ratio</li>
        <li><strong>eps</strong> — earnings per share</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Historical data is limited — typically the last 1-5 years depending on the attribute</li>
        <li>No financial statements (income statement, balance sheet, cash flow)</li>
        <li>No dividend history or earnings calendar</li>
        <li>Data can be delayed up to 20 minutes</li>
        <li>Rate limits on how many <code>GOOGLEFINANCE()</code> calls a single sheet can make</li>
        <li>Attributes sometimes stop working without notice — the function is undocumented</li>
    </ul>

    <h2>Method 2: Copy and paste from Google Finance</h2>
    <p>
        You can manually select data from Google Finance pages and paste it into a spreadsheet. This works
        for small amounts of data — a few data points for one or two stocks.
    </p>
    <h3>Limitations</h3>
    <ul>
        <li>Extremely slow for more than a handful of stocks</li>
        <li>Formatting breaks on paste — numbers may import as text</li>
        <li>No historical price tables to copy (Google Finance only shows charts)</li>
        <li>Error-prone — easy to miss a column or misalign rows</li>
    </ul>

    <h2>Method 3: Google Finance API (deprecated)</h2>
    <p>
        Google once offered a Finance API, but it was shut down in 2012. There is no official Google Finance
        API available today. Any third-party library claiming to access it is either scraping the website
        (fragile and against ToS) or using a different data source entirely.
    </p>
    <p>
        If you need a programmatic approach, consider the
        <router-link to="/blog/yahoo-finance-api-alternatives">Yahoo Finance API alternatives</router-link>
        instead.
    </p>

    <h2>Method 4: Use Yahoo Finance with a browser extension</h2>
    <p>
        Google Finance is great for quick lookups, but when you need downloadable data, Yahoo Finance
        offers far more. Yahoo Finance has dedicated pages for historical prices, financial statements,
        key statistics, and dividends — all exportable.
    </p>
    <p>
        <router-link to="/">FinGrab</router-link> is a Chrome extension that adds one-click CSV export
        to Yahoo Finance. Instead of fighting with Google Finance's limitations, you switch to Yahoo Finance
        and export everything you need.
    </p>
    <h3>What FinGrab exports from Yahoo Finance</h3>
    <ul>
        <li><strong>Historical prices</strong> — full OHLCV data for any date range</li>
        <li><strong>Financial statements</strong> — income statements, balance sheets, cash flow statements</li>
        <li><strong>Key statistics</strong> — valuation ratios, profitability metrics, growth rates</li>
        <li><strong>Dividend history</strong> — payment dates and amounts</li>
    </ul>
    <h3>How it works</h3>
    <ol>
        <li>Install FinGrab from the <a :href="ctaUrl" target="_blank" rel="noopener">Chrome Web Store</a></li>
        <li>Open any stock on finance.yahoo.com</li>
        <li>Click the FinGrab icon in Chrome's side panel</li>
        <li>Select data type and date range</li>
        <li>Click export — CSV downloads instantly</li>
    </ol>

    <h2>Comparison: Google Finance vs. Yahoo Finance for data export</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Google Finance</th>
                    <th>Yahoo Finance + FinGrab</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Direct CSV download</td>
                    <td>No</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td>Historical OHLCV</td>
                    <td>Via Sheets function only</td>
                    <td>Full history, one click</td>
                </tr>
                <tr>
                    <td>Financial statements</td>
                    <td>Not available</td>
                    <td>Income, balance sheet, cash flow</td>
                </tr>
                <tr>
                    <td>Key statistics</td>
                    <td>Limited</td>
                    <td>Full export</td>
                </tr>
                <tr>
                    <td>Bulk export</td>
                    <td>No</td>
                    <td>Multiple tickers supported</td>
                </tr>
                <tr>
                    <td>Coding required</td>
                    <td>Sheets formulas</td>
                    <td>No</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2>When to use each approach</h2>
    <h3>Use GOOGLEFINANCE() when</h3>
    <ul>
        <li>You need live prices updating in a Google Sheet</li>
        <li>You only need basic price data for a few stocks</li>
        <li>You are already working in Google Sheets and want inline data</li>
    </ul>
    <h3>Use Yahoo Finance + FinGrab when</h3>
    <ul>
        <li>You need financial statements, not just prices</li>
        <li>You want clean CSV files for analysis in Excel, R, or Python</li>
        <li>You need data for multiple stocks quickly</li>
        <li>You want
            <router-link to="/blog/historical-stock-price-data">historical stock price data</router-link>
            going back further than Google Finance supports</li>
    </ul>

    <h2>Get started</h2>
    <p>
        Google Finance is useful for quick quotes, but it was never built for data export. If you need
        downloadable stock data — prices, financials, dividends — the fastest path is Yahoo Finance
        with <a :href="ctaUrl" target="_blank" rel="noopener">FinGrab</a>. Install it and export your
        first dataset in under two minutes.
    </p>

    <RelatedArticles :slugs="['export-yahoo-finance-csv', 'excel-stock-analysis', 'yahoo-finance-api-alternatives']" />
</template>

<script setup>
import RelatedArticles from '../RelatedArticles.vue'

const ctaUrl = 'https://chromewebstore.google.com/detail/fingrab'
</script>
