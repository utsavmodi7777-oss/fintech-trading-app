// CSV Export Service
/**
 * Export portfolio data to CSV format
 */
export const exportPortfolioCSV = (portfolio, filename = 'portfolio.csv') => {
  const { investments, balance, transactionHistory } = portfolio

  // Prepare CSV headers and data for investments
  let csvContent = 'Investment Portfolio Export\n'
  csvContent += `Export Date: ${new Date().toLocaleString()}\n`
  csvContent += `Account Balance: $${balance.toFixed(2)}\n\n`

  csvContent += 'HOLDINGS\n'
  csvContent += 'Symbol,Quantity,Buy Price,Current Price,Invested Amount,Current Value,Gain/Loss,Return %\n'

  investments.forEach((inv) => {
    const currentValue = inv.currentPrice * inv.quantity
    const investedAmount = inv.buyPrice * inv.quantity
    const gainLoss = currentValue - investedAmount
    const returnPercent = (gainLoss / investedAmount) * 100

    csvContent += `${inv.symbol},${inv.quantity},${inv.buyPrice.toFixed(2)},${inv.currentPrice.toFixed(2)},${investedAmount.toFixed(2)},${currentValue.toFixed(2)},${gainLoss.toFixed(2)},${returnPercent.toFixed(2)}%\n`
  })

  // Add transaction history
  csvContent += '\n\nTRANSACTION HISTORY\n'
  csvContent += 'Date,Type,Symbol,Quantity,Price,Total Amount\n'

  transactionHistory.forEach((tx) => {
    const date = tx.date instanceof Date ? tx.date.toLocaleString() : tx.date
    csvContent += `${date},${tx.type},${tx.symbol},${tx.quantity},${tx.price.toFixed(2)},${tx.total.toFixed(2)}\n`
  })

  // Create blob and download
  downloadCSV(csvContent, filename)
}

/**
 * Export analytics data to CSV
 */
export const exportAnalyticsCSV = (analytics, filename = 'analytics.csv') => {
  let csvContent = 'Portfolio Analytics Export\n'
  csvContent += `Export Date: ${new Date().toLocaleString()}\n\n`

  csvContent += 'KEY METRICS\n'
  csvContent += 'Metric,Value\n'

  Object.entries(analytics).forEach(([key, value]) => {
    if (typeof value === 'object') {
      csvContent += `${key},"${JSON.stringify(value)}"\n`
    } else {
      csvContent += `${key},${value}\n`
    }
  })

  downloadCSV(csvContent, filename)
}

/**
 * Export transaction history to CSV
 */
export const exportTransactionsCSV = (transactions, filename = 'transactions.csv') => {
  let csvContent = 'Transaction History\n'
  csvContent += `Export Date: ${new Date().toLocaleString()}\n\n`

  csvContent += 'Date,Type,Symbol,Quantity,Price,Total Amount,Notes\n'

  transactions.forEach((tx) => {
    const date = tx.date instanceof Date ? tx.date.toLocaleString() : tx.date
    csvContent += `${date},${tx.type},${tx.symbol},${tx.quantity},${tx.price.toFixed(2)},${tx.total.toFixed(2)},""\n`
  })

  downloadCSV(csvContent, filename)
}

/**
 * Export watchlist to CSV
 */
export const exportWatchlistCSV = (watchlist, filename = 'watchlist.csv') => {
  let csvContent = 'Watchlist Export\n'
  csvContent += `Export Date: ${new Date().toLocaleString()}\n\n`

  csvContent += 'Symbol,Name,Current Price,Change %,Notes\n'

  watchlist.forEach((stock) => {
    csvContent += `${stock.symbol},"${stock.name}",${stock.price.toFixed(2)},${stock.changePercent.toFixed(2)}%,""\n`
  })

  downloadCSV(csvContent, filename)
}

/**
 * Helper function to download CSV file
 */
const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Clean up
  URL.revokeObjectURL(url)
}

/**
 * Export multiple stocks to CSV
 */
export const exportStocksCSV = (stocks, filename = 'stocks.csv') => {
  let csvContent = 'Stock Data Export\n'
  csvContent += `Export Date: ${new Date().toLocaleString()}\n\n`

  csvContent += 'Symbol,Name,Price,Change,Change %,Volume,Market Cap,P/E Ratio,52W High,52W Low\n'

  stocks.forEach((stock) => {
    csvContent += `${stock.symbol},"${stock.name}",${stock.price.toFixed(2)},${stock.change.toFixed(2)},${stock.changePercent.toFixed(2)}%,"${stock.volume}","${stock.marketCap}",${stock.pe || 'N/A'},${stock.high52w || 'N/A'},${stock.low52w || 'N/A'}\n`
  })

  downloadCSV(csvContent, filename)
}
