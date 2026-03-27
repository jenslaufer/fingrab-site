<template>
    <h2>Why track your portfolio in Google Sheets?</h2>
    <p>
        Dedicated portfolio trackers exist — apps, websites, brokerage dashboards. But Google Sheets gives you
        something they cannot: complete control. You decide what to track, how to calculate returns, which
        metrics matter, and how the data is displayed.
    </p>
    <p>
        Google Sheets is free, accessible from any device, and supports real-time collaboration. You can share
        your tracker with an advisor, build custom formulas for your strategy, and integrate data from
        multiple sources.
    </p>

    <h2>Step 1: Set up the portfolio structure</h2>
    <p>
        Create a new Google Sheet and set up the following columns in the first row:
    </p>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Column</th>
                    <th>Description</th>
                    <th>Example</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>A: Ticker</td><td>Stock symbol</td><td>AAPL</td></tr>
                <tr><td>B: Company</td><td>Company name</td><td>Apple Inc.</td></tr>
                <tr><td>C: Shares</td><td>Number of shares held</td><td>50</td></tr>
                <tr><td>D: Avg Cost</td><td>Average purchase price per share</td><td>172.50</td></tr>
                <tr><td>E: Current Price</td><td>Live price (formula)</td><td>=GOOGLEFINANCE(A2,"price")</td></tr>
                <tr><td>F: Market Value</td><td>Current total value</td><td>=C2*E2</td></tr>
                <tr><td>G: Cost Basis</td><td>Total amount invested</td><td>=C2*D2</td></tr>
                <tr><td>H: Gain/Loss</td><td>Unrealized profit or loss</td><td>=F2-G2</td></tr>
                <tr><td>I: Return %</td><td>Percentage return</td><td>=H2/G2</td></tr>
            </tbody>
        </table>
    </div>
    <p>
        This gives you a live dashboard that updates automatically. Enter your holdings in rows below the header.
    </p>

    <h2>Step 2: Use GOOGLEFINANCE for live prices</h2>
    <p>
        Google Sheets has a built-in <code>GOOGLEFINANCE</code> function that pulls real-time and historical
        stock data. The basic syntax:
    </p>
    <pre><code>=GOOGLEFINANCE("AAPL", "price")
=GOOGLEFINANCE("MSFT", "marketcap")
=GOOGLEFINANCE("GOOGL", "pe")
=GOOGLEFINANCE("TSLA", "changepct")</code></pre>
    <h3>Available attributes</h3>
    <ul>
        <li><code>price</code> — current price (delayed ~20 minutes)</li>
        <li><code>high</code> / <code>low</code> — daily high and low</li>
        <li><code>volume</code> — trading volume</li>
        <li><code>marketcap</code> — market capitalization</li>
        <li><code>pe</code> — price-to-earnings ratio</li>
        <li><code>eps</code> — earnings per share</li>
        <li><code>changepct</code> — daily percentage change</li>
    </ul>
    <h3>Limitations of GOOGLEFINANCE</h3>
    <ul>
        <li>Data is delayed by 15-20 minutes</li>
        <li>No financial statements (income statement, balance sheet, cash flow)</li>
        <li>No dividend history details</li>
        <li>Limited fundamental data — no debt ratios, free cash flow, or revenue breakdown</li>
        <li>Occasionally returns errors or stale data</li>
    </ul>

    <h2>Step 3: Add a portfolio summary section</h2>
    <p>
        Below your holdings, create a summary block with key portfolio metrics:
    </p>
    <pre><code>Total Value:      =SUM(F2:F100)
