// Finnhub API Service for Global Stock Market Data
// Free API with real-time data from multiple markets
// Supports: US, India, China, Europe, and more

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || ''
const BASE_URL = 'https://finnhub.io/api/v1'

// Cache for API responses
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Get quotes for multiple stocks
 * @param {Array<string>} symbols - Stock symbols (e.g., ['AAPL', 'GOOGL', 'SBIN.NS'])
 * @returns {Promise<Object>} Map of symbol to quote data
 */
export const getMultipleQuotes = async (symbols) => {
  const results = {}

  for (const symbol of symbols) {
    const data = await getStockQuote(symbol)
    if (data) results[symbol] = data
    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  return results
}

/**
 * Get real-time stock quote
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} Quote data with price, change, volume
 */
export const getStockQuote = async (symbol) => {
  const cacheKey = `quote_${symbol}`
  const cached = cache.get(cacheKey)

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    const response = await fetch(
      `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`
    )
    const data = await response.json()

    if (data.c) {
      const quote = {
        symbol,
        price: data.c || 0,
        change: data.d || 0,
        changePercent: data.dp || 0,
        high: data.h || 0,
        low: data.l || 0,
        open: data.o || 0,
        previousClose: data.pc || 0,
        timestamp: new Date().toISOString(),
      }

      cache.set(cacheKey, { data: quote, timestamp: Date.now() })
      return quote
    }

    return null
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error)
    return null
  }
}

/**
 * Search for stocks
 * @param {string} query - Search query (stock name or symbol)
 * @returns {Promise<Array>} List of matching stocks
 */
export const searchStocks = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?q=${query}&token=${API_KEY}`
    )
    const data = await response.json()

    if (data.result) {
      return data.result.map((stock) => ({
        symbol: stock.symbol,
        description: stock.description,
        displaySymbol: stock.displaySymbol,
        type: stock.type,
      }))
    }

    return []
  } catch (error) {
    console.error('Error searching stocks:', error)
    return []
  }
}

/**
 * Get company profile
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} Company info
 */
export const getCompanyProfile = async (symbol) => {
  try {
    const response = await fetch(
      `${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`
    )
    const data = await response.json()

    if (data.name) {
      return {
        symbol: data.ticker,
        name: data.name,
        exchange: data.exchange,
        ipo: data.ipo,
        marketCapitalization: data.marketCapitalization,
        weburl: data.weburl,
        logo: data.logo,
        industry: data.finnhubIndustry,
        country: data.country,
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching company profile:', error)
    return null
  }
}

/**
 * Get news for a stock
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Array>} News articles
 */
export const getStockNews = async (symbol) => {
  try {
    const fromDate = new Date()
    fromDate.setDate(fromDate.getDate() - 7) // Last 7 days

    const response = await fetch(
      `${BASE_URL}/company-news?symbol=${symbol}&from=${fromDate.toISOString().split('T')[0]}&to=${new Date().toISOString().split('T')[0]}&token=${API_KEY}`
    )
    const data = await response.json()

    if (Array.isArray(data)) {
      return data.slice(0, 5).map((news) => ({
        headline: news.headline,
        summary: news.summary,
        url: news.url,
        image: news.image,
        source: news.source,
        datetime: news.datetime,
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

/**
 * Get earnings data
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Array>} Earnings data
 */
export const getEarnings = async (symbol) => {
  try {
    const response = await fetch(
      `${BASE_URL}/stock/earnings?symbol=${symbol}&token=${API_KEY}`
    )
    const data = await response.json()

    if (Array.isArray(data)) {
      return data.slice(0, 4).map((earning) => ({
        quarter: earning.quarter,
        year: earning.year,
        eps: earning.eps,
        surprise: earning.surprise,
        surprisePercent: earning.surprisePercent,
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching earnings:', error)
    return []
  }
}

/**
 * Get list of stocks for Indian market (Sensex/Nifty)
 * Uses major Indian stocks
 */
export const getIndianStocks = async () => {
  const indianStocks = [
    'SBIN.NS', 'RELIANCE.NS', 'HDFC.NS', 'INFY.NS', 'TCS.NS',
    'WIPRO.NS', 'BAJAJFINSV.NS', 'ASIANPAINT.NS', 'ICICIBANK.NS', 'KOTAK.NS'
  ]

  return getMultipleQuotes(indianStocks)
}

/**
 * Get list of stocks for China market
 * Uses major Chinese stocks listed on US exchanges
 */
export const getChinaStocks = async () => {
  const chinaStocks = [
    'BABA', 'PDD', 'NTES', 'JD', 'BILI',
    'TME', 'DDOG', 'NIO', 'XPEV', 'LI'
  ]

  return getMultipleQuotes(chinaStocks)
}

/**
 * Get list of stocks for Global market (Tech heavy)
 */
export const getGlobalStocks = async () => {
  const globalStocks = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA',
    'META', 'TSLA', 'AVGO', 'ADBE', 'CSCO'
  ]

  return getMultipleQuotes(globalStocks)
}

/**
 * Get stocks by sector
 * @param {string} sector - Sector name
 * @returns {Promise<Array>} Stocks in that sector
 */
export const getStocksBySector = async (sector) => {
  const sectorStocks = {
    'technology': ['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA', 'INFY.NS'],
    'finance': ['JPM', 'BAC', 'WFC', 'SBIN.NS', 'HDFC.NS', 'ICICIBANK.NS'],
    'healthcare': ['JNJ', 'UNH', 'PFE', 'ABBV', 'TMO'],
    'energy': ['XOM', 'CVX', 'COP', 'SLB'],
    'automotive': ['TSLA', 'F', 'GM', 'MARUTI.NS'],
    'ecommerce': ['AMZN', 'EBAY', 'WMT', 'RELIANCE.NS'],
  }

  const symbols = sectorStocks[sector.toLowerCase()] || []
  return getMultipleQuotes(symbols)
}

/**
 * Get trending stocks (based on recent activity)
 * Limited free tier, returns popular stocks
 */
export const getTrendingStocks = async () => {
  const trendingSymbols = [
    'AAPL', 'TSLA', 'GME', 'AMC', 'SBIN.NS',
    'BABA', 'MSFT', 'GOOGL', 'AMZN', 'META'
  ]

  return getMultipleQuotes(trendingSymbols)
}

/**
 * Screen stocks by criteria
 * @param {Object} criteria - Screening criteria
 * @returns {Promise<Array>} Filtered stocks
 */
export const screenStocks = async (criteria) => {
  // Get a base list of stocks
  let stocks = await getGlobalStocks()

  // Convert to array
  let stockArray = Object.values(stocks).filter(s => s !== null)

  // Apply filters
  if (criteria.minPrice) {
    stockArray = stockArray.filter(s => s.price >= criteria.minPrice)
  }

  if (criteria.maxPrice) {
    stockArray = stockArray.filter(s => s.price <= criteria.maxPrice)
  }

  if (criteria.minChange) {
    stockArray = stockArray.filter(s => s.changePercent >= criteria.minChange)
  }

  if (criteria.maxChange) {
    stockArray = stockArray.filter(s => s.changePercent <= criteria.maxChange)
  }

  // Sort by change%
  stockArray.sort((a, b) => b.changePercent - a.changePercent)

  return stockArray
}

export default {
  getStockQuote,
  getMultipleQuotes,
  searchStocks,
  getCompanyProfile,
  getStockNews,
  getEarnings,
  getIndianStocks,
  getChinaStocks,
  getGlobalStocks,
  getStocksBySector,
  getTrendingStocks,
  screenStocks,
}
