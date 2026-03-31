# Real-Time Stock API Integration Guide

## Overview

FinTrade now supports **real-time stock price updates** using the **Alpha Vantage API**. This allows users to:
- ✅ See live stock prices (updated every 5 minutes)
- ✅ Monitor price changes in real-time
- ✅ Refresh prices manually anytime
- ✅ Get accurate portfolio valuations

---

## Setup Instructions

### 1️⃣ Get a Free API Key

1. Visit [Alpha Vantage](https://www.alphavantage.co/) website
2. Click "GET FREE API KEY" button
3. Sign up with your email
4. Copy your API key (you'll receive it via email or on the dashboard)

**Note**: Free tier includes:
- **5 API requests per minute**
- **500 requests per day**
- **Sufficient for personal use**

### 2️⃣ Add API Key to Your Environment

#### Option A: Using .env file (Recommended)

1. Create a `.env` file in the project root (already created)
2. Add this line:
   ```
   VITE_ALPHA_VANTAGE_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with your actual API key from Alpha Vantage

#### Option B: Using .env.local (For Local Development)

1. Create a `.env.local` file in the project root
2. Add:
   ```
   VITE_ALPHA_VANTAGE_KEY=your_api_key_here
   ```

### 3️⃣ Restart Development Server

```bash
npm run dev
```

The development server will automatically load the .env file.

---

## Usage

### Dashboard - Refresh Prices

On the Dashboard page, you'll see a **"Refresh Prices"** button:

```
[🔄 Refresh Prices] [⚡ Updated 2m ago]
```

Click this button to:
- Fetch latest prices from Alpha Vantage API
- Update all portfolio stocks with current prices
- Show last update timestamp

### Real-Time Updates

- **Automatic**: Prices refresh every 5 minutes automatically
- **Manual**: Click "Refresh Prices" button anytime
- **Indicators**:
  - 🟢 Green = Price increased
  - 🔴 Red = Price decreased
  - 📊 Shows exact change amount and percentage

### API Configuration Status

The Dashboard shows an **API Status Card**:
- ✅ **Green**: API is configured and working
- ⚠️ **Yellow**: API key not configured (using demo mode)

In demo mode, you'll see sample data, but to get real prices, you must configure your API key.

---

## Features Implementation

### 1. Stock Price Service (`src/services/stockAPI.js`)

```javascript
// Fetch single stock price
const price = await fetchStockPrice('AAPL')
// Returns: { symbol, price, change, changePercent, high, low, ...}

// Fetch multiple stocks
const prices = await fetchMultipleStocks(['AAPL', 'GOOGL', 'MSFT'])

// Search for stocks
const results = await searchStocks('Apple')

// Get company overview
const overview = await fetchCompanyOverview('AAPL')
```

### 2. Portfolio Context Integration

```javascript
// In any component:
const { refreshStockPrices, isLoadingPrices, lastPriceUpdate } = usePortfolio()

// Refresh prices
await refreshStockPrices()

// Check if loading
if (isLoadingPrices) { /* show loading... */ }

// Show last update time
console.log(lastPriceUpdate) // DateTime object
```

### 3. Price Caching

To avoid hitting API rate limits:
- Prices are cached for **1 minute**
- Same stock requested multiple times uses cached data
- Cache automatically cleared after 1 minute
- Manual refresh clears all caches immediately

### 4. Real-Time Hook (`useRealTimePrice`)

```javascript
// Get real-time price for a specific stock
const { price, loading, error, lastUpdate } = useRealTimePrice(initialPrice, 'AAPL')

// Automatically fetches on component mount
// Updates every 5 minutes
```

---

## API Response Format

### Stock Price Response
```javascript
{
  symbol: "AAPL",
  price: 175.43,
  change: 2.15,
  changePercent: 1.24,
  high: 176.50,
  low: 173.20,
  open: 173.50,
  volume: "52500000",
  timestamp: "2024-03-31"
}
```

---

## Troubleshooting

### ❌ "API key not configured"

**Problem**: Yellow warning card saying API is not configured

**Solution**:
1. Check if `.env` file exists in project root
2. Verify it contains: `VITE_ALPHA_VANTAGE_KEY=your_key`
3. Restart dev server: `npm run dev`
4. Clear browser cache (Ctrl+Shift+Del)

### ❌ "API limit exceeded"

**Problem**: Getting "API limit exceeded" errors

**Solution**:
- Free tier has 5 requests/minute limit
- Wait 1 minute and try again
- Alternatively, upgrade to paid plan on Alpha Vantage

### ❌ "Prices not updating"

**Problem**: Prices show as "N/A" or don't change

**Solution**:
1. Check your API key is valid
2. Verify market is open (9:30 AM - 4:00 PM EST)
3. Try different stock symbol (e.g., AAPL instead of custom ticker)
4. Check browser console for errors

### ❌ CORS Errors

**Problem**: Getting CORS (Cross-Origin) errors

**Solution**:
- Alpha Vantage supports CORS by default
- If error persists, try incognito/private browsing
- Check your internet connection

---

## Upgrading to Paid Plan

Alpha Vantage offers paid plans for:
- **Unlimited API calls**
- **Real-time data** (intraday)
- **Extended data retention**
- **Priority support**

See: https://www.alphavantage.co/premium/

---

## Alternative APIs

If you want to use a different API provider:

### Finnhub (https://finnhub.io/)
- Free tier: 60 API calls/minute
- Real-time prices
- Limited free access

### Polygon.io (https://polygon.io/)
- Good for crypto + stocks
- Free tier available
- Requires API key

### IEX Cloud (https://iexcloud.io/)
- Reliable stock data
- Free tier limited

---

## Next Steps

1. ✅ Set up API key
2. ✅ Test with one stock (AAPL)
3. ✅ Check Dashboard for live prices
4. ✅ Try manual refresh
5. ✅ Add more stocks to portfolio

---

## Contact & Support

For API issues:
- Alpha Vantage: https://www.alphavantage.co/support/
- FinTrade Support: support@fintrade.com

For code issues:
- Create an issue on GitHub
- Check existing issues first
