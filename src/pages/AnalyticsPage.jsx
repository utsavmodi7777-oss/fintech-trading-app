import React, { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ExportButton from '../components/ExportButton'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import { usePortfolio } from '../context/PortfolioContext'
import { TrendingUp, TrendingDown, AlertCircle, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Download } from 'lucide-react'
import { exportAnalyticsCSV } from '../services/csvExport'
import { exportAnalyticsPDF } from '../services/pdfExport'

const AnalyticsPage = ({ setCurrentPage, currentPage }) => {
  const { portfolio } = usePortfolio()
  const [chartView, setChartView] = useState('detailed')

  const handleExportAnalyticsCSV = async () => {
    const analyticsData = {
      'Total Invested': portfolio.investments.reduce((acc, s) => acc + s.buyPrice * s.quantity, 0),
      'Current Value': portfolio.investments.reduce((acc, s) => acc + s.currentPrice * s.quantity, 0),
      'Holdings': portfolio.investments.length,
      'Transactions': portfolio.transactionHistory.length,
      'Account Balance': portfolio.balance,
    }
    exportAnalyticsCSV(analyticsData, `analytics-${new Date().getTime()}.csv`)
  }

  const handleExportAnalyticsPDF = async () => {
    const analyticsData = {
      'Total Invested': portfolio.investments.reduce((acc, s) => acc + s.buyPrice * s.quantity, 0),
      'Current Value': portfolio.investments.reduce((acc, s) => acc + s.currentPrice * s.quantity, 0),
      'Holdings': portfolio.investments.length,
      'Transactions': portfolio.transactionHistory.length,
      'Account Balance': portfolio.balance,
    }
    await exportAnalyticsPDF(analyticsData)
  }

  // Calculate P&L by stock
  const stockPLData = useMemo(() => {
    if (!portfolio.investments || portfolio.investments.length === 0) {
      return []
    }
    return portfolio.investments.map((inv) => {
      const currentValue = inv.quantity * inv.currentPrice
      const investedValue = inv.quantity * inv.buyPrice
      const gain = currentValue - investedValue
      const gainPercent = (gain / investedValue) * 100

      return {
        name: inv.symbol,
        invested: investedValue,
        current: currentValue,
        gain: gain,
        gainPercent: gainPercent,
        quantity: inv.quantity,
        buyPrice: inv.buyPrice,
        currentPrice: inv.currentPrice,
      }
    })
    const totalInvested = (stockPLData || []).reduce((acc, s) => acc + (Number(s.invested) || 0), 0)
    const totalCurrent = (stockPLData || []).reduce((acc, s) => acc + (Number(s.current) || 0), 0)
    const totalGain = totalCurrent - totalInvested
    const totalGainPercent = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0
    if (!portfolio.investments || portfolio.investments.length === 0) {
      return []
    }
    const total = portfolio.investments.reduce((acc, inv) => acc + inv.quantity * inv.currentPrice, 0)
    return portfolio.investments.map((inv) => ({
      name: inv.symbol,
      value: inv.quantity * inv.currentPrice,
      percentage: ((inv.quantity * inv.currentPrice) / total) * 100,
    }))
  }, [portfolio.investments])

  // Enhanced monthly trend with market data
  const monthlyTrend = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const profits = [15000, 22000, 18000, 28000, 35000, 42000]
    const marketIndex = [85000, 87500, 89200, 92100, 95600, 98500]
    return months.map((month, idx) => ({
      month,
      profit: profits[idx],
      marketIndex: marketIndex[idx],
      transactions: Math.floor(Math.random() * 10) + 3,
    }))
  }, [])

  // Return distribution
  const returnDistribution = useMemo(() => {
    const ranges = [
      { range: '-20% to -10%', count: 0 },
      { range: '-10% to 0%', count: 0 },
      { range: '0% to 10%', count: 0 },
      { range: '10% to 20%', count: 0 },
      { range: '20%+', count: 0 },
    ]
    
    stockPLData.forEach((stock) => {
      if (stock.gainPercent >= -20 && stock.gainPercent < -10) ranges[0].count++
      else if (stock.gainPercent >= -10 && stock.gainPercent < 0) ranges[1].count++
      else if (stock.gainPercent >= 0 && stock.gainPercent < 10) ranges[2].count++
      else if (stock.gainPercent >= 10 && stock.gainPercent < 20) ranges[3].count++
      else if (stock.gainPercent >= 20) ranges[4].count++
    })
    
    return ranges
  }, [stockPLData])

  // P&L distribution
  const PLDistribution = useMemo(() => {
    const gains = stockPLData.filter((s) => s.gain > 0).length
    const losses = stockPLData.filter((s) => s.gain < 0).length
    const neutral = stockPLData.filter((s) => s.gain === 0).length

    return [
      { name: 'Gains', value: gains, fill: '#10b981' },
      { name: 'Losses', value: losses, fill: '#ef4444' },
      { name: 'Neutral', value: neutral, fill: '#9CA3AF' },
    ]
  }, [stockPLData])

  // Risk metrics
  const riskMetrics = useMemo(() => {
    const returns = stockPLData.map((s) => s.gainPercent)
    const avgReturn = returns.length > 0 ? returns.reduce((a, b) => a + b, 0) / returns.length : 0
    const variance = returns.length > 0 ? returns.reduce((acc, r) => acc + Math.pow(r - avgReturn, 2), 0) / returns.length : 0
    const volatility = Math.sqrt(variance)
    const sharpeRatio = volatility !== 0 ? (avgReturn - 2.5) / volatility : 0
    const maxGain = Math.max(...stockPLData.map((s) => s.gainPercent), 0)
    const maxLoss = Math.min(...stockPLData.map((s) => s.gainPercent), 0)
    const maxDrawdown = Math.abs(maxLoss)

    return [
      { metric: 'Volatility', value: volatility.toFixed(2), unit: '%', trend: 'neutral' },
      { metric: 'Sharpe Ratio', value: sharpeRatio.toFixed(2), unit: '', trend: sharpeRatio > 1 ? 'up' : 'down' },
      { metric: 'Max Gain', value: maxGain.toFixed(2), unit: '%', trend: 'up' },
      { metric: 'Max Loss', value: Math.abs(maxLoss).toFixed(2), unit: '%', trend: 'down' },
      { metric: 'Max Drawdown', value: maxDrawdown.toFixed(2), unit: '%', trend: 'down' },
      { metric: 'Avg Return', value: avgReturn.toFixed(2), unit: '%', trend: avgReturn > 0 ? 'up' : 'down' },
    ]
  }, [stockPLData])

  // Overall statistics
  const totalInvested = stockPLData.reduce((acc, s) => acc + s.invested, 0)
  const totalCurrent = stockPLData.reduce((acc, s) => acc + s.current, 0)
  const totalGain = totalCurrent - totalInvested
  const totalGainPercent = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0
  const winRate = stockPLData.length > 0 ? (stockPLData.filter((s) => s.gain > 0).length / stockPLData.length) * 100 : 0
  const avgReturn = stockPLData.length > 0 ? stockPLData.reduce((acc, s) => acc + s.gainPercent, 0) / stockPLData.length : 0

  const COLORS = ['#7180BF', '#c6ccef', '#a5b1e8', '#8a98d9', '#6f7dca']
  const statusColor = totalGain >= 0 ? 'from-green-500 to-emerald-500' : 'from-red-500 to-pink-500'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Navbar */}
      <Navbar currentPage={currentPage || 'analytics'} setCurrentPage={setCurrentPage} />

      <main className="flex-1">
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Status */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-4 flex items-center gap-1"
          >
            ← Back to Dashboard
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-manrope font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                📊 Analytics & Market Insights
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Deep dive into your portfolio performance and market trends
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className={`bg-gradient-to-br ${statusColor} h-24 w-40 rounded-2xl p-6 text-white shadow-xl`}>
                <p className="text-sm font-semibold opacity-90 mb-1">Portfolio Status</p>
                <p className="text-2xl font-bold">{totalGainPercent >= 0 ? '+' : ''}{totalGainPercent.toFixed(2)}%</p>
                <p className="text-xs opacity-85">₹{(totalGain / 100000).toFixed(2)}L gain</p>
              </div>
              <ExportButton
                onExportCSV={handleExportAnalyticsCSV}
                onExportPDF={handleExportAnalyticsPDF}
                label="Export Report"
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Key Metrics - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="card card-elevated p-6 hover-lift bg-white dark:bg-gray-800 border-l-4 border-blue-500">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Total Invested</h3>
            <p className="text-2xl font-manrope font-bold text-gray-900 dark:text-white">
              ₹{(totalInvested / 100000).toFixed(2)}L
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{portfolio.investments.length} holdings</p>
          </div>

          <div className="card card-elevated p-6 hover-lift bg-white dark:bg-gray-800 border-l-4 border-green-500">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Current Value</h3>
            <p className="text-2xl font-manrope font-bold text-gray-900 dark:text-white">
              ₹{(totalCurrent / 100000).toFixed(2)}L
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ Real-time</p>
          </div>

          <div className={`card card-elevated p-6 hover-lift bg-white dark:bg-gray-800 border-l-4 ${totalGain >= 0 ? 'border-emerald-500' : 'border-red-500'}`}>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Total Gain/Loss</h3>
            <p className={`text-2xl font-manrope font-bold ${totalGain >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              ₹{(totalGain / 1000).toFixed(1)}K
            </p>
            <p className={`text-xs font-semibold mt-2 ${totalGain >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {totalGainPercent >= 0 ? '+' : ''}{totalGainPercent.toFixed(2)}%
            </p>
          </div>

          <div className="card card-elevated p-6 hover-lift bg-white dark:bg-gray-800 border-l-4 border-purple-500">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Win Rate</h3>
            <p className="text-2xl font-manrope font-bold text-gray-900 dark:text-white">
              {winRate.toFixed(1)}%
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">{stockPLData.filter((s) => s.gain > 0).length} winners</p>
          </div>

          <div className="card card-elevated p-6 hover-lift bg-white dark:bg-gray-800 border-l-4 border-yellow-500">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Avg Return</h3>
            <p className="text-2xl font-manrope font-bold text-gray-900 dark:text-white">
              {avgReturn.toFixed(2)}%
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">per holding</p>
          </div>
        </div>

        {/* Charts Grid - Enhanced */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Portfolio Composition - Pie Chart */}
          <div className="card card-elevated p-6 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <PieChartIcon size={24} className="text-purple-500" />
              Portfolio Composition
            </h3>
            {portfolioComposition.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={portfolioComposition}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {portfolioComposition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(2)}L`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <AlertCircle size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No holdings yet</p>
                </div>
              </div>
            )}
          </div>

          {/* P&L Distribution */}
          <div className="card card-elevated p-6 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <PieChartIcon size={24} className="text-pink-500" />
              Profit/Loss Distribution
            </h3>
            {PLDistribution.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={PLDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {PLDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <AlertCircle size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No data available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Trend with Market Index */}
        <div className="card card-elevated p-6 mb-8 bg-white dark:bg-gray-800">
          <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <LineChartIcon size={24} className="text-green-500" />
            📈 Monthly Profit Trend vs Market Index
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                formatter={(value) => `₹${(value / 1000).toFixed(1)}K`}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="profit" fill="#10b981" name="My Profit (₹)" radius={[8, 8, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="marketIndex" stroke="#f59e0b" name="Market Index" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Metrics Dashboard */}
        <div className="mb-8">
          <h3 className="text-2xl font-manrope font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BarChart3 size={28} className="text-red-500" />
            Risk Metrics Dashboard
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riskMetrics.map((metric, idx) => (
              <div key={idx} className={`card card-elevated p-6 bg-white dark:bg-gray-800 border-t-4 ${
                metric.trend === 'up' ? 'border-green-500' : metric.trend === 'down' ? 'border-red-500' : 'border-yellow-500'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{metric.metric}</h4>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                      <span className="text-lg text-gray-500 ml-1">{metric.unit}</span>
                    </p>
                  </div>
                  {metric.trend === 'up' ? (
                    <TrendingUp size={24} className="text-green-500" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown size={24} className="text-red-500" />
                  ) : (
                    <BarChart3 size={24} className="text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return Distribution Chart */}
        <div className="card card-elevated p-6 mb-8 bg-white dark:bg-gray-800">
          <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BarChart3 size={24} className="text-indigo-500" />
            Return Distribution by Range
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={returnDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" name="Holdings Count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock-wise P&L Table - Enhanced */}
        <div className="card card-elevated p-6 mb-8 bg-white dark:bg-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white flex items-center gap-2">
              💰 Stock-wise Profit/Loss Breakdown
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all">
              <Download size={16} />
              Export CSV
            </button>
          </div>
          {stockPLData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-white">Stock</th>
                    <th className="text-right py-4 px-4 font-bold text-gray-900 dark:text-white">Qty</th>
                    <th className="text-right py-4 px-4 font-bold text-gray-900 dark:text-white">Buy Price</th>
                    <th className="text-right py-4 px-4 font-bold text-gray-900 dark:text-white">Current</th>
                    <th className="text-right py-4 px-4 font-bold text-gray-900 dark:text-white">Invested</th>
                    <th className="text-right py-4 px-4 font-bold text-gray-900 dark:text-white">Current Value</th>
                    <th className="text-right py-4 px-4 font-bold text-gray-900 dark:text-white">Gain/Loss</th>
                    <th className="text-right py-4 px-4 font-bold text-gray-900 dark:text-white">Return %</th>
                  </tr>
                </thead>
                <tbody>
                  {stockPLData.map((stock) => (
                    <tr
                      key={stock.name}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                      <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">{stock.name}</td>
                      <td className="text-right py-4 px-4 text-gray-700 dark:text-gray-300">{stock.quantity}</td>
                      <td className="text-right py-4 px-4 text-gray-700 dark:text-gray-300">₹{stock.buyPrice.toFixed(2)}</td>
                      <td className="text-right py-4 px-4 text-gray-700 dark:text-gray-300">₹{stock.currentPrice.toFixed(2)}</td>
                      <td className="text-right py-4 px-4 text-gray-700 dark:text-gray-300">₹{(stock.invested / 1000).toFixed(1)}K</td>
                      <td className="text-right py-4 px-4 text-gray-700 dark:text-gray-300">₹{(stock.current / 1000).toFixed(1)}K</td>
                      <td
                        className={`text-right py-4 px-4 font-bold ${stock.gain >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                      >
                        <div className="flex items-center justify-end gap-1">
                          {stock.gain >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          ₹{(stock.gain / 1000).toFixed(1)}K
                        </div>
                      </td>
                      <td
                        className={`text-right py-4 px-4 font-bold ${stock.gainPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                      >
                        {stock.gainPercent >= 0 ? '+' : ''}{stock.gainPercent.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <AlertCircle size={48} className="mx-auto mb-3 opacity-50" />
                <p>No holdings to display</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card card-elevated p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">💡 Top Performer</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {stockPLData.length > 0 ? `${stockPLData.reduce((max, s) => s.gainPercent > max.gainPercent ? s : max).name} with +${stockPLData.reduce((max, s) => s.gainPercent > max.gainPercent ? s : max).gainPercent.toFixed(2)}%` : 'No data'}
            </p>
          </div>
          <div className="card card-elevated p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
            <h4 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">⚠️ Needs Attention</h4>
            <p className="text-sm text-red-800 dark:text-red-200">
              {stockPLData.length > 0 ? `${stockPLData.filter(s => s.gain < 0).length} stocks in red zone` : 'No data'}
            </p>
          </div>
          <div className="card card-elevated p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
            <h4 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">✅ Recommendation</h4>
            <p className="text-sm text-green-800 dark:text-green-200">
              {totalGainPercent > 15 ? 'Great portfolio health! Consider diversifying.' : totalGainPercent > 0 ? 'Keep holding, market looks positive.' : 'Consider rebalancing your portfolio.'}
            </p>
          </div>
        </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default AnalyticsPage
