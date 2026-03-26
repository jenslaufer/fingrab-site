<template>
    <h2>What is OHLCV data?</h2>
    <p>
        OHLCV stands for Open, High, Low, Close, and Volume. These five data points capture the complete price action
        of a stock, ETF, or index for each trading day. OHLCV data is the foundation for technical analysis,
        backtesting trading strategies, and building financial models.
    </p>

    <h2>Free sources for historical stock price data</h2>

    <h3>1. Yahoo Finance</h3>
    <p>
        The most widely used free source. Yahoo Finance covers stocks, ETFs, indices, currencies, and crypto.
        Data goes back decades for most US equities.
    </p>
    <ul>
        <li><strong>Pros:</strong> Broad coverage, long history, free, no registration required</li>
        <li><strong>Cons:</strong> No official API, manual downloads limited to OHLCV, occasional data gaps</li>
    </ul>

    <h3>2. Alpha Vantage</h3>
    <p>
        Provides a free API with daily, weekly, and monthly stock data. Requires a free API key and basic coding
        knowledge to access.
    </p>
    <ul>
        <li><strong>Pros:</strong> Official API, JSON and CSV output, adjusted prices</li>
        <li><strong>Cons:</strong> 25 requests/day on free tier, limited historical depth for some endpoints</li>
    </ul>

    <h3>3. FRED (Federal Reserve Economic Data)</h3>
    <p>
        Great for economic indicators, interest rates, and some market indices. Not a primary source for individual
        stock OHLCV data.
    </p>
    <ul>
        <li><strong>Pros:</strong> Official government data, reliable, free API</li>
        <li><strong>Cons:</strong> Limited to economic data and select indices, no individual stock prices</li>
    </ul>

    <h3>4. Stooq</h3>
    <p>
        Polish financial data provider with surprisingly good global stock coverage. Offers free CSV downloads
        without registration.
    </p>
    <ul>
        <li><strong>Pros:</strong> Free bulk downloads, global coverage, no registration</li>
        <li><strong>Cons:</strong> Interface not English-friendly, inconsistent data formatting</li>
    </ul>

    <h3>5. Tiingo</h3>
    <p>
        Offers a free tier with end-of-day stock prices and a clean REST API.
    </p>
    <ul>
        <li><strong>Pros:</strong> Clean API, good documentation, reliable data</li>
        <li><strong>Cons:</strong> Free tier limited to 500 requests/day, registration required</li>
    </ul>

    <h2>Comparison of free OHLCV data sources</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Source</th>
                    <th>API available</th>
                    <th>Registration</th>
                    <th>Rate limit</th>
                    <th>Best for</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Yahoo Finance</td>
                    <td>Unofficial</td>
                    <td>No</td>
                    <td>Moderate</td>
                    <td>General use</td>
                </tr>
                <tr>
                    <td>Alpha Vantage</td>
                    <td>Yes</td>
                    <td>Yes (free)</td>
                    <td>25/day</td>
                    <td>Developers</td>
                </tr>
                <tr>
                    <td>FRED</td>
                    <td>Yes</td>
                    <td>Yes (free)</td>
                    <td>Generous</td>
                    <td>Economic data</td>
                </tr>
                <tr>
                    <td>Stooq</td>
                    <td>No</td>
                    <td>No</td>
                    <td>None</td>
                    <td>Bulk downloads</td>
                </tr>
                <tr>
                    <td>Tiingo</td>
                    <td>Yes</td>
                    <td>Yes (free)</td>
                    <td>500/day</td>
                    <td>Clean API access</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2>The simplest option for non-programmers</h2>
    <p>
        If you don't write code, most of these sources are hard to use. APIs require programming. Manual downloads
        are tedious and limited.
    </p>
    <p>
        A browser extension like <router-link to="/">FinGrab</router-link> bridges the gap. It lets you export
        OHLCV data directly from Yahoo Finance as CSV — no coding, no API keys, no registration. Just open a
        stock page and click export.
    </p>
    <p>
        Beyond OHLCV, FinGrab also exports financial statements, key statistics, and dividend history — data types
        that most free APIs don't cover at all.
    </p>

    <h2>Get started</h2>
    <p>
        Need historical stock price data in CSV?
        <a :href="ctaUrl" target="_blank" rel="noopener">Install FinGrab</a> from the Chrome Web Store and download
        your first dataset in under two minutes.
    </p>
</template>

<script setup>
const ctaUrl = 'https://chromewebstore.google.com/detail/fingrab'
</script>
