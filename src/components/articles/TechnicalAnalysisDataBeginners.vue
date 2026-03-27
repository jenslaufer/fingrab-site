<template>
    <h2>What data do you need for technical analysis?</h2>
    <p>
        Technical analysis studies price and volume patterns to forecast future stock movements. Before you
        draw a single trendline or calculate an indicator, you need the right data in the right format.
    </p>
    <p>
        The foundation of all technical analysis is <strong>OHLCV data</strong> — Open, High, Low, Close, and Volume.
        Every candlestick chart, every moving average, and every momentum indicator is calculated from
        these five numbers.
    </p>

    <h2>Understanding OHLCV data</h2>
    <ul>
        <li><strong>Open</strong> — the price at the start of the trading period</li>
        <li><strong>High</strong> — the highest price during the period</li>
        <li><strong>Low</strong> — the lowest price during the period</li>
        <li><strong>Close</strong> — the price at the end of the period (most important for indicators)</li>
        <li><strong>Volume</strong> — the number of shares traded during the period</li>
    </ul>
    <p>
        Each row represents one time period — a day, an hour, a week, or a minute, depending on your
        timeframe. Daily data is the most common starting point for beginners.
    </p>

    <h2>Timeframes: which one should you use?</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Timeframe</th>
                    <th>Best for</th>
                    <th>Data points per year</th>
                    <th>Typical data source</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Daily</td>
                    <td>Swing trading, position trading</td>
                    <td>~252</td>
                    <td>Yahoo Finance, most free sources</td>
                </tr>
                <tr>
                    <td>Weekly</td>
                    <td>Long-term trend analysis</td>
                    <td>~52</td>
                    <td>Yahoo Finance, most free sources</td>
                </tr>
                <tr>
                    <td>Intraday (1m, 5m, 15m)</td>
                    <td>Day trading</td>
                    <td>Thousands</td>
                    <td>Broker platforms, paid APIs</td>
                </tr>
                <tr>
                    <td>Monthly</td>
                    <td>Macro trend analysis</td>
                    <td>12</td>
                    <td>Yahoo Finance, most free sources</td>
                </tr>
            </tbody>
        </table>
    </div>
    <p>
        Start with daily data. It is the most widely available, easiest to analyze, and supported by every
        charting tool. Move to shorter timeframes only when your strategy requires it.
    </p>

    <h2>Where to get free data for technical analysis</h2>

    <h3>Yahoo Finance</h3>
    <p>
        The most popular free source for historical stock data. Yahoo Finance provides daily, weekly, and
        monthly OHLCV data going back decades for most US stocks. You can download data manually from the
        Historical Data tab, or use a tool like
        <router-link to="/">FinGrab</router-link> to
        <router-link to="/blog/export-yahoo-finance-csv">export it as CSV</router-link> with one click.
    </p>

    <h3>TradingView</h3>
    <p>
        Excellent for charting and visual analysis. TradingView calculates indicators in-browser, so you
        do not need to download data separately. However, exporting raw data from TradingView requires
        a paid plan.
    </p>

    <h3>Alpha Vantage</h3>
    <p>
        A free API that returns OHLCV data in JSON or CSV format. Requires an API key and basic
        programming knowledge. Good if you want to automate data retrieval with Python or R. Read more
        about <router-link to="/blog/yahoo-finance-api-alternatives">free API alternatives</router-link>.
    </p>

    <h3>Google Sheets</h3>
    <p>
        The <code>GOOGLEFINANCE()</code> function pulls basic price data into your spreadsheet. Works well
        for quick lookups but lacks the depth needed for serious technical analysis — no adjusted close,
        limited history, and unreliable for some attributes.
    </p>

    <h2>Data quality: what beginners often get wrong</h2>

    <h3>Adjusted vs. unadjusted close</h3>
    <p>
        Stock splits and dividends change the raw price. If a stock splits 2:1, the price drops by half
        overnight — but your analysis should not show that as a crash. The <strong>adjusted close</strong>
        accounts for splits and dividends, giving you a continuous price series.
    </p>
    <p>
        Always use adjusted close for calculating returns, moving averages, and indicators. Most free
        data sources including Yahoo Finance provide both raw and adjusted close.
    </p>

    <h3>Missing data and gaps</h3>
    <p>
        Stocks do not trade on weekends or holidays. Your data will have gaps. Most analysis tools handle
        this automatically, but if you are building your own calculations in Excel, make sure your formulas
        account for non-trading days.
    </p>

    <h3>Survivorship bias</h3>
    <p>
        Free data sources usually only include stocks that are currently listed. Companies that went
        bankrupt or were delisted disappear from the data. Keep this in mind when backtesting strategies
        on historical data.
    </p>

    <h2>Getting data into your analysis tool</h2>

    <h3>Excel or Google Sheets</h3>
    <p>
        The most accessible option for beginners. Import a CSV file, and you can immediately calculate
        moving averages, RSI, MACD, and other indicators using formulas. See our guide on
        <router-link to="/blog/excel-stock-analysis">stock analysis in Excel</router-link> for step-by-step
        instructions.
    </p>

    <h3>Python (pandas + ta-lib)</h3>
    <pre><code>import pandas as pd
