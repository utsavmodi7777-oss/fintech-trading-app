import React, { useState } from 'react'
import { X } from 'lucide-react'
import { formatCurrency } from '../utils/formatting'
import { usePortfolio } from '../context/PortfolioContext'
import { useNotification } from '../context/NotificationContext'

const BuySellModal = ({ stock, type = 'BUY', onClose }) => {
  const { portfolio, buyStock, sellStock } = usePortfolio()
  const { addNotification } = useNotification()
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(stock.price)
  const [error, setError] = useState('')

  const total = quantity * price
  const isAffordable = portfolio.balance >= total || type === 'SELL'

  const handleSubmit = (e) => {
    e.preventDefault()

    if (quantity <= 0) {
      setError('Quantity must be greater than 0')
      return
    }

    if (type === 'BUY') {
      if (!isAffordable) {
        setError('Insufficient balance')
        addNotification('Insufficient balance to complete this purchase', 'error')
        return
      }
      buyStock(stock.symbol, quantity, price)
      addNotification(`Successfully bought ${quantity} shares of ${stock.symbol}`, 'success')
    } else {
      sellStock(stock.symbol, quantity, price)
      addNotification(`Successfully sold ${quantity} shares of ${stock.symbol}`, 'success')
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass-lg max-w-md w-full animate-scale-in">
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-white/10">
          <h2 className="text-2xl font-manrope font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
            {type} {stock.symbol}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors hover-lift">
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Stock Info */}
          <div className="glass-sm p-4 mb-6 space-y-2">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stock.name}</p>
            <p className="text-3xl font-manrope font-bold text-gray-900 dark:text-white">
              {formatCurrency(stock.price)}
            </p>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Price per Share
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || stock.price)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-lg p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 font-medium">Total Amount</p>
            <p className="text-3xl font-manrope font-bold text-primary-600 dark:text-primary-400">
              {formatCurrency(total)}
            </p>
          </div>

          {/* Available Balance */}
          <div className="text-sm space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              Available Balance: <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(portfolio.balance)}</span>
            </p>
            {type === 'BUY' && (
              <p className={`font-medium ${isAffordable ? 'text-success' : 'text-danger'}`}>
                {isAffordable ? '✓ Sufficient balance' : '✗ Insufficient balance'}
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-danger/10 border border-danger/30 text-danger px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-900 dark:text-white rounded-lg font-semibold transition-all hover-lift"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isAffordable && type === 'BUY'}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                type === 'BUY'
                  ? 'bg-gradient-to-r from-success to-success/80 hover:shadow-lg shadow-success/30'
                  : 'bg-gradient-to-r from-danger to-danger/80 hover:shadow-lg shadow-danger/30'
              }`}
            >
              {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BuySellModal
