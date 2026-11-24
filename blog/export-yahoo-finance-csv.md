# Export Yahoo Finance Data to Excel or CSV (2026)

> Yahoo's download button needs a paid Gold plan. 4 ways to get Yahoo Finance prices into Excel or CSV: Power Query, Python, or the FinGrab extension.

Source: https://fingrab.app/blog/export-yahoo-finance-csv

## Why export Yahoo Finance data to Excel or CSV?

Yahoo Finance is one of the most popular sources for stock prices. The data is on the page, but getting it into Excel or a CSV file is not always straightforward.

A CSV file works everywhere: Excel, Google Sheets, R, Python, or any other analysis tool. No vendor lock-in, no proprietary format. Four methods get you there. They differ in cost, effort, and how reliable they are.

## Method 1: The download button on Yahoo Finance

Yahoo Finance has a download link on the Historical Data tab of each stock. According to [Yahoo's help page](https://help.yahoo.com/kb/SLN2311.html), downloading historical data requires a paid Yahoo Finance Gold subscription. Users without it report a lock icon instead of a download.

If you have Gold:

1.  Open the stock's quote page on finance.yahoo.com and go to the Historical Data tab.
2.  Set the date range and the frequency you need.
3.  Click the download link to save the file as CSV.

### Limitations

-   Needs a paid subscription
-   One ticker at a time
-   Refreshing means repeating the download by hand

## Method 2: Power Query web import in Excel

Excel's Power Query can read a table straight from a web page, so you skip the file. Menu names vary a little between Excel versions. Yahoo Finance pages are built with scripts, so the result depends on what the page delivers when Excel loads it.

1.  Copy the address of the Historical Data page for your ticker.
2.  In Excel, go to Data → Get Data → From Web and paste the address.
3.  In the Navigator window, select the table that holds the prices. If no table appears, this method will not work for that page.
4.  Click Transform Data to check the column types (dates and numbers), then choose Close & Load.
5.  To update later, use Data → Refresh All.

### Limitations

-   Often shows no table, or a cookie or consent page, instead of the data
-   Only the rows the page has loaded, usually not the full history
-   Breaks when Yahoo Finance changes its layout, sometimes without an error

## Method 3: Python (yfinance)

Libraries like `yfinance` access Yahoo Finance data programmatically. You write a Python script, call the API, and save the result as CSV.

```
import yfinance as yf
data = yf.download("AAPL", start="2024-01-01")
data.to_csv("aapl.csv")
```

### Limitations

-   Requires Python installed and basic coding knowledge
-   API can break without notice (unofficial, undocumented)
-   Rate limiting on frequent requests
-   Not practical for quick, one-off exports

## Method 4: Browser extension (FinGrab)

[FinGrab](https://fingrab.app/) is a Chrome extension that adds an export button to Yahoo Finance quote pages. It reads the ticker from the page, fetches the price history from Yahoo Finance, and builds the CSV in your browser.

1.  Install FinGrab from the [Chrome Web Store](https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm).
2.  Open the stock's quote page on finance.yahoo.com.
3.  Click the FinGrab button on the page. The ticker is already filled in.
4.  Choose a time period and an interval: daily, weekly, or monthly.
5.  Download the CSV and open it in Excel.

The file contains date, open, high, low, close, adjusted close, and volume, one row per period. The adjusted close accounts for splits and dividends, so long price charts stay consistent.

### Limitations

-   Chrome only
-   Price history only
-   One ticker per export

## Comparison

Method

Cost

Coding required

Refreshing

Yahoo download button

Yahoo Finance Gold

No

Repeat the download

Power Query web import

Free

No

Data → Refresh All (may fail)

Python (yfinance)

Free

Yes

Rerun the script

FinGrab extension

Free exports, longer ranges paid

No

Repeat the export

## Opening the CSV in Excel

Import the file with Data → From Text/CSV instead of double-clicking it. Excel then shows a preview where you can check that the Date column is a date and the price columns are numbers before you load the table.

-   **Numbers show up as text:** set the price columns to Decimal Number in the import dialog.
-   **Dates are wrong or day and month are swapped:** set the Date column type explicitly. The regional setting of your Excel decides how dates are read.
-   **Prices differ from the Yahoo chart:** compare the Close and Adj Close columns. Adjusted close also accounts for dividends, so the two differ on dates with payouts.

For formulas and analysis once the data is in, read the [Excel stock analysis guide](https://fingrab.app/blog/excel-stock-analysis). Prefer a walkthrough with screenshots? See the [two-click guide to stock prices in Excel](https://fingrab.app/stock-prices-in-excel).

## Get started

If you need Yahoo Finance prices in Excel or CSV without a subscription or code, the fastest path is a browser extension. [Install FinGrab](https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm) and export your first dataset in under two minutes.

## Related Articles

-   [Historical Stock Price Data: Where to Find Free OHLCV Data](https://fingrab.app/blog/historical-stock-price-data)
    
    Overview of free sources for historical stock price data including OHLCV. Compare Yahoo Finance, Alpha Vantage, and browser-based export tools.
    
-   [Excel Stock Analysis: Import Financial Data Without Coding](https://fingrab.app/blog/excel-stock-analysis)
    
    Learn how to analyze stocks in Excel without coding or API keys. Get financial data into your spreadsheet the easy way.
    
-   [Yahoo Finance API Alternatives: Free Financial Data Sources](https://fingrab.app/blog/yahoo-finance-api-alternatives)
    
    Alpha Vantage, Financial Modeling Prep, Twelve Data, Polygon.io, EODHD and yfinance compared: free-tier limits, coverage, and a no-code option.
