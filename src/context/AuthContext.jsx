import React, { createContext, useState, useContext, useCallback, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Try to restore user from localStorage on mount
  useEffect(() => {
    // Initialize demo user account
    const demoEmail = 'utsav@gmail.com'
    const demoPassword = 'utsav123'
    const demoUserKey = `fintech_user_${demoEmail}`
    
    const demoUser = {
      id: 'demo_user_001',
      email: demoEmail,
      name: 'Utsav',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Utsav`,
      createdAt: new Date().toISOString(),
      portfolio: {
        balance: 450000,
        investments: [
          { symbol: 'AAPL', quantity: 50, buyPrice: 150.25, currentPrice: 165.50, sector: 'Technology' },
          { symbol: 'GOOGL', quantity: 30, buyPrice: 140.75, currentPrice: 155.30, sector: 'Technology' },
          { symbol: 'MSFT', quantity: 40, buyPrice: 380.50, currentPrice: 420.80, sector: 'Technology' },
          { symbol: 'TSLA', quantity: 20, buyPrice: 250.00, currentPrice: 285.60, sector: 'Automotive' },
          { symbol: 'AMZN', quantity: 25, buyPrice: 175.50, currentPrice: 195.75, sector: 'E-commerce' },
        ],
        watchlist: ['NFLX', 'META', 'NVIDIA', 'AMD', 'INTC'],
        transactionHistory: [
          { type: 'BUY', symbol: 'AAPL', quantity: 50, price: 150.25, date: '2024-01-15' },
          { type: 'BUY', symbol: 'GOOGL', quantity: 30, price: 140.75, date: '2024-01-20' },
          { type: 'BUY', symbol: 'MSFT', quantity: 40, price: 380.50, date: '2024-02-10' },
          { type: 'BUY', symbol: 'TSLA', quantity: 20, price: 250.00, date: '2024-02-15' },
          { type: 'BUY', symbol: 'AMZN', quantity: 25, price: 175.50, date: '2024-03-01' },
        ],
      },
    }
    
    // Always ensure demo account credentials are stored
    localStorage.setItem(demoUserKey, JSON.stringify({ password: demoPassword }))
    localStorage.setItem('fintech_user_data_' + demoEmail, JSON.stringify(demoUser))

    const savedUser = localStorage.getItem('fintech_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (err) {
        console.error('Failed to restore user:', err)
      }
    }
    setIsLoading(false)
  }, [])

  const signup = useCallback(async (email, password, name) => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        createdAt: new Date().toISOString(),
        portfolio: {
          balance: 500000,
          investments: [],
          watchlist: ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'],
          transactionHistory: [],
        },
      }

      localStorage.setItem('fintech_user', JSON.stringify(newUser))
      localStorage.setItem(`fintech_user_${email}`, JSON.stringify({ password }))
      setUser(newUser)
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call
      const userKey = `fintech_user_${email}`
      const savedCredentials = localStorage.getItem(userKey)

      if (!savedCredentials) {
        throw new Error('User not found')
      }

      const credentials = JSON.parse(savedCredentials)
      if (credentials.password !== password) {
        throw new Error('Invalid password')
      }

      // Get full user data - first check 'fintech_user', then 'fintech_user_data_${email}'
      let fullUser = JSON.parse(localStorage.getItem('fintech_user') || '{}')
      
      if (!fullUser.email || fullUser.email !== email) {
        // Try to get from fintech_user_data_{email}
        const userDataStr = localStorage.getItem(`fintech_user_data_${email}`)
        if (!userDataStr) {
          throw new Error('User data not found')
        }
        fullUser = JSON.parse(userDataStr)
      }

      localStorage.setItem('fintech_user', JSON.stringify(fullUser))
      setUser(fullUser)
      return fullUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('fintech_user')
    setUser(null)
    setError(null)
  }, [])

  const updateProfile = useCallback((updates) => {
    const updatedUser = { ...user, ...updates }
    localStorage.setItem('fintech_user', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }, [user])

  const value = {
    user,
    isLoading,
    error,
    signup,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
