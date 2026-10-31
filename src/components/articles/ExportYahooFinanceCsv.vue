<template>
    <h2>Why export Yahoo Finance data to Excel or CSV?</h2>
    <p>
        Yahoo Finance is one of the most popular sources for stock prices. The data is on the page, but getting it
        into Excel or a CSV file is not always straightforward.
    </p>
    <p>
        A CSV file works everywhere: Excel, Google Sheets, R, Python, or any other analysis tool. No vendor lock-in,
        no proprietary format. Four methods get you there. They differ in cost, effort, and how reliable they are.
    </p>

    <h2>Method 1: The download button on Yahoo Finance</h2>
    <p>
        Yahoo Finance has a download link on the Historical Data tab of each stock. According to
        <a href="https://help.yahoo.com/kb/SLN2311.html" target="_blank" rel="noopener">Yahoo's help page</a>,
        downloading historical data requires a paid Yahoo Finance Gold subscription. Users without it report a
        lock icon instead of a download.
    </p>
    <p>If you have Gold:</p>
    <ol>
        <li>Open the stock's quote page on finance.yahoo.com and go to the Historical Data tab.</li>
        <li>Set the date range and the frequency you need.</li>
        <li>Click the download link to save the file as CSV.</li>
    </ol>
    <h3>Limitations</h3>
    <ul>
        <li>Needs a paid subscription</li>
        <li>One ticker at a time</li>
        <li>Refreshing means repeating the download by hand</li>
    </ul>

    <h2>Method 2: Power Query web import in Excel</h2>
    <p>
        Excel's Power Query can read a table straight from a web page, so you skip the file. Menu names vary a
        little between Excel versions. Yahoo Finance pages are built with scripts, so the result depends on what
        the page delivers when Excel loads it.
    </p>
    <ol>
        <li>Copy the address of the Historical Data page for your ticker.</li>
        <li>In Excel, go to Data → Get Data → From Web and paste the address.</li>
        <li>In the Navigator window, select the table that holds the prices. If no table appears, this method will not work for that page.</li>
        <li>Click Transform Data to check the column types (dates and numbers), then choose Close &amp; Load.</li>
        <li>To update later, use Data → Refresh All.</li>
    </ol>
    <h3>Limitations</h3>
    <ul>
        <li>Often shows no table, or a cookie or consent page, instead of the data</li>
        <li>Only the rows the page has loaded, usually not the full history</li>
        <li>Breaks when Yahoo Finance changes its layout, sometimes without an error</li>
    </ul>

    <h2>Method 3: Python (yfinance)</h2>
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

    <h2>Method 4: Browser extension (FinGrab)</h2>
    <p>
        <router-link to="/">FinGrab</router-link> is a Chrome extension that adds an export button to Yahoo Finance
        quote pages. It reads the ticker from the page, fetches the price history from Yahoo Finance, and builds
        the CSV in your browser.
    </p>
    <ol>
        <li>Install FinGrab from the <a :href="ctaUrl" target="_blank" rel="noopener">Chrome Web Store</a>.</li>
        <li>Open the stock's quote page on finance.yahoo.com.</li>
        <li>Click the FinGrab button on the page. The ticker is already filled in.</li>
        <li>Choose a time period and an interval: daily, weekly, or monthly.</li>
        <li>Download the CSV and open it in Excel.</li>
    </ol>
    <p>
        The file contains date, open, high, low, close, adjusted close, and volume, one row per period. The
        adjusted close accounts for splits and dividends, so long price charts stay consistent.
    </p>
    <h3>Limitations</h3>
    <ul>
        <li>Chrome only</li>
        <li>Price history only</li>
        <li>One ticker per export</li>
    </ul>

    <h2>Comparison</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Cost</th>
                    <th>Coding required</th>
                    <th>Refreshing</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Yahoo download button</td>
                    <td>Yahoo Finance Gold</td>
                    <td>No</td>
                    <td>Repeat the download</td>
                </tr>
                <tr>
                    <td>Power Query web import</td>
                    <td>Free</td>
                    <td>No</td>
                    <td>Data → Refresh All (may fail)</td>
                </tr>
                <tr>
                    <td>Python (yfinance)</td>
                    <td>Free</td>
                    <td>Yes</td>
                    <td>Rerun the script</td>
                </tr>
                <tr>
                    <td>FinGrab extension</td>
                    <td>Free exports, longer ranges paid</td>
                    <td>No</td>
                    <td>Repeat the export</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2>Opening the CSV in Excel</h2>
    <p>
        Import the file with Data → From Text/CSV instead of double-clicking it. Excel then shows a preview where
        you can check that the Date column is a date and the price columns are numbers before you load the table.
    </p>
    <ul>
        <li><strong>Numbers show up as text:</strong> set the price columns to Decimal Number in the import dialog.</li>
        <li><strong>Dates are wrong or day and month are swapped:</strong> set the Date column type explicitly. The regional setting of your Excel decides how dates are read.</li>
        <li><strong>Prices differ from the Yahoo chart:</strong> compare the Close and Adj Close columns. Adjusted close also accounts for dividends, so the two differ on dates with payouts.</li>
    </ul>
    <p>
        For formulas and analysis once the data is in, read the
        <router-link to="/blog/excel-stock-analysis">Excel stock analysis guide</router-link>. Prefer a walkthrough
        with screenshots? See the <router-link to="/stock-prices-in-excel">two-click guide to stock prices in Excel</router-link>.
    </p>

    <h2>Get started</h2>
    <p>
        If you need Yahoo Finance prices in Excel or CSV without a subscription or code, the fastest path is a
        browser extension. <a :href="ctaUrl" target="_blank" rel="noopener">Install FinGrab</a> and export your
        first dataset in under two minutes.
    </p>

    <RelatedArticles :slugs="['historical-stock-price-data', 'excel-stock-analysis', 'yahoo-finance-api-alternatives']" />
</template>

<script setup>
import { STORE_URL as ctaUrl } from '../../config.js'
import RelatedArticles from '../RelatedArticles.vue'

</script>
