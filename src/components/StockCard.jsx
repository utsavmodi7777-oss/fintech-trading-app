import React from 'react'
import { TrendingUp, TrendingDown, Star } from 'lucide-react'
import { formatCurrency, formatPercentage } from '../utils/formatting'
import { usePortfolio } from '../context/PortfolioContext'

const StockCard = ({ stock, onBuySell }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = usePortfolio()
  const isWatched = watchlist.includes(stock.symbol)
  const isPositive = stock.change >= 0

  return (
    <div className="card card-elevated p-6 hover-lift transition-all group">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{stock.name}</p>
          <h4 className="text-xl font-manrope font-bold text-gray-900 dark:text-white">{stock.symbol}</h4>
        </div>
        <button
          onClick={() => isWatched ? removeFromWatchlist(stock.symbol) : addToWatchlist(stock.symbol)}
          className="p-2 hover:bg-warning/20 dark:hover:bg-warning/10 rounded-lg transition-all hover-lift"
        >
          <Star
            size={20}
            className={isWatched ? 'fill-warning text-warning animate-glow' : 'text-gray-400 dark:text-gray-600 group-hover:text-warning'}
          />
        </button>
      </div>

      {/* Price & Change */}
      <div className="mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
        <p className="text-3xl font-manrope font-bold text-gray-900 dark:text-white">
          {formatCurrency(stock.price)}
        </p>
        <div className="flex items-center gap-2 mt-3">
          {isPositive ? (
            <TrendingUp size={18} className="text-success animate-float" />
          ) : (
            <TrendingDown size={18} className="text-danger animate-float" />
          )}
          <span className={`text-sm font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? '+' : ''}{formatPercentage(stock.changePercent)}
          </span>
          <span className={`text-sm font-medium ${isPositive ? 'text-success/60' : 'text-danger/60'}`}>
            {isPositive ? '+' : ''}{formatCurrency(stock.change)}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold mb-1">Market Cap</p>
          <p className="font-bold text-gray-900 dark:text-white">{stock.marketCap}</p>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold mb-1">P/E Ratio</p>
          <p className="font-bold text-gray-900 dark:text-white">{stock.pe}</p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onBuySell(stock)}
        className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 hover:shadow-lg shadow-primary-500/30 active:scale-95"
      >
        Buy Now
      </button>
    </div>
  )
}

export default StockCard
