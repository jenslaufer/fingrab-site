export const articles = [
    {
        slug: 'export-yahoo-finance-csv',
        title: 'How to Export Yahoo Finance Data to CSV',
        description: 'Step-by-step guide to export stock data from Yahoo Finance as CSV. Compare manual downloads, APIs, and browser extensions like FinGrab.',
        date: '2026-03-26',
        component: () => import('../components/articles/ExportYahooFinanceCsv.vue'),
    },
    {
        slug: 'historical-stock-price-data',
        title: 'Historical Stock Price Data: Where to Find Free OHLCV Data',
        description: 'Overview of free sources for historical stock price data including OHLCV. Compare Yahoo Finance, Alpha Vantage, and browser-based export tools.',
        date: '2026-03-26',
        component: () => import('../components/articles/HistoricalStockPriceData.vue'),
    },
    {
        slug: 'excel-stock-analysis',
        title: 'Excel Stock Analysis: Import Financial Data Without Coding',
        description: 'Learn how to analyze stocks in Excel without coding or API keys. Get financial data into your spreadsheet the easy way.',
        date: '2026-03-26',
        component: () => import('../components/articles/ExcelStockAnalysis.vue'),
    },
    {
        slug: 'best-free-stock-screeners',
        title: 'Best Free Stock Screeners 2026: Filter Stocks Like a Pro',
        description: 'Compare the best free stock screeners including Finviz, Yahoo Finance, TradingView, and more. Find the right tool to filter stocks by fundamentals and technicals.',
        date: '2026-03-26',
        component: () => import('../components/articles/BestFreeStockScreeners.vue'),
    },
    {
        slug: 'stock-portfolio-tracker-google-sheets',
        title: 'How to Build a Stock Portfolio Tracker in Google Sheets',
        description: 'Step-by-step guide to building a stock portfolio tracker in Google Sheets with live prices, dividend tracking, and performance charts.',
        date: '2026-03-26',
        component: () => import('../components/articles/StockPortfolioTrackerGoogleSheets.vue'),
    },
    {
        slug: 'yahoo-finance-api-alternatives',
        title: 'Yahoo Finance API Alternatives: Free Financial Data Sources',
        description: 'Overview of free Yahoo Finance API alternatives including Alpha Vantage, Financial Modeling Prep, Twelve Data, and browser-based export tools.',
        date: '2026-03-26',
        component: () => import('../components/articles/YahooFinanceApiAlternatives.vue'),
    },
]

export function findArticle(slug) {
    return articles.find(a => a.slug === slug)
}
