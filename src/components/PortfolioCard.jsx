import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency, formatPercentage } from '../utils/formatting'
import { usePortfolio } from '../context/PortfolioContext'

const PortfolioCard = () => {
  const { portfolio } = usePortfolio()

  const totalInvestedValue = useMemo(() => {
    return portfolio.investments.reduce((acc, inv) => acc + inv.quantity * inv.buyPrice, 0)
  }, [portfolio.investments])

  const totalCurrentValue = useMemo(() => {
    return portfolio.investments.reduce((acc, inv) => acc + inv.quantity * inv.currentPrice, 0)
  }, [portfolio.investments])

  const totalProfit = totalCurrentValue - totalInvestedValue
  const profitPercentage = (totalProfit / totalInvestedValue) * 100

  const pieData = portfolio.investments.map((inv) => ({
    name: inv.symbol,
    value: inv.quantity * inv.currentPrice,
  }))

  const COLORS = ['#7180BF', '#c6ccef', '#a5b1e8', '#8a98d9', '#6f7dca']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left - Stats */}
      <div className="card card-elevated p-6 hover-lift">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white">Portfolio Overview</h3>
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
        </div>

        <div className="space-y-5">
          {/* Balance */}
          <div className="pb-5 border-b border-gray-300 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 font-medium">Available Balance</p>
            <p className="text-4xl font-manrope font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              {formatCurrency(portfolio.balance)}
            </p>
          </div>

          {/* Total Value */}
          <div className="pb-5 border-b border-gray-300 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 font-medium">Portfolio Value</p>
            <p className="text-4xl font-manrope font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalCurrentValue)}
            </p>
          </div>

          {/* Total Profit/Loss */}
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 font-medium">Total Gain/Loss</p>
            <div className="flex items-end gap-3">
              <p className={`text-4xl font-manrope font-bold ${totalProfit >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatCurrency(totalProfit)}
              </p>
              <p className={`text-lg font-bold mb-2 ${totalProfit >= 0 ? 'text-success' : 'text-danger'}`}>
                ({formatPercentage(profitPercentage)})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Allocation Pie Chart */}
      <div className="card card-elevated p-6 hover-lift">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white">Asset Allocation</h3>
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${((value / totalCurrentValue) * 100).toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PortfolioCard
