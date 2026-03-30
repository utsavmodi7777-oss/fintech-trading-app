import React from 'react'
import { ArrowUpRight, ArrowDownLeft, TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatDate, formatTime } from '../utils/formatting'
import { usePortfolio } from '../context/PortfolioContext'

const TransactionHistory = () => {
  const { portfolio } = usePortfolio()

  const sortedTransactions = [...portfolio.transactionHistory].sort((a, b) => b.date - a.date)

  return (
    <div className="card card-elevated p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg flex items-center justify-center">
          <TrendingUp size={24} className="text-primary-600" />
        </div>
        <h3 className="text-2xl font-manrope font-bold text-gray-900 dark:text-white">Transaction History</h3>
      </div>

      {sortedTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-700">
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Type</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Stock</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Quantity</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Price</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Total</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((txn, idx) => (
                <tr 
                  key={txn.id} 
                  className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all hover-lift p-4 ${idx < 5 ? `animate-slide-in-up delay-${idx * 50}` : ''}`}
                >
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        txn.type === 'BUY' 
                          ? 'bg-danger/10 text-danger' 
                          : 'bg-success/10 text-success'
                      }`}>
                        {txn.type === 'BUY' ? (
                          <ArrowDownLeft size={20} />
                        ) : (
                          <ArrowUpRight size={20} />
                        )}
                      </div>
                      <span className={`font-bold text-sm uppercase tracking-wider ${txn.type === 'BUY' ? 'text-danger' : 'text-success'}`}>
                        {txn.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <p className="font-bold text-gray-900 dark:text-white">{txn.symbol}</p>
                  </td>
                  <td className="py-5 px-4 text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">{txn.quantity}</p>
                  </td>
                  <td className="py-5 px-4 text-right">
                    <p className="text-gray-700 dark:text-gray-300">{formatCurrency(txn.price)}</p>
                  </td>
                  <td className={`py-5 px-4 text-right font-bold ${txn.type === 'BUY' ? 'text-danger' : 'text-success'}`}>
                    {txn.type === 'BUY' ? '-' : '+'}{formatCurrency(txn.total)}
                  </td>
                  <td className="py-5 px-4 text-sm">
                    <div className="font-semibold text-gray-900 dark:text-white">{formatDate(txn.date)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 font-medium">{formatTime(txn.date)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingDown size={32} className="text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">No transactions yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Start trading to see your transaction history</p>
        </div>
      )}
    </div>
  )
}

export default TransactionHistory
