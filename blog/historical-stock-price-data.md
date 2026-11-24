# Historical Stock Price Data: Where to Find Free OHLCV Data – FinGrab Blog

> Overview of free sources for historical stock price data including OHLCV. Compare Yahoo Finance, Alpha Vantage, and browser-based export tools.

Source: https://fingrab.app/blog/historical-stock-price-data

## What is OHLCV data?

OHLCV stands for Open, High, Low, Close, and Volume. These five data points capture the complete price action of a stock, ETF, or index for each trading day. OHLCV data is the foundation for technical analysis, backtesting trading strategies, and building financial models.

## Free sources for historical stock price data

### 1\. Yahoo Finance

The most widely used free source. Yahoo Finance covers stocks, ETFs, indices, currencies, and crypto. Data goes back decades for most US equities.

-   **Pros:** Broad coverage, long history, free, no registration required
-   **Cons:** No official API, manual downloads limited to OHLCV, occasional data gaps

### 2\. Alpha Vantage

Provides a free API with daily, weekly, and monthly stock data. Requires a free API key and basic coding knowledge to access.

-   **Pros:** Official API, JSON and CSV output, adjusted prices
-   **Cons:** 25 requests/day on free tier, limited historical depth for some endpoints

### 3\. FRED (Federal Reserve Economic Data)

Great for economic indicators, interest rates, and some market indices. Not a primary source for individual stock OHLCV data.

-   **Pros:** Official government data, reliable, free API
-   **Cons:** Limited to economic data and select indices, no individual stock prices

### 4\. Stooq

Polish financial data provider with surprisingly good global stock coverage. Offers free CSV downloads without registration.

-   **Pros:** Free bulk downloads, global coverage, no registration
-   **Cons:** Interface not English-friendly, inconsistent data formatting

### 5\. Tiingo

Offers a free tier with end-of-day stock prices and a clean REST API.

-   **Pros:** Clean API, good documentation, reliable data
-   **Cons:** Free tier limited to 500 requests/day, registration required

## Comparison of free OHLCV data sources

Source

API available

Registration

Rate limit

Best for

Yahoo Finance

Unofficial

No

Moderate

General use

Alpha Vantage

Yes

Yes (free)

25/day

Developers

FRED

Yes

Yes (free)

Generous

Economic data

Stooq

No

No

None

Bulk downloads

Tiingo

Yes

Yes (free)

500/day

Clean API access

## The simplest option for non-programmers

If you don't write code, most of these sources are hard to use. APIs require programming. Manual downloads are tedious and limited.

A browser extension like [FinGrab](https://fingrab.app/) bridges the gap. It lets you export OHLCV data directly from Yahoo Finance as CSV — no coding, no API keys, no registration. Just open a stock page and click export.

Each file also carries the adjusted close, which accounts for splits and dividends, so returns over long periods are calculated on a consistent price series.

## Get started

Need historical stock price data in CSV? [Install FinGrab](https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm) from the Chrome Web Store and download your first dataset in under two minutes.

## Related Articles

-   [How to Export Yahoo Finance Data to Excel or CSV](https://fingrab.app/blog/export-yahoo-finance-csv)
    
    Yahoo's download button needs a paid Gold plan. 4 ways to get Yahoo Finance prices into Excel or CSV: Power Query, Python, or the FinGrab extension.
    
-   [Excel Stock Analysis: Import Financial Data Without Coding](https://fingrab.app/blog/excel-stock-analysis)
    
    Learn how to analyze stocks in Excel without coding or API keys. Get financial data into your spreadsheet the easy way.
