<template>
    <h2>Why compare stock performance?</h2>
    <p>
        Comparing stocks side by side reveals which investments outperform, which sectors lead, and
        whether your picks beat a benchmark like the S&amp;P 500. Raw price charts alone are misleading —
        a $300 stock and a $30 stock cannot be compared on the same axis without normalization.
    </p>
    <p>
        This guide covers the methods, formulas, and data you need to compare stocks properly in
        Excel or Google Sheets.
    </p>

    <h2>Step 1: Get comparable data sets</h2>
    <p>
        Accurate comparison requires consistent data. All stocks must cover the same date range,
        use the same time interval (daily, weekly), and use adjusted close prices to account for
        splits and dividends.
    </p>
    <h3>Where to get the data</h3>
    <ul>
        <li><strong>Yahoo Finance manual download</strong> — one stock at a time from the Historical Data tab</li>
        <li><strong>Python (yfinance)</strong> — download multiple tickers programmatically</li>
        <li><strong>FinGrab Chrome extension</strong> — export
            <router-link to="/blog/historical-stock-price-data">historical price data</router-link>
            from Yahoo Finance as CSV with one click, then repeat for each stock</li>
    </ul>
    <p>
        Whichever method you choose, make sure every dataset starts and ends on the same date. Mismatched
        date ranges skew your comparison.
    </p>

    <h2>Step 2: Normalize prices for comparison</h2>
    <p>
        Normalization converts every stock's price to a common starting point — typically 100 or 0%.
        This lets you compare percentage gains regardless of the absolute stock price.
    </p>
    <h3>Method A: Index to 100</h3>
    <p>
        Set the first day's value to 100 for each stock. Every subsequent day shows the relative
        change from that starting point.
    </p>
    <pre><code>Normalized Price = (Current Price / First Price) × 100

Example (AAPL):
Day 1: ($150 / $150) × 100 = 100.0
Day 2: ($153 / $150) × 100 = 102.0  (+2%)
Day 3: ($148 / $150) × 100 = 98.7   (-1.3%)</code></pre>
    <h4>Excel formula</h4>
    <pre><code>=B2 / B$2 * 100</code></pre>
    <p>
        Where B2 is the current close price and B$2 is the first close price (absolute row reference).
        Drag this formula down for each date and across for each stock.
    </p>

    <h3>Method B: Cumulative percentage return</h3>
    <pre><code>Cumulative Return = ((Current Price - First Price) / First Price) × 100

Example:
Day 1: 0%
Day 30: +8.5%
Day 60: +12.3%</code></pre>
    <h4>Excel formula</h4>
    <pre><code>=(B2 - B$2) / B$2 * 100</code></pre>

    <h2>Step 3: Chart the comparison</h2>
    <p>
        Create a line chart with the date on the x-axis and normalized prices (or cumulative returns)
        on the y-axis. Each stock gets its own line. This gives you a clear visual of relative
        performance over time.
    </p>
    <h3>In Excel</h3>
    <ol>
        <li>Select the date column and all normalized price columns</li>
        <li>Insert → Line Chart</li>
        <li>Add a chart title: "Stock Performance Comparison (Indexed to 100)"</li>
        <li>Format each line with a distinct color</li>
    </ol>
    <h3>In Google Sheets</h3>
    <ol>
        <li>Select the same data range</li>
        <li>Insert → Chart → Line chart</li>
        <li>In the Chart Editor, set the date column as the x-axis</li>
    </ol>

    <h2>Advanced comparisons</h2>

    <h3>Relative strength comparison</h3>
    <p>
        Divide one stock's price by another to create a relative strength line. When the line rises,
        the numerator stock is outperforming. When it falls, the denominator stock leads.
    </p>
    <pre><code>=AAPL_Close / MSFT_Close</code></pre>
    <p>
        This is useful for pairs trading or comparing a stock against its sector ETF.
    </p>

    <h3>Risk-adjusted comparison (Sharpe Ratio)</h3>
    <p>
        Raw returns do not account for risk. A stock that gained 20% with wild daily swings is not
        the same as one that gained 20% with steady, consistent growth. The Sharpe Ratio adjusts
        for this.
    </p>
    <pre><code>Sharpe Ratio = (Average Daily Return - Risk-Free Rate) / Standard Deviation of Daily Returns</code></pre>
    <h4>Excel formulas</h4>
    <pre><code>Daily Return:     =(B3-B2)/B2