Total Cost:       =SUM(G2:G100)
Total Gain/Loss:  =SUM(H2:H100)
Portfolio Return:  =(SUM(F2:F100)-SUM(G2:G100))/SUM(G2:G100)
Number of Holdings: =COUNTA(A2:A100)</code></pre>
    <p>
        Format the return percentage with conditional formatting — green for positive, red for negative.
        This gives you an instant visual check on overall portfolio health.
    </p>

    <h2>Step 4: Track dividends</h2>
    <p>
        Create a second sheet tab named "Dividends" with these columns:
    </p>
    <ul>
        <li><strong>Date</strong> — payment date</li>
        <li><strong>Ticker</strong> — stock symbol</li>
        <li><strong>Amount per Share</strong> — dividend amount</li>
        <li><strong>Shares Held</strong> — shares at ex-date</li>
        <li><strong>Total</strong> — amount received (=Amount * Shares)</li>
    </ul>
    <p>
        Use <code>SUMIFS</code> to calculate total dividends per stock or per year. This complements your
        capital gains tracking with income data for a complete return picture.
    </p>
    <p>
        To get dividend history data for your holdings, you can
        <router-link to="/blog/export-yahoo-finance-csv">export it from Yahoo Finance as CSV</router-link>
        and paste it directly into this sheet.
    </p>

    <h2>Step 5: Add historical performance data</h2>
    <p>
        GOOGLEFINANCE can pull historical prices, but the output format is awkward — it returns a multi-row
        array that is hard to integrate with your existing layout.
    </p>
    <pre><code>=GOOGLEFINANCE("AAPL", "close", DATE(2025,1,1), DATE(2025,12,31), "DAILY")</code></pre>
    <p>
        For serious historical analysis, importing CSV data is more practical. You get clean columns,
        exact date ranges, and full OHLCV data (open, high, low, close, volume).
    </p>
    <p>
        <router-link to="/">FinGrab</router-link> exports
        <router-link to="/blog/historical-stock-price-data">historical stock price data</router-link>
        directly from Yahoo Finance as CSV. Open the CSV in Google Sheets and your data is ready for
        charting and analysis — no reformatting needed.
    </p>

    <h2>Step 6: Build a performance chart</h2>
    <p>
        Visualize your portfolio performance over time:
    </p>
    <ol>
        <li>Create a "Performance" sheet with columns: Date, Portfolio Value</li>
        <li>Record your portfolio value weekly or monthly (manually or with a script)</li>
        <li>Select the data range and insert a line chart</li>
        <li>Add a benchmark column (e.g., S&amp;P 500 via GOOGLEFINANCE) for comparison</li>
    </ol>
    <pre><code>=GOOGLEFINANCE("SPY", "close", A2)  // S&amp;P 500 benchmark price on date in A2</code></pre>
    <p>
        Normalize both your portfolio value and the benchmark to a starting value of 100 for a fair
        visual comparison.
    </p>

    <h2>Going beyond GOOGLEFINANCE</h2>
    <p>
        GOOGLEFINANCE covers basic price data, but serious portfolio analysis needs more. Financial
        statements, detailed ratios, sector breakdowns, and earnings data are not available through
        the built-in function.
    </p>
    <p>
        Two approaches fill this gap:
    </p>
    <h3>Option 1: API-based data import</h3>
    <p>
        Services like Alpha Vantage or Financial Modeling Prep offer free API tiers. You can pull data into
        Google Sheets using <code>IMPORTDATA</code> or Apps Script. This requires some technical setup
        and comes with rate limits. See our guide on
        <router-link to="/blog/yahoo-finance-api-alternatives">Yahoo Finance API alternatives</router-link>
        for a full comparison of free data sources.
    </p>
    <h3>Option 2: CSV import from Yahoo Finance</h3>
    <p>
        <router-link to="/">FinGrab</router-link> lets you export financial statements, key statistics,
        historical prices, and dividend data from Yahoo Finance as CSV. Open the file in Google Sheets
        and your data is immediately usable — no API keys, no code, no rate limits.
    </p>
    <p>
        This works well for the portfolio tracker workflow: screen stocks, export their data, paste into
        your analysis sheets, and make informed decisions based on complete financial data.
    </p>

    <h2>Template structure recap</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Sheet tab</th>
                    <th>Purpose</th>
                    <th>Key formulas</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Portfolio</td>
                    <td>Holdings and live values</td>
                    <td>GOOGLEFINANCE, SUM, conditional formatting</td>
                </tr>
                <tr>
                    <td>Dividends</td>
                    <td>Income tracking</td>
                    <td>SUMIFS, date filters</td>
                </tr>
                <tr>
                    <td>Performance</td>
                    <td>Historical chart</td>
                    <td>GOOGLEFINANCE historical, line chart</td>
                </tr>
                <tr>
                    <td>Research</td>
                    <td>Imported financial data</td>
                    <td>CSV import from FinGrab</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2>Get started</h2>
    <p>
        Copy the structure above into a new Google Sheet, enter your holdings, and you have a working
        portfolio tracker in minutes. When you need deeper data — financial statements, historical
        prices, dividend records — <a :href="ctaUrl" target="_blank" rel="noopener">install FinGrab</a>
        and export it from Yahoo Finance directly into your spreadsheet.
    </p>
</template>

<script setup>
const ctaUrl = 'https://chromewebstore.google.com/detail/fingrab'
</script>
