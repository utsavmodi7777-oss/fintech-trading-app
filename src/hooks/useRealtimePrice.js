import { useState, useEffect } from 'react'
import { fetchStockPrice } from '../services/stockAPI'

export const useRealTimePrice = (initialPrice, symbol) => {
  const [price, setPrice] = useState(initialPrice)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [priceHistory, setPriceHistory] = useState([initialPrice])
  const [lastUpdate, setLastUpdate] = useState(null)

  // Fetch real stock price from API
  useEffect(() => {
    if (!symbol) return

    const fetchPrice = async () => {
      setLoading(true)
      try {
        const data = await fetchStockPrice(symbol)
        if (data && data.price) {
          setPrice(data.price)
          setPriceHistory((prev) => [...prev.slice(-59), data.price])
          setLastUpdate(new Date())
          setError(null)
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching price:', err)
      } finally {
        setLoading(false)
      }
    }

    // Fetch immediately on mount
    fetchPrice()

    // Then refresh every 5 minutes (to avoid API rate limits)
    const interval = setInterval(fetchPrice, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [symbol])

  return { price, priceHistory, loading, error, lastUpdate }
}

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

export const useDarkMode = () => {
  const [isDark, setIsDark] = useLocalStorage('fintech-dark-mode', false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggle = () => setIsDark(!isDark)

  return { isDark, toggle }
}
