<template>
    <h2>What is a stock screener?</h2>
    <p>
        A stock screener filters thousands of stocks based on criteria you define — market cap, P/E ratio,
        dividend yield, revenue growth, sector, and more. Instead of scrolling through endless lists, you set
        your parameters and let the screener surface the stocks that match.
    </p>
    <p>
        For individual investors, a good screener replaces hours of manual research. For analysts and portfolio
        managers, it is the first step in any systematic stock selection process.
    </p>

    <h2>What to look for in a free stock screener</h2>
    <p>
        Not all screeners are equal. Before picking one, consider these factors:
    </p>
    <ul>
        <li><strong>Number of filters</strong> — More filters mean more precise results. Basic screeners offer 10-15 filters; advanced ones offer 50+.</li>
        <li><strong>Data freshness</strong> — Some free screeners delay data by 15-20 minutes. Real-time data matters for active traders.</li>
        <li><strong>Export options</strong> — Can you download results as CSV or Excel? This is critical for further analysis.</li>
        <li><strong>Market coverage</strong> — US stocks only, or international markets too?</li>
        <li><strong>Fundamental vs. technical</strong> — Some screeners focus on fundamentals (P/E, revenue), others on technical indicators (RSI, moving averages), and a few cover both.</li>
    </ul>

    <h2>1. Finviz — best for visual stock screening</h2>
    <p>
        Finviz is one of the most popular free stock screeners. Its strength is the visual heat map and the
        sheer number of filters available — over 60 in the free version.
    </p>
    <h3>Strengths</h3>
    <ul>
        <li>60+ filters covering fundamentals, technicals, and descriptive criteria</li>
        <li>Visual heat map for quick market overview</li>
        <li>Clean, fast interface with instant results</li>
        <li>Preset screens for common strategies (value, growth, dividend)</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Free version shows delayed data (20 minutes)</li>
        <li>US stocks only — no international markets</li>
        <li>CSV export requires Finviz Elite (paid)</li>
        <li>Limited financial statement data</li>
    </ul>

    <h2>2. Yahoo Finance Screener — best for beginners</h2>
    <p>
        Yahoo Finance includes a built-in stock screener accessible from the main navigation. It offers a
        clean interface and covers the most common fundamental and technical filters.
    </p>
    <h3>Strengths</h3>
    <ul>
        <li>Simple, beginner-friendly interface</li>
        <li>No account required for basic screening</li>
        <li>Integrated with Yahoo Finance's detailed stock pages</li>
        <li>Covers US and international markets</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Fewer filters than specialized screeners</li>
        <li>No direct CSV export from the screener results</li>
        <li>Slower to load with large result sets</li>
        <li>Limited technical indicator filters</li>
    </ul>
    <p>
        Once you find stocks worth investigating, you can export their
        <router-link to="/blog/historical-stock-price-data">historical price data</router-link> or financial
        statements from Yahoo Finance using a tool like <router-link to="/">FinGrab</router-link>.
    </p>

    <h2>3. TradingView Screener — best for technical analysis</h2>
    <p>
        TradingView combines charting and screening in one platform. The screener supports both fundamental
        and technical filters, and you can switch to a chart with one click.
    </p>
    <h3>Strengths</h3>
    <ul>
        <li>Deep technical indicator library (RSI, MACD, Bollinger Bands, custom indicators)</li>
        <li>Global market coverage — stocks, ETFs, forex, crypto</li>
        <li>Real-time data for many markets</li>
        <li>Built-in charting directly from screener results</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Free tier limits saved screeners and alerts</li>
        <li>Export functionality requires a paid plan</li>
        <li>Interface can feel overwhelming for beginners</li>
    </ul>

    <h2>4. Investing.com Screener — best for international stocks</h2>
    <p>
        Investing.com covers markets worldwide. If you screen stocks outside the US — European, Asian, or
        emerging markets — this is one of the most comprehensive free options.
    </p>
    <h3>Strengths</h3>
    <ul>
        <li>Covers 40+ global stock exchanges</li>
        <li>Good selection of fundamental filters</li>
        <li>Free to use with no account</li>
        <li>Sector and industry classification for international markets</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Ad-heavy interface</li>
        <li>No direct CSV export in the free version</li>
        <li>Technical filters are limited compared to TradingView</li>
    </ul>

    <h2>5. Zacks Stock Screener — best for earnings-focused investors</h2>
    <p>
        Zacks is known for its earnings estimates and ranking system. The free screener lets you filter stocks
        by the Zacks Rank, earnings surprise history, and estimate revisions.
    </p>
    <h3>Strengths</h3>
    <ul>
        <li>Unique Zacks Rank filter based on earnings estimate revisions</li>
        <li>Earnings surprise and estimate data built in</li>
        <li>Research reports available for screened stocks</li>
    </ul>
    <h3>Limitations</h3>
    <ul>
        <li>Many advanced filters are locked behind Zacks Premium</li>
        <li>US stocks only</li>
        <li>Interface feels dated compared to Finviz or TradingView</li>
    </ul>

    <h2>Comparison table</h2>
    <div class="overflow-x-auto">
        <table>
            <thead>
                <tr>
                    <th>Screener</th>
                    <th>Best for</th>
                    <th>Markets</th>
                    <th>Free CSV export</th>
                    <th>Technical filters</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Finviz</td>
                    <td>Visual screening</td>
                    <td>US only</td>
                    <td>No (paid)</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td>Yahoo Finance</td>
                    <td>Beginners</td>
                    <td>Global</td>
                    <td>No</td>
                    <td>Limited</td>
                </tr>
                <tr>
                    <td>TradingView</td>
                    <td>Technical analysis</td>
                    <td>Global</td>
                    <td>No (paid)</td>
                    <td>Extensive</td>
                </tr>
                <tr>
                    <td>Investing.com</td>
                    <td>International stocks</td>
                    <td>40+ exchanges</td>
                    <td>No</td>
                    <td>Limited</td>
                </tr>
                <tr>
                    <td>Zacks</td>
                    <td>Earnings analysis</td>
                    <td>US only</td>
                    <td>No</td>
                    <td>Limited</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2>The export problem: getting screener results into a spreadsheet</h2>
    <p>
        Notice a pattern in the table above? Most free stock screeners do not offer CSV export. You can
        filter and find stocks, but getting the underlying data into Excel or Google Sheets for deeper
        analysis requires extra steps.
    </p>
    <p>
        This is where the screening workflow often breaks down. You find 20 interesting stocks, but then
        you need their financial statements, historical prices, or key statistics in a spreadsheet. Manually
        copying that data is tedious and error-prone.
    </p>
    <p>
        <router-link to="/">FinGrab</router-link> bridges this gap. After screening stocks on any platform,
        open each ticker on Yahoo Finance and export the data you need — financials, OHLCV,
        dividends — as CSV with one click. No coding, no API keys. Read more about
        <router-link to="/blog/export-yahoo-finance-csv">exporting Yahoo Finance data to CSV</router-link>
        or how to use the data for
        <router-link to="/blog/excel-stock-analysis">stock analysis in Excel</router-link>.
    </p>

    <h2>Tips for effective stock screening</h2>
    <h3>Start broad, then narrow</h3>
    <p>
        Begin with 2-3 high-level filters (market cap, sector, exchange) and progressively add
        more specific criteria. Starting too narrow risks filtering out good candidates.
    </p>
    <h3>Combine fundamental and technical filters</h3>
    <p>
        A stock that looks cheap on fundamentals but has terrible price momentum may stay cheap for a long
        time. Combining both filter types gives you a more complete picture.
    </p>
    <h3>Verify with actual financial data</h3>
    <p>
        Screener data is summary-level. Before making investment decisions, pull the full financial statements
        and examine the numbers in detail. Tools like
        <router-link to="/">FinGrab</router-link> make this step fast by exporting complete financial
        data from Yahoo Finance directly to CSV.
    </p>
    <h3>Save and revisit your screens</h3>
    <p>
        Markets change daily. A screen that returns zero results today might surface interesting
        stocks next month. Save your filter criteria and run the screen regularly.
    </p>

    <h2>Get started</h2>
    <p>
        Pick the screener that fits your style, find your candidates, then grab the data you need.
        <a :href="ctaUrl" target="_blank" rel="noopener">Install FinGrab</a> to export financial data
        from Yahoo Finance in seconds — no spreadsheet copying, no coding required.
    </p>
</template>

<script setup>
const ctaUrl = 'https://chromewebstore.google.com/detail/fingrab'
</script>
