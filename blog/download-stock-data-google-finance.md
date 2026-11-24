# Download Stock Data from Google Finance: 4 Ways (2026)

> Google Finance has no download button. 4 ways to get the data anyway: GOOGLEFINANCE() in Sheets, copy and paste, the old API, or a CSV from Yahoo Finance.

Source: https://fingrab.app/blog/download-stock-data-google-finance

## Can you download stock data from Google Finance?

Google Finance shows stock quotes, charts, and basic financials — but it does not offer a direct CSV or Excel download. Unlike Yahoo Finance, there is no "Download" button on any Google Finance page. If you want the data in a spreadsheet, you need a workaround.

This guide covers every method available to get stock data out of Google Finance, from built-in Google Sheets functions to browser extensions that export data from financial sites.

## Method 1: GOOGLEFINANCE() function in Google Sheets

Google Sheets has a built-in `GOOGLEFINANCE()` function that pulls live and historical stock data directly into your spreadsheet.

### Basic syntax

```
=GOOGLEFINANCE("AAPL", "price")
=GOOGLEFINANCE("MSFT", "close", "2024-01-01", "2024-12-31", "DAILY")
```

### Available attributes

-   **price** — real-time or delayed quote
-   **open, high, low, close, volume** — historical OHLCV data
-   **marketcap** — current market capitalization
-   **pe** — price-to-earnings ratio
-   **eps** — earnings per share

### Limitations

-   Historical data is limited — typically the last 1-5 years depending on the attribute
-   No financial statements (income statement, balance sheet, cash flow)
-   No dividend history or earnings calendar
-   Data can be delayed up to 20 minutes
-   Rate limits on how many `GOOGLEFINANCE()` calls a single sheet can make
-   Attributes sometimes stop working without notice — the function is undocumented

## Method 2: Copy and paste from Google Finance

You can manually select data from Google Finance pages and paste it into a spreadsheet. This works for small amounts of data — a few data points for one or two stocks.

### Limitations

-   Extremely slow for more than a handful of stocks
-   Formatting breaks on paste — numbers may import as text
-   No historical price tables to copy (Google Finance only shows charts)
-   Error-prone — easy to miss a column or misalign rows

## Method 3: Google Finance API (deprecated)

Google once offered a Finance API, but it was shut down in 2012. There is no official Google Finance API available today. Any third-party library claiming to access it is either scraping the website (fragile and against ToS) or using a different data source entirely.

If you need a programmatic approach, consider the [Yahoo Finance API alternatives](https://fingrab.app/blog/yahoo-finance-api-alternatives) instead.

## Method 4: Use Yahoo Finance with a browser extension

Google Finance is great for quick lookups, but when you need downloadable data, Yahoo Finance offers far more: full price history for stocks, ETFs and indices, back to the first trading day.

[FinGrab](https://fingrab.app/) is a Chrome extension that adds one-click CSV export to Yahoo Finance. Instead of fighting with Google Finance's limitations, you switch to Yahoo Finance and export the price history you need.

### What FinGrab exports from Yahoo Finance

-   **Historical prices** — full OHLCV data for any date range
-   **Adjusted close** — prices adjusted for splits and dividends
-   **Daily, weekly or monthly** — one row per period

### How it works

1.  Install FinGrab from the [Chrome Web Store](https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm)
2.  Open any stock on finance.yahoo.com
3.  Click the FinGrab icon in Chrome's side panel
4.  Select data type and date range
5.  Click export — CSV downloads instantly

## Comparison: Google Finance vs. Yahoo Finance for data export

Feature

Google Finance

Yahoo Finance + FinGrab

Direct CSV download

No

Yes

Historical OHLCV

Via Sheets function only

Full history, one click

Adjusted close

Not available

Included

Coding required

Sheets formulas

No

## When to use each approach

### Use GOOGLEFINANCE() when

-   You need live prices updating in a Google Sheet
-   You only need basic price data for a few stocks
-   You are already working in Google Sheets and want inline data

### Use Yahoo Finance + FinGrab when

-   You want clean CSV files for analysis in Excel, R, or Python
-   You need adjusted prices for return calculations
-   You want [historical stock price data](https://fingrab.app/blog/historical-stock-price-data) going back further than Google Finance supports

## Get started

Google Finance is useful for quick quotes, but it was never built for data export. If you need downloadable price history, the fastest path is Yahoo Finance with [FinGrab](https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm). Install it and export your first dataset in under two minutes.

## Related Articles

-   [How to Export Yahoo Finance Data to Excel or CSV](https://fingrab.app/blog/export-yahoo-finance-csv)
    
    Yahoo's download button needs a paid Gold plan. 4 ways to get Yahoo Finance prices into Excel or CSV: Power Query, Python, or the FinGrab extension.
    
-   [Excel Stock Analysis: Import Financial Data Without Coding](https://fingrab.app/blog/excel-stock-analysis)
    
    Learn how to analyze stocks in Excel without coding or API keys. Get financial data into your spreadsheet the easy way.
    
-   [Yahoo Finance API Alternatives: Free Financial Data Sources](https://fingrab.app/blog/yahoo-finance-api-alternatives)
    
    Alpha Vantage, Financial Modeling Prep, Twelve Data, Polygon.io, EODHD and yfinance compared: free-tier limits, coverage, and a no-code option.
