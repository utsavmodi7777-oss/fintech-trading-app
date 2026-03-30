import React, { useState } from 'react'
import { Plus, Minus, Wallet } from 'lucide-react'
import { formatCurrency } from '../utils/formatting'
import { usePortfolio } from '../context/PortfolioContext'
import { useNotification } from '../context/NotificationContext'

const WalletSection = () => {
  const { portfolio } = usePortfolio()
  const { addNotification } = useNotification()
  const [addFundsAmount, setAddFundsAmount] = useState('')

  const handleAddFunds = () => {
    if (!addFundsAmount || parseFloat(addFundsAmount) <= 0) {
      addNotification('Please enter a valid amount', 'error')
      return
    }

    // In real app, this would integrate with payment gateway
    addNotification(`Successfully added ${formatCurrency(parseFloat(addFundsAmount))} to wallet`, 'success')
    setAddFundsAmount('')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Balance Card */}
      <div className="card card-elevated p-8 bg-gradient-to-br from-primary-500/10 to-primary-600/10 border border-primary-200 dark:border-primary-800 hover-lift">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Wallet size={28} className="text-white" />
          </div>
          <h3 className="text-2xl font-manrope font-bold text-gray-900 dark:text-white">My Wallet</h3>
        </div>
        
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">Available Balance</p>
          <h2 className="text-5xl font-manrope font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-8">
            {formatCurrency(portfolio.balance)}
          </h2>

          <div className="space-y-3 pt-6 border-t border-primary-200 dark:border-primary-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              💡 Keep funds ready for great trading opportunities!
            </p>
          </div>
        </div>
      </div>

      {/* Add Funds Card */}
      <div className="card card-elevated p-8">
        <h3 className="text-2xl font-manrope font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Plus size={24} className="text-primary-500" />
          Add Funds
        </h3>

        <div className="space-y-5">
          <input
            type="number"
            placeholder="Enter amount"
            value={addFundsAmount}
            onChange={(e) => setAddFundsAmount(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all placeholder:text-gray-400"
          />

          {addFundsAmount && (
            <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-lg p-4 animate-scale-in">
              <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">You will add</p>
              <p className="text-3xl font-manrope font-bold text-primary-600 dark:text-primary-400">
                {formatCurrency(parseFloat(addFundsAmount) || 0)}
              </p>
            </div>
          )}

          <button 
            onClick={handleAddFunds} 
            className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 hover:shadow-lg shadow-primary-500/30 active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Funds
          </button>

          {/* Quick Add Buttons */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Quick Add</p>
            <div className="grid grid-cols-3 gap-2">
              {[1000, 5000, 10000].map((amount, idx) => (
                <button
                  key={amount}
                  onClick={() => setAddFundsAmount(amount.toString())}
                  className={`px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold text-sm transition-all transform hover:scale-105 hover:shadow-md active:scale-95`}
                >
                  +${(amount / 1000).toFixed(0)}K
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletSection
