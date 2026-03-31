// Stock API Service using Alpha Vantage
// Get free API key from: https://www.alphavantage.co/

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY || 'demo'; // User sets this in .env
const BASE_URL = 'https://www.alphavantage.co/query';

// Cache for API responses to avoid hitting rate limits
const priceCache = new Map();
const CACHE_DURATION = 60000; // 1 minute cache

/**
 * Fetch real-time stock price from Alpha Vantage API
 * @param {string} symbol - Stock symbol (e.g., 'AAPL', 'GOOGL')
 * @returns {Promise<Object>} Stock data
 */
export const fetchStockPrice = async (symbol) => {
  // Check cache first
  const cached = priceCache.get(symbol);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data['Error Message']) {
      console.error(`Error fetching ${symbol}:`, data['Error Message']);
      return null;
    }

    if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
      const quote = data['Global Quote'];
      const stockData = {
        symbol: quote['01. symbol'] || symbol,
        price: parseFloat(quote['05. price'] || 0),
        change: parseFloat(quote['09. change'] || 0),
        changePercent: parseFloat(quote['10. change percent']?.replace('%', '') || 0),
        high: parseFloat(quote['03. high'] || 0),
        low: parseFloat(quote['04. low'] || 0),
        open: parseFloat(quote['02. open'] || 0),
        volume: quote['06. volume'] || 'N/A',
        timestamp: quote['07. latest trading day'] || new Date().toLocaleDateString(),
      };

      // Cache the result
      priceCache.set(symbol, {
        data: stockData,
        timestamp: Date.now(),
      });

      return stockData;
    }

    return null;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
};

/**
 * Fetch intraday data for charts
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Array>} Chart data for last 30 days
 */
export const fetchIntradayData = async (symbol) => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data['Error Message'] || !data['Time Series (Daily)']) {
      return null;
    }

    const timeSeries = data['Time Series (Daily)'];
    const chartData = Object.entries(timeSeries)
      .slice(0, 30) // Last 30 days
      .reverse()
      .map(([date, values]) => ({
        date,
        price: parseFloat(values['4. close']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        open: parseFloat(values['1. open']),
        close: parseFloat(values['4. close']),
        volume: values['6. volume'],
      }));

    return chartData;
  } catch (error) {
    console.error('Error fetching intraday data:', error);
    return null;
  }
};

/**
 * Fetch multiple stocks in batch
 * @param {Array<string>} symbols - Array of stock symbols
 * @returns {Promise<Object>} Map of symbol to stock data
 */
export const fetchMultipleStocks = async (symbols) => {
  const results = {};

  // Alpha Vantage has rate limits, so we'll fetch with delay
  for (const symbol of symbols) {
    const data = await fetchStockPrice(symbol);
    results[symbol] = data;
    // Add small delay to avoid hitting rate limits
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return results;
};

/**
 * Search for stocks by keyword
 * @param {string} keyword - Search keyword
 * @returns {Promise<Array>} Array of matching stocks
 */
export const searchStocks = async (keyword) => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (!data['bestMatches']) {
      return [];
    }

    return data['bestMatches'].map((match) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
    }));
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
};

/**
 * Get company overview
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} Company information
 */
export const fetchCompanyOverview = async (symbol) => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data['Error Message']) {
      return null;
    }

    return {
      symbol: data['Symbol'],
      name: data['Name'],
      description: data['Description'],
      sector: data['Sector'],
      industry: data['Industry'],
      marketCap: data['MarketCapitalization'],
      pe: data['PERatio'],
      eps: data['EPS'],
      high52w: data['52WeekHigh'],
      low52w: data['52WeekLow'],
      dividendYield: data['DividendYield'],
    };
  } catch (error) {
    console.error('Error fetching company overview:', error);
    return null;
  }
};

/**
 * Clear API cache
 */
export const clearPriceCache = () => {
  priceCache.clear();
};

/**
 * Check if API key is configured
 */
export const isAPIKeyConfigured = () => {
  return API_KEY && API_KEY !== 'demo';
};
