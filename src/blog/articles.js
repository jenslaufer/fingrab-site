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
]

export function findArticle(slug) {
    return articles.find(a => a.slug === slug)
}
