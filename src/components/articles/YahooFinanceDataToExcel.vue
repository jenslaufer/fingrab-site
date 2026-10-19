<template>
    <h2>Getting Yahoo Finance data into Excel</h2>
    <p>
        You want stock prices or financial data in an Excel workbook. This guide covers one job: getting the data
        from Yahoo Finance into Excel. Three methods work. They differ in effort, in how reliable they are, and in
        how often you can refresh the data.
    </p>
    <p>
        For CSV formats in general, read the <router-link to="/blog/export-yahoo-finance-csv">CSV export guide</router-link>.
        For formulas and analysis once the data is in, read the <router-link to="/blog/excel-stock-analysis">Excel stock analysis guide</router-link>.
    </p>

    <h2>Method 1: Download a CSV and open it in Excel</h2>
    <p>
        The simplest route needs no extra tools. Yahoo Finance has offered a CSV download on the Historical Data
        tab of many stock pages. If your page shows the option, use it.
    </p>
    <ol>
        <li>Open the stock's quote page on finance.yahoo.com and go to the Historical Data tab.</li>
        <li>Set the date range you need.</li>
        <li>Use the download link to save the file as CSV.</li>
        <li>
            In Excel, import the file with Data → From Text/CSV instead of double-clicking it. Check that the
            Date column is a date and the price columns are numbers, then load the table.
        </li>
    </ol>
    <h3>Limitations</h3>
    <ul>
        <li>One ticker at a time</li>
        <li>Historical prices only, no financial statements or dividend records</li>
        <li>The download option is not on every page</li>
        <li>Refreshing means repeating the download by hand</li>
    </ul>

    <h2>Method 2: Power Query web import (no file)</h2>
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
        <li>Breaks when Yahoo Finance changes its layout, sometimes without an error</li>
        <li>After every refresh, check the first and last date and the row count</li>
    </ul>

    <h2>Method 3: FinGrab extension (one export, clean file)</h2>
    <p>
        <router-link to="/">FinGrab</router-link> is a Chrome extension that adds an export button to Yahoo Finance
        quote pages. It reads the ticker from the page, fetches the data from Yahoo Finance, and processes it in
        your browser. You still open the file in Excel, but the file is already clean: one row per period and
        named columns, so there are no import settings to fix.
    </p>
    <ol>
        <li>Install <a :href="ctaUrl" target="_blank" rel="noopener">FinGrab from the Chrome Web Store</a>.</li>
        <li>Open the stock's quote page on finance.yahoo.com.</li>
        <li>Click the FinGrab button on the page. The ticker is already filled in.</li>
        <li>Choose a time period and an interval: daily, weekly, or monthly.</li>
        <li>Download the CSV and open it in Excel.</li>
    </ol>
    <p>
        The file contains date, open, high, low, close, adjusted close, and volume. The adjusted close accounts
        for splits and dividends, so long price charts stay consistent.
    </p>
    <h3>Limitations</h3>
    <ul>
        <li>Chrome only</li>
        <li>Each export is one click, so it is quick for a few tickers and repetitive for dozens</li>
    </ul>

    <h2>Which method should you use?</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Best for</th>
                    <th>Coding required</th>
                    <th>Refreshing</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Manual CSV download</td>
                    <td>A single one-off export</td>
                    <td>No</td>
                    <td>Repeat the download</td>
                </tr>
                <tr>
                    <td>Power Query web import</td>
                    <td>Pages where the table loads, if you want one workbook that updates</td>
                    <td>No</td>
                    <td>Data → Refresh All (may fail)</td>
                </tr>
                <tr>
                    <td>FinGrab extension</td>
                    <td>Quick exports, several tickers, statements and dividends</td>
                    <td>No</td>
                    <td>Repeat the export</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2>Common problems when importing into Excel</h2>
    <ul>
        <li><strong>Numbers show up as text:</strong> import with Data → From Text/CSV and set the price columns to Decimal Number.</li>
        <li><strong>Dates are wrong or day and month are swapped:</strong> set the Date column type explicitly in the import dialog. The regional setting of your Excel decides how dates are read.</li>
        <li><strong>Prices differ from the Yahoo chart:</strong> compare the Close and Adj Close columns. Adjusted close also accounts for dividends, so the two differ on dates with payouts.</li>
    </ul>

    <h2>Get started</h2>
    <p>
        For a one-off export, Method 1 costs nothing. If you update the same workbook regularly, the fastest path is
        <a :href="ctaUrl" target="_blank" rel="noopener">FinGrab</a>: install it and export your next dataset in
        under two minutes. Prefer a walkthrough with screenshots? See the
        <router-link to="/stock-prices-in-excel">two-click guide to stock prices in Excel</router-link>.
    </p>

    <RelatedArticles :slugs="['export-yahoo-finance-csv', 'excel-stock-analysis', 'historical-stock-price-data']" />
</template>

<script setup>
import { STORE_URL as ctaUrl } from '../../config.js'
import RelatedArticles from '../RelatedArticles.vue'

</script>
