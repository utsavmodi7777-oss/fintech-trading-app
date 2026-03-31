import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { formatCurrency, formatPercentage } from '../utils/formatting'
import { getIndianStocks } from '../services/finnhubAPI'

const IndiaStocksPage = ({ currentPage, setCurrentPage }) => {
  const [indianStocks, setIndianStocks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadIndianStocks()
  }, [])

  const loadIndianStocks = async () => {
    setIsLoading(true)
    try {
      const data = await getIndianStocks()
      const stockArray = Object.values(data).filter((s) => s !== null)
      setIndianStocks(stockArray)
      console.log('🇮🇳 Loaded Indian stocks:', stockArray)
    } catch (error) {
      console.error('Error loading Indian stocks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Sample Sensex and Nifty data
  const sensexData = {
    name: 'BSE Sensex',
    points: 75432.50,
    change: 1245.30,
    changePercent: 1.68,
    components: 30,
  }

  const niftyData = {
    name: 'Nifty 50',
    points: 23145.80,
    change: 392.15,
    changePercent: 1.72,
    components: 50,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-manrope font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              🇮🇳 Indian Stock Market
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time data from NSE (National Stock Exchange) and BSE
          </p>
        </div>

        {/* Indices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-in-up">
          {/* Sensex */}
          <div className="card card-elevated p-8 hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-manrope font-bold text-gray-900 dark:text-white mb-1">
                  {sensexData.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">BSE 30 Index</p>
              </div>
              {sensexData.changePercent >= 0 ? (
                <TrendingUp size={32} className="text-success" />
              ) : (
                <TrendingDown size={32} className="text-danger" />
              )}
            </div>

            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-5xl font-manrope font-bold text-gray-900 dark:text-white">
                {sensexData.points.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className={`text-lg font-bold ${sensexData.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                  {sensexData.changePercent >= 0 ? '+' : ''}{sensexData.change.toFixed(2)}
                </span>
                <span className={`text-lg font-bold ${sensexData.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                  ({sensexData.changePercent >= 0 ? '+' : ''}{sensexData.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              📊 {sensexData.components} stocks | Market Cap: Largest companies
            </p>
          </div>

          {/* Nifty 50 */}
          <div className="card card-elevated p-8 hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-manrope font-bold text-gray-900 dark:text-white mb-1">
                  {niftyData.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">NSE Index</p>
              </div>
              {niftyData.changePercent >= 0 ? (
                <TrendingUp size={32} className="text-success" />
              ) : (
                <TrendingDown size={32} className="text-danger" />
              )}
            </div>

            <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-5xl font-manrope font-bold text-gray-900 dark:text-white">
                {niftyData.points.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className={`text-lg font-bold ${niftyData.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                  {niftyData.changePercent >= 0 ? '+' : ''}{niftyData.change.toFixed(2)}
                </span>
                <span className={`text-lg font-bold ${niftyData.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                  ({niftyData.changePercent >= 0 ? '+' : ''}{niftyData.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              📊 {niftyData.components} stocks | Broad market index
            </p>
          </div>
        </div>

        {/* Stocks List */}
        <div className="mb-8">
          <h2 className="text-2xl font-manrope font-bold text-gray-900 dark:text-white mb-6">
            Top Indian Stocks (NSE)
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse bg-gray-200 dark:bg-gray-800 h-40 rounded-lg" />
              ))}
            </div>
          ) : indianStocks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in-up">
              {indianStocks.map((stock) => {
                const isPositive = stock.changePercent >= 0

                return (
                  <div
                    key={stock.symbol}
                    className="card card-elevated p-6 hover-lift transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white">
                          {stock.symbol.replace('.NS', '')}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">NSE Listed</p>
                      </div>
                      {isPositive ? (
                        <TrendingUp size={20} className="text-success" />
                      ) : (
                        <TrendingDown size={20} className="text-danger" />
                      )}
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-2xl font-manrope font-bold text-gray-900 dark:text-white">
                        ₹{stock.price?.toFixed(2) || 'N/A'}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-sm font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
                          {isPositive ? '+' : ''}{formatPercentage(stock.changePercent)}
                        </span>
                        <span className={`text-xs font-medium ${isPositive ? 'text-success/60' : 'text-danger/60'}`}>
                          {isPositive ? '+' : ''}₹{stock.change?.toFixed(2) || '0'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      <div className="bg-gray-50 dark:bg-gray-900/30 p-2 rounded">
                        <p className="text-gray-600 dark:text-gray-400 font-semibold">High</p>
                        <p className="font-bold">₹{stock.high?.toFixed(2) || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900/30 p-2 rounded">
                        <p className="text-gray-600 dark:text-gray-400 font-semibold">Low</p>
                        <p className="font-bold">₹{stock.low?.toFixed(2) || 'N/A'}</p>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95">
                      Trade Now
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">Failed to load stocks. Please refresh.</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="card card-elevated p-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">📈 About Indian Stock Market</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            The NSE (National Stock Exchange) and BSE (Bombay Stock Exchange) are India's largest stock exchanges.
            The Nifty 50 is the primary index for NSE, while Sensex is the flagship index of BSE. Both indices track the
            performance of the top 30-50 companies in India across various sectors.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default IndiaStocksPage