df = pd.read_csv("aapl.csv", parse_dates=["Date"], index_col="Date")
df["SMA_50"] = df["Close"].rolling(50).mean()
df["SMA_200"] = df["Close"].rolling(200).mean()</code></pre>
    <p>
        Python gives you the most flexibility. Libraries like <code>pandas</code> for data manipulation
        and <code>ta-lib</code> or <code>pandas-ta</code> for indicator calculation make it straightforward
        to build custom analysis workflows.
    </p>

    <h3>TradingView (no download needed)</h3>
    <p>
        If you only need visual chart analysis with built-in indicators, TradingView handles everything
        in the browser. No data download required — but you cannot customize calculations beyond what
        the platform offers.
    </p>

    <h2>A practical workflow for beginners</h2>
    <ol>
        <li><strong>Pick your stocks</strong> — use a
            <router-link to="/blog/best-free-stock-screeners">free stock screener</router-link>
            to find candidates</li>
        <li><strong>Export the data</strong> — install
            <a :href="ctaUrl" target="_blank" rel="noopener">FinGrab</a>, open each stock on Yahoo Finance,
            and export OHLCV data as CSV</li>
        <li><strong>Import into your tool</strong> — open the CSV in Excel, Google Sheets, or Python</li>
        <li><strong>Calculate indicators</strong> — start with simple moving averages (SMA 50 and SMA 200)
            before moving to more advanced indicators</li>
        <li><strong>Visualize</strong> — chart the price with your indicators overlaid to spot patterns</li>
    </ol>

    <h2>Common beginner indicators and what data they need</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Indicator</th>
                    <th>Input data</th>
                    <th>What it shows</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Simple Moving Average (SMA)</td>
                    <td>Close price</td>
                    <td>Trend direction</td>
                </tr>
                <tr>
                    <td>RSI (Relative Strength Index)</td>
                    <td>Close price</td>
                    <td>Overbought / oversold</td>
                </tr>
                <tr>
                    <td>MACD</td>
                    <td>Close price</td>
                    <td>Momentum and trend changes</td>
                </tr>
                <tr>
                    <td>Bollinger Bands</td>
                    <td>Close price</td>
                    <td>Volatility and price extremes</td>
                </tr>
                <tr>
                    <td>On-Balance Volume (OBV)</td>
                    <td>Close price + Volume</td>
                    <td>Buying / selling pressure</td>
                </tr>
                <tr>
                    <td>VWAP</td>
                    <td>High, Low, Close, Volume</td>
                    <td>Intraday fair value</td>
                </tr>
            </tbody>
        </table>
    </div>
    <p>
        Notice that most indicators only need the close price. This means daily OHLCV data from a free
        source like Yahoo Finance covers the vast majority of beginner technical analysis.
    </p>

    <h2>Get started</h2>
    <p>
        Good technical analysis starts with good data. Grab clean OHLCV data from Yahoo Finance using
        <a :href="ctaUrl" target="_blank" rel="noopener">FinGrab</a>, import it into your tool of choice,
        and start calculating your first indicators. No API keys, no coding, no data cleaning headaches.
    </p>

    <RelatedArticles :slugs="['historical-stock-price-data', 'export-yahoo-finance-csv', 'best-free-stock-screeners']" />
</template>

<script setup>
import RelatedArticles from '../RelatedArticles.vue'

const ctaUrl = 'https://chromewebstore.google.com/detail/fingrab'
</script>
