# Compare Stock Performance: Side-by-Side Analysis Guide – FinGrab Blog

> How to compare stocks side by side with normalized returns, Sharpe Ratio, and drawdown analysis. Includes Excel formulas and a practical workflow.

Source: https://fingrab.app/blog/compare-stock-performance-guide

## Why compare stock performance?

Comparing stocks side by side reveals which investments outperform, which sectors lead, and whether your picks beat a benchmark like the S&P 500. Raw price charts alone are misleading — a $300 stock and a $30 stock cannot be compared on the same axis without normalization.

This guide covers the methods, formulas, and data you need to compare stocks properly in Excel or Google Sheets.

## Step 1: Get comparable data sets

Accurate comparison requires consistent data. All stocks must cover the same date range, use the same time interval (daily, weekly), and use adjusted close prices to account for splits and dividends.

### Where to get the data

-   **Yahoo Finance manual download** — one stock at a time from the Historical Data tab
-   **Python (yfinance)** — download multiple tickers programmatically
-   **FinGrab Chrome extension** — export [historical price data](https://fingrab.app/blog/historical-stock-price-data) from Yahoo Finance as CSV with one click, then repeat for each stock

Whichever method you choose, make sure every dataset starts and ends on the same date. Mismatched date ranges skew your comparison.

## Step 2: Normalize prices for comparison

Normalization converts every stock's price to a common starting point — typically 100 or 0%. This lets you compare percentage gains regardless of the absolute stock price.

### Method A: Index to 100

Set the first day's value to 100 for each stock. Every subsequent day shows the relative change from that starting point.

```
Normalized Price = (Current Price / First Price) × 100

Example (AAPL):
Day 1: ($150 / $150) × 100 = 100.0
Day 2: ($153 / $150) × 100 = 102.0  (+2%)
Day 3: ($148 / $150) × 100 = 98.7   (-1.3%)
```

#### Excel formula

```
=B2 / B$2 * 100
```

Where B2 is the current close price and B$2 is the first close price (absolute row reference). Drag this formula down for each date and across for each stock.

### Method B: Cumulative percentage return

```
Cumulative Return = ((Current Price - First Price) / First Price) × 100

Example:
Day 1: 0%
Day 30: +8.5%
Day 60: +12.3%
```

#### Excel formula

```
=(B2 - B$2) / B$2 * 100
```

## Step 3: Chart the comparison

Create a line chart with the date on the x-axis and normalized prices (or cumulative returns) on the y-axis. Each stock gets its own line. This gives you a clear visual of relative performance over time.

### In Excel

1.  Select the date column and all normalized price columns
2.  Insert → Line Chart
3.  Add a chart title: "Stock Performance Comparison (Indexed to 100)"
4.  Format each line with a distinct color

### In Google Sheets

1.  Select the same data range
2.  Insert → Chart → Line chart
3.  In the Chart Editor, set the date column as the x-axis

## Advanced comparisons

### Relative strength comparison

Divide one stock's price by another to create a relative strength line. When the line rises, the numerator stock is outperforming. When it falls, the denominator stock leads.

```
=AAPL_Close / MSFT_Close
```

This is useful for pairs trading or comparing a stock against its sector ETF.

### Risk-adjusted comparison (Sharpe Ratio)

Raw returns do not account for risk. A stock that gained 20% with wild daily swings is not the same as one that gained 20% with steady, consistent growth. The Sharpe Ratio adjusts for this.

```
Sharpe Ratio = (Average Daily Return - Risk-Free Rate) / Standard Deviation of Daily Returns
```

#### Excel formulas

```
Daily Return:     =(B3-B2)/B2
Average Return:   =AVERAGE(C2:C252)
Std Deviation:    =STDEV(C2:C252)
Sharpe (annual):  =(C254 * 252 - 0.05) / (C255 * SQRT(252))
```

A higher Sharpe Ratio means better risk-adjusted returns. Compare Sharpe Ratios across stocks to find the most efficient performers.

### Drawdown analysis

Maximum drawdown shows the worst peak-to-trough decline. This tells you how much pain you would have endured during the worst period.

```
Running Max:   =MAX(B$2:B2)
Drawdown:      =(B2 - C2) / C2 * 100
```

Stocks with smaller maximum drawdowns are less volatile. Comparing drawdowns helps you understand the downside risk of each investment.

## Common comparison scenarios

Scenario

What to compare

Best metric

Stock vs. benchmark

AAPL vs. SPY

Indexed to 100 chart

Two competitors

AAPL vs. MSFT

Relative strength ratio

Portfolio candidates

5-10 stocks

Sharpe Ratio + Max Drawdown

Sector rotation

XLK vs. XLF vs. XLE

Cumulative return chart

## A practical comparison workflow

1.  **Choose your stocks** — pick 2-5 stocks or ETFs you want to compare. Use a [free stock screener](https://fingrab.app/blog/best-free-stock-screeners) to narrow candidates
2.  **Export the data** — install [FinGrab](https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm) and export historical OHLCV data for each ticker from Yahoo Finance
3.  **Align dates** — open all CSV files, filter to the same start and end date
4.  **Normalize** — add a column for each stock using the index-to-100 formula
5.  **Chart** — create a line chart with all normalized series
6.  **Calculate metrics** — add Sharpe Ratio and max drawdown for each stock

With [FinGrab](https://fingrab.app/), the data export step takes seconds per stock. The CSV files use a consistent format, so aligning and merging them in [Excel](https://fingrab.app/blog/excel-stock-analysis) is straightforward.

## Tips for better comparisons

-   **Always use adjusted close** — unadjusted prices give misleading results after splits or dividends
-   **Match the time horizon** — comparing 1-year and 5-year returns is not meaningful
-   **Include a benchmark** — comparing stocks to each other is useful, but comparing them to the S&P 500 (SPY) shows whether either beat the market
-   **Consider dividends** — total return (price appreciation + dividends) gives the full picture. Export dividend data alongside prices for complete analysis

## Get started

Grab the data, normalize it, and chart it. That is all stock comparison takes. [Install FinGrab](https://chromewebstore.google.com/detail/fingrab%E2%80%93yahoo-finance-exp/blajbhgoiomncfkpcfgiibcicifklgpm) to export consistent OHLCV data from Yahoo Finance for every stock you want to compare — no coding, no manual copying, clean CSV files ready for your spreadsheet.

## Related Articles

-   [Historical Stock Price Data: Where to Find Free OHLCV Data](https://fingrab.app/blog/historical-stock-price-data)
    
    Overview of free sources for historical stock price data including OHLCV. Compare Yahoo Finance, Alpha Vantage, and browser-based export tools.
    
-   [Excel Stock Analysis: Import Financial Data Without Coding](https://fingrab.app/blog/excel-stock-analysis)
    
    Learn how to analyze stocks in Excel without coding or API keys. Get financial data into your spreadsheet the easy way.
    
-   [How to Export Yahoo Finance Data to Excel or CSV](https://fingrab.app/blog/export-yahoo-finance-csv)
    
    Yahoo's download button needs a paid Gold plan. 4 ways to get Yahoo Finance prices into Excel or CSV: Power Query, Python, or the FinGrab extension.
