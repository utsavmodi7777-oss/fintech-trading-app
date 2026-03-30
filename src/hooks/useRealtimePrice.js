import { useState, useEffect } from 'react'

export const useRealTimePrice = (initialPrice, symbol) => {
  const [price, setPrice] = useState(initialPrice)
  const [priceHistory, setPriceHistory] = useState([initialPrice])

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prevPrice) => {
        // Realistic price movement: ±0.5% every second
        const change = (Math.random() - 0.5) * 0.01 * prevPrice
        const newPrice = Math.max(prevPrice + change, prevPrice * 0.8) // Prevent too much decline
        
        setPriceHistory((prev) => [...prev.slice(-59), newPrice]) // Keep last 60 prices
        return newPrice
      })
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  return { price, priceHistory }
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
