<template>
    <h2>Why Excel for stock analysis?</h2>
    <p>
        Excel remains the most popular tool for financial analysis. It's flexible, familiar, and powerful enough
        for everything from simple price charts to complex valuation models. The challenge is getting the data in.
    </p>
    <p>
        Most financial data providers require API keys, coding skills, or paid subscriptions. But if you use
        Yahoo Finance, there's a simpler way.
    </p>

    <h2>What data do you need?</h2>
    <p>
        A solid stock analysis in Excel typically requires:
    </p>
    <ul>
        <li><strong>Historical prices (OHLCV)</strong> — for charts, moving averages, and volatility calculations</li>
        <li><strong>Financial statements</strong> — income statements, balance sheets, and cash flow for fundamental analysis</li>
        <li><strong>Key ratios</strong> — P/E, P/B, debt-to-equity, ROE, and other valuation metrics</li>
        <li><strong>Dividend history</strong> — for dividend yield calculations and income projections</li>
    </ul>

    <h2>How to get financial data into Excel</h2>

    <h3>Option 1: Excel's built-in stock data type</h3>
    <p>
        Microsoft 365 includes a "Stocks" data type that pulls live data into cells. Type a ticker, convert it to
        a stock data type, and access fields like price, market cap, and P/E ratio.
    </p>
    <ul>
        <li><strong>Pros:</strong> Built into Excel, no setup required</li>
        <li><strong>Cons:</strong> Limited to current/recent data, no historical OHLCV, no financial statements, requires Microsoft 365</li>
    </ul>

    <h3>Option 2: Power Query with web data</h3>
    <p>
        Excel's Power Query can import data from web pages. You point it at a URL and it tries to parse tables
        from the HTML.
    </p>
    <ul>
        <li><strong>Pros:</strong> No coding in the traditional sense</li>
        <li><strong>Cons:</strong> Breaks when websites change layout, slow, unreliable for dynamic pages like Yahoo Finance</li>
    </ul>

    <h3>Option 3: CSV import from a browser extension</h3>
    <p>
        Export data as CSV from Yahoo Finance using a browser extension, then open it in Excel. This gives you
        clean, structured data with no formatting issues.
    </p>
    <p>
        <router-link to="/">FinGrab</router-link> exports all four data types listed above — OHLCV, financial
        statements, key statistics, and dividends — as CSV files ready for Excel.
    </p>

    <h2>Practical example: Building a stock dashboard</h2>
    <p>Here's a workflow for analyzing a stock in Excel using CSV data:</p>
    <ol>
        <li>
            <strong>Export OHLCV data</strong> — Open the stock on Yahoo Finance, use
            <a :href="ctaUrl" target="_blank" rel="noopener">FinGrab</a> to download historical prices as CSV
        </li>
        <li>
            <strong>Import into Excel</strong> — Open the CSV file in Excel (File → Open or drag and drop)
        </li>
        <li>
            <strong>Create a price chart</strong> — Select the Date and Close columns, insert a line chart
        </li>
        <li>
            <strong>Add moving averages</strong> — Use <code>=AVERAGE()</code> over 50-day and 200-day windows
        </li>
        <li>
            <strong>Calculate daily returns</strong> — <code>=(B3-B2)/B2</code> for percentage change
        </li>
        <li>
            <strong>Add financial data</strong> — Export financial statements with FinGrab and link key
            metrics in a summary sheet
        </li>
    </ol>

    <h2>Tips for Excel stock analysis</h2>
    <ul>
        <li>Use named ranges for date and price columns — formulas stay readable</li>
        <li>Keep raw data on a separate sheet — never modify the source data</li>
        <li>Use conditional formatting to highlight significant price moves</li>
        <li>Create a dashboard sheet that pulls from your data sheets using <code>VLOOKUP</code> or <code>INDEX/MATCH</code></li>
    </ul>

    <h2>Get started</h2>
    <p>
        Ready to build your stock analysis in Excel?
        <a :href="ctaUrl" target="_blank" rel="noopener">Install FinGrab</a> from the Chrome Web Store, export
        your data as CSV, and have a working spreadsheet in minutes — no coding required.
    </p>

    <RelatedArticles :slugs="['export-yahoo-finance-csv', 'historical-stock-price-data']" />
</template>

<script setup>
import RelatedArticles from '../RelatedArticles.vue'

const ctaUrl = 'https://chromewebstore.google.com/detail/fingrab'
</script>
