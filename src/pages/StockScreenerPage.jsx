import React, { useState } from 'react'
import { Filter, TrendingUp, TrendingDown, Sliders } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { formatCurrency, formatPercentage } from '../utils/formatting'
import { screenStocks, getTrendingStocks } from '../services/finnhubAPI'

const StockScreenerPage = ({ currentPage, setCurrentPage }) => {
  const [stocks, setStocks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState('market')

  // Filter criteria
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minChange: '',
    maxChange: '',
  })

  // Load stocks by filter
  const loadStocks = async (filterType) => {
    setIsLoading(true)
    try {
      let data = []

      if (filterType === 'market') {
        data = await getTrendingStocks()
      } else if (filterType === 'gainers') {
        data = await screenStocks({ minChange: 1 })
      } else if (filterType === 'losers') {
        data = await screenStocks({ maxChange: -1 })
      } else if (filterType === 'custom') {
        const criteria = {}
        if (filters.minPrice) criteria.minPrice = parseFloat(filters.minPrice)
        if (filters.maxPrice) criteria.maxPrice = parseFloat(filters.maxPrice)
        if (filters.minChange) criteria.minChange = parseFloat(filters.minChange)
        if (filters.maxChange) criteria.maxChange = parseFloat(filters.maxChange)
        data = await screenStocks(criteria)
      }

      const stockArray = Object.values(data).filter((s) => s !== null)
      setStocks(stockArray)
      console.log(`📊 Screened stocks: ${stockArray.length}`, stockArray)
    } catch (error) {
      console.error('Error screening stocks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType)
    loadStocks(filterType)
  }

  const handleCustomFilter = () => {
    handleFilterClick('custom')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Sliders className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-manrope font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Stock Screener
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Find stocks that match your investment criteria
          </p>
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 animate-slide-in-up">
          {[
            { name: 'market', label: '📊 All Stocks', icon: '📈' },
            { name: 'gainers', label: '📈 Top Gainers', icon: '🟢' },
            { name: 'losers', label: '📉 Top Losers', icon: '🔴' },
            { name: 'custom', label: '⚙️ Custom Filter', icon: '🎛️' },
          ].map((filter) => (
            <button
              key={filter.name}
              onClick={() => handleFilterClick(filter.name)}
              className={`p-4 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 ${
                activeFilter === filter.name
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-xl mb-1">{filter.icon}</div>
              <div className="text-sm">{filter.label}</div>
            </button>
          ))}
        </div>

        {/* Custom Filter Panel */}
        <div className="card card-elevated p-6 mb-8">
          <h2 className="text-xl font-manrope font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Custom Filter
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                placeholder="0"
                value={filters.minPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                placeholder="999999"
                value={filters.maxPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Min Change %
              </label>
              <input
                type="number"
                name="minChange"
                placeholder="-100"
                value={filters.minChange}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Max Change %
              </label>
              <input
                type="number"
                name="maxChange"
                placeholder="100"
                value={filters.maxChange}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
          </div>

          <button
            onClick={handleCustomFilter}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
          >
            Search Stocks
          </button>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-2xl font-manrope font-bold text-gray-900 dark:text-white mb-4">
            {stocks.length} Stocks Found
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse bg-gray-200 dark:bg-gray-800 h-40 rounded-lg" />
              ))}
            </div>
          ) : stocks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in-up">
              {stocks.map((stock) => {
                const isPositive = stock.changePercent >= 0

                return (
                  <div
                    key={stock.symbol}
                    className="card card-elevated p-6 hover-lift transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white">
                          {stock.symbol}
                        </h3>
                      </div>
                      {isPositive ? (
                        <span className="px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-full flex items-center gap-1">
                          <TrendingUp size={14} /> Gainer
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-danger/10 text-danger text-xs font-bold rounded-full flex items-center gap-1">
                          <TrendingDown size={14} /> Loser
                        </span>
                      )}
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-3xl font-manrope font-bold text-gray-900 dark:text-white">
                        {formatCurrency(stock.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-sm font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
                          {isPositive ? '+' : ''}{formatPercentage(stock.changePercent)}
                        </span>
                        <span className={`text-sm ${isPositive ? 'text-success/60' : 'text-danger/60'}`}>
                          {isPositive ? '+' : ''}{formatCurrency(stock.change)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      <div className="bg-gray-50 dark:bg-gray-900/30 p-2 rounded">
                        <p className="text-gray-600 dark:text-gray-400 font-semibold">52W High</p>
                        <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(stock.high)}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900/30 p-2 rounded">
                        <p className="text-gray-600 dark:text-gray-400 font-semibold">52W Low</p>
                        <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(stock.low)}</p>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95">
                      View Analysis
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 card card-elevated p-8">
              <Sliders className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No stocks found matching your criteria. Try adjusting your filter settings.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default StockScreenerPage
