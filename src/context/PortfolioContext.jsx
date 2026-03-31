import React, { createContext, useState, useCallback, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { fetchStockPrice, fetchMultipleStocks } from '../services/stockAPI'

export const PortfolioContext = createContext()

export const PortfolioProvider = ({ children }) => {
  const { user } = useAuth()
  
  const [portfolio, setPortfolio] = useState({
    balance: 500000,
    totalValue: 750000,
    investments: [],
    watchlist: [],
    transactionHistory: [],
  })

  const [stockPrices, setStockPrices] = useState({})
  const [isLoadingPrices, setIsLoadingPrices] = useState(false)
  const [lastPriceUpdate, setLastPriceUpdate] = useState(null)

  // Sync portfolio from logged-in user's data
  useEffect(() => {
    if (user && user.portfolio) {
      setPortfolio({
        balance: user.portfolio.balance || 500000,
        investments: user.portfolio.investments || [],
        watchlist: user.portfolio.watchlist || [],
        transactionHistory: user.portfolio.transactionHistory || [],
      })
    }
  }, [user])

  // Fetch real-time stock prices
  const refreshStockPrices = useCallback(async () => {
    setIsLoadingPrices(true)
    try {
      const symbols = portfolio.investments.map((inv) => inv.symbol)
      if (symbols.length > 0) {
        const prices = await fetchMultipleStocks(symbols)
        setStockPrices(prices)
        setLastPriceUpdate(new Date())
      }
    } catch (error) {
      console.error('Error refreshing stock prices:', error)
    } finally {
      setIsLoadingPrices(false)
    }
  }, [portfolio.investments])

  const [watchlist, setWatchlist] = useState(portfolio.watchlist)

  const addToWatchlist = useCallback((symbol) => {
    setWatchlist((prev) => {
      if (!prev.includes(symbol)) {
        return [...prev, symbol]
      }
      return prev
    })
  }, [])

  const removeFromWatchlist = useCallback((symbol) => {
    setWatchlist((prev) => prev.filter((s) => s !== symbol))
  }, [])

  const buyStock = useCallback((symbol, quantity, price) => {
    const cost = quantity * price
    if (portfolio.balance >= cost) {
      setPortfolio((prev) => ({
        ...prev,
        balance: prev.balance - cost,
        totalValue: prev.totalValue + cost,
        transactionHistory: [
          ...prev.transactionHistory,
          {
            id: Date.now(),
            type: 'BUY',
            symbol,
            quantity,
            price,
            date: new Date(),
            total: cost,
          },
        ],
      }))
      return true
    }
    return false
  }, [])

  const sellStock = useCallback((symbol, quantity, price) => {
    const revenue = quantity * price
    setPortfolio((prev) => ({
      ...prev,
      balance: prev.balance + revenue,
      totalValue: prev.totalValue - revenue,
      transactionHistory: [
        ...prev.transactionHistory,
        {
          id: Date.now(),
          type: 'SELL',
          symbol,
          quantity,
          price,
          date: new Date(),
          total: revenue,
        },
      ],
    }))
  }, [])

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        buyStock,
        sellStock,
        stockPrices,
        isLoadingPrices,
        refreshStockPrices,
        lastPriceUpdate,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = React.useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider')
  }
  return context
}
