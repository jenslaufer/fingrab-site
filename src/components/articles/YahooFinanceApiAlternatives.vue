<template>
    <h2>Why look for Yahoo Finance API alternatives?</h2>
    <p>
        Yahoo Finance officially discontinued its public API in 2017. What remains is an undocumented,
        unofficial interface that libraries like <code>yfinance</code> reverse-engineer. It works — until it
        doesn't. Endpoints change without notice, rate limits tighten, and responses break unexpectedly.
    </p>
    <p>
        If you build anything that depends on reliable financial data — a portfolio tracker, a screening tool,
        a research dashboard — you need alternatives you can count on. Here are the best free options in 2026.
    </p>

    <h2>1. Alpha Vantage — best free API for stock data</h2>
    <p>
        Alpha Vantage offers a well-documented REST API with free access to stock prices, fundamentals,
        technical indicators, forex, and crypto data.
    </p>
    <h3>What you get for free</h3>
    <ul>
        <li>Daily, weekly, and monthly OHLCV data</li>
        <li>Intraday prices (1min, 5min, 15min, 30min, 60min)</li>
        <li>Company fundamentals (income statement, balance sheet, cash flow)</li>
        <li>50+ technical indicators</li>
        <li>Forex and cryptocurrency data</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Free tier: 25 requests per day (was 500/day, significantly reduced)</li>
        <li>Historical data limited to 20 years</li>
        <li>Fundamental data covers US stocks only in the free tier</li>
        <li>Response format (JSON/CSV) can be inconsistent across endpoints</li>
    </ul>
    <pre><code>// Example: daily prices for AAPL
https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&amp;symbol=AAPL&amp;apikey=YOUR_KEY</code></pre>

    <h2>2. Financial Modeling Prep — best for financial statements</h2>
    <p>
        FMP provides detailed financial data through a clean REST API. It is particularly strong on
        fundamental data — income statements, balance sheets, ratios, and DCF models.
    </p>
    <h3>What you get for free</h3>
    <ul>
        <li>Annual and quarterly financial statements</li>
        <li>Key financial ratios</li>
        <li>Stock price data (end-of-day)</li>
        <li>Company profiles and market cap data</li>
        <li>SEC filings access</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Free tier: 250 requests per day</li>
        <li>Some endpoints restricted to paid plans</li>
        <li>Historical data depth varies by endpoint</li>
    </ul>

    <h2>3. Twelve Data — best for technical analysis</h2>
    <p>
        Twelve Data focuses on time series and technical indicators. If you need moving averages,
        RSI, MACD, or custom indicator calculations via API, this is a strong choice.
    </p>
    <h3>What you get for free</h3>
    <ul>
        <li>End-of-day and intraday price data</li>
        <li>100+ technical indicators</li>
        <li>Forex, crypto, and ETF coverage</li>
        <li>WebSocket streaming (limited)</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Free tier: 800 requests per day, 8 per minute</li>
        <li>Limited fundamental data</li>
        <li>Some global exchanges require paid plans</li>
    </ul>

    <h2>4. Polygon.io — best for US market data</h2>
    <p>
        Polygon offers institutional-grade US market data. The free tier provides delayed data with
        generous rate limits.
    </p>
    <h3>What you get for free</h3>
    <ul>
        <li>End-of-day OHLCV data for US stocks</li>
        <li>Ticker details and reference data</li>
        <li>Stock splits and dividends</li>
        <li>Up to 5 API calls per minute</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Real-time data requires a paid plan</li>
        <li>Free tier limited to delayed data (15 minutes)</li>
        <li>No financial statements or fundamental data</li>
        <li>US markets only</li>
    </ul>

    <h2>5. EODHD — best for global market coverage</h2>
    <p>
        EODHD (End of Day Historical Data) covers 70+ exchanges worldwide. For international stock
        data, it offers broader free coverage than most alternatives.
    </p>
    <h3>What you get for free</h3>
    <ul>
        <li>End-of-day data for 70+ exchanges</li>
        <li>Fundamental data for selected markets</li>
        <li>ETF and mutual fund data</li>
        <li>Historical dividends and splits</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Free tier: 20 requests per day</li>
        <li>Limited to end-of-day data (no intraday)</li>
        <li>Some exchanges require paid access</li>
    </ul>

    <h2>Comparison table</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>API</th>
                    <th>Best for</th>
                    <th>Free daily limit</th>
                    <th>Fundamentals</th>
                    <th>Global coverage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Alpha Vantage</td>
                    <td>General stock data</td>
                    <td>25 requests</td>
                    <td>Yes</td>
                    <td>Limited</td>
                </tr>
                <tr>
                    <td>Financial Modeling Prep</td>
                    <td>Financial statements</td>
                    <td>250 requests</td>
                    <td>Yes</td>
                    <td>Partial</td>
                </tr>
                <tr>
                    <td>Twelve Data</td>
                    <td>Technical indicators</td>
                    <td>800 requests</td>
                    <td>Limited</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td>Polygon.io</td>
                    <td>US market data</td>
                    <td>Unlimited*</td>
                    <td>No</td>
                    <td>US only</td>
                </tr>
                <tr>
                    <td>EODHD</td>
                    <td>Global markets</td>
                    <td>20 requests</td>
                    <td>Partial</td>
                    <td>70+ exchanges</td>
                </tr>
            </tbody>
        </table>
    </div>
    <p><em>* Polygon.io free tier has per-minute limits (5/min) but no strict daily cap.</em></p>

    <h2>6. yfinance (Python library) — unofficial Yahoo Finance access</h2>
    <p>
        The <code>yfinance</code> library remains the most popular way to access Yahoo Finance data
        programmatically. It is not an official API, but it works well for research and personal projects.
    </p>
    <pre><code>import yfinance as yf
