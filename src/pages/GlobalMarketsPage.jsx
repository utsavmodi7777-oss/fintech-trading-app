import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Globe, Search, Briefcase } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { formatCurrency, formatPercentage } from '../utils/formatting'
import {
  getGlobalStocks,
  searchStocks,
  getTrendingStocks,
  getStocksBySector,
} from '../services/finnhubAPI'

const GlobalMarketsPage = ({ currentPage, setCurrentPage }) => {
  const [selectedTab, setSelectedTab] = useState('global')
  const [stocks, setStocks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedSector, setSelectedSector] = useState('technology')

  // Fetch stocks data
  useEffect(() => {
    loadStocks()
  }, [selectedTab, selectedSector])

  const loadStocks = async () => {
    setIsLoading(true)
    try {
      let data = []

      if (selectedTab === 'global') {
        data = await getGlobalStocks()
      } else if (selectedTab === 'trending') {
        data = await getTrendingStocks()
      } else if (selectedTab === 'sector') {
        data = await getStocksBySector(selectedSector)
      }

      const stockArray = Object.values(data).filter((s) => s !== null)
      setStocks(stockArray)
      console.log(`📊 Loaded ${stockArray.length} stocks:`, stockArray)
    } catch (error) {
      console.error('Error loading stocks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.length > 1) {
      const results = await searchStocks(query)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const sectors = ['technology', 'finance', 'healthcare', 'energy', 'automotive', 'ecommerce']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-manrope font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Global Markets
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time stock data from markets worldwide
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 card card-elevated p-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks by symbol or name... (e.g., AAPL, Apple)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {searchResults.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => {
                    setSearchQuery(stock.symbol)
                    setSearchResults([])
                  }}
                  className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-all text-sm font-medium"
                >
                  <p className="font-bold text-gray-900 dark:text-white">{stock.symbol}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{stock.description}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {['global', 'trending', 'sector'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedTab === tab
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              {tab === 'global' && '🌐 Global'}
              {tab === 'trending' && '📈 Trending'}
              {tab === 'sector' && '🏢 By Sector'}
            </button>
          ))}
        </div>

        {/* Sector Selector */}
        {selectedTab === 'sector' && (
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  selectedSector === sector
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        )}

        {/* Stocks Grid */}
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
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white">
                        {stock.symbol}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stock.symbol.includes('NS') ? '🇮🇳' : stock.symbol.includes('.HK') ? '🇭🇰' : '🌍'}
                      </p>
                    </div>
                    {isPositive ? (
                      <TrendingUp size={24} className="text-success" />
                    ) : (
                      <TrendingDown size={24} className="text-danger" />
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-3xl font-manrope font-bold text-gray-900 dark:text-white">
                      {formatCurrency(stock.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-sm font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
                        {isPositive ? '+' : ''}{formatPercentage(stock.changePercent)}
                      </span>
                      <span className={`text-sm font-medium ${isPositive ? 'text-success/60' : 'text-danger/60'}`}>
                        {isPositive ? '+' : ''}{formatCurrency(stock.change)}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-gray-50 dark:bg-gray-900/30 p-2 rounded">
                      <p className="text-gray-600 dark:text-gray-400 font-semibold">High</p>
                      <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(stock.high)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/30 p-2 rounded">
                      <p className="text-gray-600 dark:text-gray-400 font-semibold">Low</p>
                      <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(stock.low)}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95">
                    View Details
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No stocks found. Try searching or switching tabs.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default GlobalMarketsPage