Average Return:   =AVERAGE(C2:C252)
Std Deviation:    =STDEV(C2:C252)
Sharpe (annual):  =(C254 * 252 - 0.05) / (C255 * SQRT(252))</code></pre>
    <p>
        A higher Sharpe Ratio means better risk-adjusted returns. Compare Sharpe Ratios across stocks
        to find the most efficient performers.
    </p>

    <h3>Drawdown analysis</h3>
    <p>
        Maximum drawdown shows the worst peak-to-trough decline. This tells you how much pain you
        would have endured during the worst period.
    </p>
    <pre><code>Running Max:   =MAX(B$2:B2)
Drawdown:      =(B2 - C2) / C2 * 100</code></pre>
    <p>
        Stocks with smaller maximum drawdowns are less volatile. Comparing drawdowns helps you
        understand the downside risk of each investment.
    </p>

    <h2>Common comparison scenarios</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Scenario</th>
                    <th>What to compare</th>
                    <th>Best metric</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Stock vs. benchmark</td>
                    <td>AAPL vs. SPY</td>
                    <td>Indexed to 100 chart</td>
                </tr>
                <tr>
                    <td>Two competitors</td>
                    <td>AAPL vs. MSFT</td>
                    <td>Relative strength ratio</td>
                </tr>
                <tr>
                    <td>Portfolio candidates</td>
                    <td>5-10 stocks</td>
                    <td>Sharpe Ratio + Max Drawdown</td>
                </tr>
                <tr>
                    <td>Sector rotation</td>
                    <td>XLK vs. XLF vs. XLE</td>
                    <td>Cumulative return chart</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2>A practical comparison workflow</h2>
    <ol>
        <li><strong>Choose your stocks</strong> — pick 2-5 stocks or ETFs you want to compare. Use a
            <router-link to="/blog/best-free-stock-screeners">free stock screener</router-link>
            to narrow candidates</li>
        <li><strong>Export the data</strong> — install
            <a :href="ctaUrl" target="_blank" rel="noopener">FinGrab</a> and export historical
            OHLCV data for each ticker from Yahoo Finance</li>
        <li><strong>Align dates</strong> — open all CSV files, filter to the same start and end date</li>
        <li><strong>Normalize</strong> — add a column for each stock using the index-to-100 formula</li>
        <li><strong>Chart</strong> — create a line chart with all normalized series</li>
        <li><strong>Calculate metrics</strong> — add Sharpe Ratio and max drawdown for each stock</li>
    </ol>
    <p>
        With <router-link to="/">FinGrab</router-link>, the data export step takes seconds per stock.
        The CSV files use a consistent format, so aligning and merging them in
        <router-link to="/blog/excel-stock-analysis">Excel</router-link> is straightforward.
    </p>

    <h2>Tips for better comparisons</h2>
    <ul>
        <li><strong>Always use adjusted close</strong> — unadjusted prices give misleading results
            after splits or dividends</li>
        <li><strong>Match the time horizon</strong> — comparing 1-year and 5-year returns is
            not meaningful</li>
        <li><strong>Include a benchmark</strong> — comparing stocks to each other is useful, but
            comparing them to the S&amp;P 500 (SPY) shows whether either beat the market</li>
        <li><strong>Consider dividends</strong> — total return (price appreciation + dividends) gives
            the full picture. Export dividend data alongside prices for complete analysis</li>
    </ul>

    <h2>Get started</h2>
    <p>
        Grab the data, normalize it, and chart it. That is all stock comparison takes.
        <a :href="ctaUrl" target="_blank" rel="noopener">Install FinGrab</a> to export consistent
        OHLCV data from Yahoo Finance for every stock you want to compare — no coding, no manual
        copying, clean CSV files ready for your spreadsheet.
    </p>

    <RelatedArticles :slugs="['historical-stock-price-data', 'excel-stock-analysis', 'export-yahoo-finance-csv']" />
</template>

<script setup>
import RelatedArticles from '../RelatedArticles.vue'

const ctaUrl = 'https://chromewebstore.google.com/detail/fingrab'
</script>
