# Google Sheets Portfolio Tracker: Live Prices & Dividends

> Build a stock portfolio tracker in Google Sheets in 6 steps: live GOOGLEFINANCE prices, gain/loss, dividends and a performance chart. Formulas included.

Source: https://fingrab.app/blog/stock-portfolio-tracker-google-sheets

## Why track your portfolio in Google Sheets?

Dedicated portfolio trackers exist — apps, websites, brokerage dashboards. But Google Sheets gives you something they cannot: complete control. You decide what to track, how to calculate returns, which metrics matter, and how the data is displayed.

Google Sheets is free, accessible from any device, and supports real-time collaboration. You can share your tracker with an advisor, build custom formulas for your strategy, and integrate data from multiple sources.

## Step 1: Set up the portfolio structure

Create a new Google Sheet and set up the following columns in the first row:

Column

Description

Example

A: Ticker

Stock symbol

AAPL

B: Company

Company name

Apple Inc.

C: Shares

Number of shares held

50

D: Avg Cost

Average purchase price per share

172.50

E: Current Price

Live price (formula)

\=GOOGLEFINANCE(A2,"price")

F: Market Value

Current total value

\=C2\*E2

G: Cost Basis

Total amount invested

\=C2\*D2

H: Gain/Loss

Unrealized profit or loss

\=F2-G2

I: Return %

Percentage return

\=H2/G2

This gives you a live dashboard that updates automatically. Enter your holdings in rows below the header.

## Step 2: Use GOOGLEFINANCE for live prices

Google Sheets has a built-in `GOOGLEFINANCE` function that pulls real-time and historical stock data. The basic syntax:

```
=GOOGLEFINANCE("AAPL", "price")
=GOOGLEFINANCE("MSFT", "marketcap")
=GOOGLEFINANCE("GOOGL", "pe")
=GOOGLEFINANCE("TSLA", "changepct")
```

### Available attributes

-   `price` — current price (delayed ~20 minutes)
-   `high` / `low` — daily high and low
-   `volume` — trading volume
-   `marketcap` — market capitalization
-   `pe` — price-to-earnings ratio
-   `eps` — earnings per share
-   `changepct` — daily percentage change

### Limitations of GOOGLEFINANCE

-   Data is delayed by 15-20 minutes
-   No financial statements (income statement, balance sheet, cash flow)
-   No dividend history details
-   Limited fundamental data — no debt ratios, free cash flow, or revenue breakdown
-   Occasionally returns errors or stale data

## Step 3: Add a portfolio summary section

Below your holdings, create a summary block with key portfolio metrics:

```
Total Value:      =SUM(F2:F100)
Total Cost:       =SUM(G2:G100)
Total Gain/Loss:  =SUM(H2:H100)
Portfolio Return:  =(SUM(F2:F100)-SUM(G2:G100))/SUM(G2:G100)
Number of Holdings: =COUNTA(A2:A100)
```

Format the return percentage with conditional formatting — green for positive, red for negative. This gives you an instant visual check on overall portfolio health.

## Step 4: Track dividends

Create a second sheet tab named "Dividends" with these columns:

-   **Date** — payment date
-   **Ticker** — stock symbol
-   **Amount per Share** — dividend amount
-   **Shares Held** — shares at ex-date
-   **Total** — amount received (=Amount \* Shares)

Use `SUMIFS` to calculate total dividends per stock or per year. This complements your capital gains tracking with income data for a complete return picture.

Dividend dates and amounts for your holdings are listed on each stock's Historical Data page on Yahoo Finance (filter: Dividends only).

## Step 5: Add historical performance data

GOOGLEFINANCE can pull historical prices, but the output format is awkward — it returns a multi-row array that is hard to integrate with your existing layout.

```
=GOOGLEFINANCE("AAPL", "close", DATE(2025,1,1), DATE(2025,12,31), "DAILY")
```

For serious historical analysis, importing CSV data is more practical. You get clean columns, exact date ranges, and full OHLCV data (open, high, low, close, volume).

[FinGrab](https://fingrab.app/) exports [historical stock price data](https://fingrab.app/blog/historical-stock-price-data) directly from Yahoo Finance as CSV. Open the CSV in Google Sheets and your data is ready for charting and analysis — no reformatting needed.

## Step 6: Build a performance chart

Visualize your portfolio performance over time:

1.  Create a "Performance" sheet with columns: Date, Portfolio Value
2.  Record your portfolio value weekly or monthly (manually or with a script)
3.  Select the data range and insert a line chart
4.  Add a benchmark column (e.g., S&P 500 via GOOGLEFINANCE) for comparison

```
=GOOGLEFINANCE("SPY", "close", A2)  // S&P 500 benchmark price on date in A2
```

Normalize both your portfolio value and the benchmark to a starting value of 100 for a fair visual comparison.

## Going beyond GOOGLEFINANCE

GOOGLEFINANCE covers basic price data, but serious portfolio analysis needs more. Financial statements, detailed ratios, sector breakdowns, and earnings data are not available through the built-in function.

Two approaches fill this gap:

### Option 1: API-based data import

Services like Alpha Vantage or Financial Modeling Prep offer free API tiers. You can pull data into Google Sheets using `IMPORTDATA` or Apps Script. This requires some technical setup and comes with rate limits. See our guide on [Yahoo Finance API alternatives](https://fingrab.app/blog/yahoo-finance-api-alternatives) for a full comparison of free data sources.

### Option 2: CSV import from Yahoo Finance

[FinGrab](https://fingrab.app/) exports the full price history of any Yahoo Finance ticker as CSV, including the adjusted close. Open the file in Google Sheets and your data is immediately usable — no API keys, no code, no rate limits.

This works well for the portfolio tracker workflow: export the history of each holding, paste it into your Performance sheet, and calculate returns over any period GOOGLEFINANCE does not cover.

## Template structure recap

Sheet tab

Purpose

Key formulas

Portfolio

Holdings and live values

GOOGLEFINANCE, SUM, conditional formatting

Dividends

Income tracking

SUMIFS, date filters

Performance

Historical chart

GOOGLEFINANCE historical, line chart

Research

Imported price history

CSV import from FinGrab

## Get started

Copy the structure above into a new Google Sheet, enter your holdings, and you have a working portfolio tracker in minutes. When you need full price history as a file, [install FinGrab](https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm) and export it from Yahoo Finance directly into your spreadsheet.