stock = yf.Ticker("AAPL")
print(stock.info)           # Company info and key stats
print(stock.financials)     # Income statement
print(stock.balance_sheet)  # Balance sheet
hist = stock.history(period="1y")  # Price history</code></pre>
    <h3>Why it still works</h3>
    <ul>
        <li>Broad data coverage — prices, fundamentals, options, dividends</li>
        <li>No API key required</li>
        <li>Active open-source community maintaining the library</li>
    </ul>
    <h3>Why it is risky for production</h3>
    <ul>
        <li>Breaks when Yahoo changes internal endpoints</li>
        <li>No official support or SLA</li>
        <li>Rate limiting can block requests without warning</li>
        <li>Not suitable for applications serving external users</li>
    </ul>
    <p>
        For personal research, <code>yfinance</code> is practical. For anything more, use one of the official
        APIs above or a browser-based approach.
    </p>

    <h2>The browser-based alternative: no API needed</h2>
    <p>
        All the APIs above require coding — HTTP requests, parsing JSON, handling pagination and errors,
        managing API keys. For many users, this is more complexity than the task warrants.
    </p>
    <p>
        <router-link to="/">FinGrab</router-link> takes a different approach. Instead of calling an API, it
        exports data directly from Yahoo Finance pages in your browser. You see the data on the page, you
        click export, and you get a CSV file.
    </p>
    <h3>When FinGrab makes more sense than an API</h3>
    <ul>
        <li><strong>Ad-hoc research</strong> — you need data for 5-10 stocks, not 5,000</li>
        <li><strong>No coding setup</strong> — no Python, no API keys, no environment configuration</li>
        <li><strong>Financial statements</strong> — income statements, balance sheets, cash flow in one click</li>
        <li><strong>Quick iteration</strong> — browse Yahoo Finance, export what you need, analyze in
            <router-link to="/blog/excel-stock-analysis">Excel</router-link> or
            <router-link to="/blog/stock-portfolio-tracker-google-sheets">Google Sheets</router-link></li>
    </ul>
    <p>
        If you need to
        <router-link to="/blog/export-yahoo-finance-csv">export Yahoo Finance data to CSV</router-link>
        without writing code, FinGrab is the fastest path.
    </p>

    <h2>Choosing the right approach</h2>
    <p>
        The best data source depends on your use case:
    </p>
    <ul>
        <li><strong>Building an automated pipeline</strong> — use an official API (Alpha Vantage, FMP, Twelve Data)</li>
        <li><strong>One-off research or small portfolios</strong> — use FinGrab for browser-based CSV export</li>
        <li><strong>Personal scripts and prototypes</strong> — <code>yfinance</code> works but plan for breakage</li>
        <li><strong>Global market data</strong> — EODHD or Twelve Data for breadth</li>
        <li><strong>Real-time data</strong> — paid plans from Polygon or Twelve Data</li>
    </ul>

    <h2>Get started</h2>
    <p>
        Need financial data now without API setup?
        <a :href="ctaUrl" target="_blank" rel="noopener">Install FinGrab</a> and export stock data from
        Yahoo Finance in seconds. For automated workflows, start with Alpha Vantage or Financial Modeling
        Prep — both offer free tiers with documented APIs.
    </p>
</template>

<script setup>
const ctaUrl = 'https://chromewebstore.google.com/detail/fingrab'
</script>
