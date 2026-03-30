import React from 'react'
import { Star, TrendingUp, TrendingDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import { usePortfolio } from '../context/PortfolioContext'
import { STOCK_DATA } from '../data/stocks'
import { formatCurrency, formatPercentage } from '../utils/formatting'

const WatchlistPage = ({ currentPage, setCurrentPage }) => {
  const { watchlist, removeFromWatchlist } = usePortfolio()

  const watchlistStocks = watchlist
    .map((symbol) => STOCK_DATA[symbol])
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-manrope font-bold text-gray-900 dark:text-white mb-2">
            My Watchlist
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {watchlistStocks.length} stocks in your watchlist
          </p>
        </div>

        {watchlistStocks.length > 0 ? (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Stock</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">Price</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">Change</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">Change %</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">52W High</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">52W Low</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {watchlistStocks.map((stock) => (
                  <tr key={stock.symbol} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(stock.price)}
                    </td>
                    <td className={`py-4 px-6 text-right font-semibold ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                      {stock.change >= 0 ? '+' : ''}{formatCurrency(stock.change)}
                    </td>
                    <td className={`py-4 px-6 text-right font-semibold ${stock.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                      <div className="flex items-center justify-end gap-1">
                        {stock.changePercent >= 0 ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}
                        {formatPercentage(stock.changePercent)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-gray-900 dark:text-white">
                      {formatCurrency(stock.high52w)}
                    </td>
                    <td className="py-4 px-6 text-right text-gray-900 dark:text-white">
                      {formatCurrency(stock.low52w)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => removeFromWatchlist(stock.symbol)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                      >
                        <Star className="fill-warning text-warning" size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card p-12 text-center">
            <Star size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white mb-2">
              Your watchlist is empty
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Add stocks to your watchlist to track them
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default WatchlistPage
