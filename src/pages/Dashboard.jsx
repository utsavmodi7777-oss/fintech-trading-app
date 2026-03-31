import React, { useState, useMemo, useEffect } from 'react'
import Navbar from '../components/Navbar'
import PortfolioCard from '../components/PortfolioCard'
import StockChart from '../components/StockChart'
import CandlestickChart from '../components/CandlestickChart'
import StockCard from '../components/StockCard'
import BuySellModal from '../components/BuySellModal'
import AIInsights from '../components/AIInsights'
import StockNews from '../components/StockNews'
import Footer from '../components/Footer'
import { SkeletonCard, SkeletonTable } from '../components/Skeleton'
import { STOCK_DATA, TOP_GAINERS, TOP_LOSERS, TRENDING_STOCKS } from '../data/stocks'
import { usePortfolio } from '../context/PortfolioContext'

const Dashboard = ({ currentPage, setCurrentPage }) => {
  const [selectedStock, setSelectedStock] = useState(null)
  const [modalType, setModalType] = useState('BUY')
  const [selectedStockForChart, setSelectedStockForChart] = useState(STOCK_DATA.AAPL)
  const [chartTimeframe, setChartTimeframe] = useState('1D')
  const [chartType, setChartType] = useState('line')
  const [isLoading, setIsLoading] = useState(true)
  const { portfolio } = usePortfolio()

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleBuySell = (stock, type = 'BUY') => {
    setSelectedStock(stock)
    setModalType(type)
  }

  const handleStockSelect = (stock) => {
    setSelectedStockForChart(stock)
  }

  const getChartData = () => {
    const key = `chart${chartTimeframe}`
    return selectedStockForChart[key] || selectedStockForChart.chart1D
  }

  const timeframeButtons = ['1D', '1W', '1M', '1Y']
  const chartTypeButtons = ['line', 'candlestick']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} onStockSelect={handleStockSelect} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-manrope font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-2">
                Welcome back!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your portfolio and explore market opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio Card */}
        <div className="mb-8">
          {isLoading ? <SkeletonCard /> : <div className="animate-slide-in-up"><PortfolioCard /></div>}
        </div>

        {/* Chart Section */}
        <div className="card card-elevated p-6 mb-8 bg-white dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 flex-wrap">
            {/* Stock Selector */}
            <div className="min-w-max">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 block mb-2">Select Stock</label>
              <select
                value={selectedStockForChart.symbol}
                onChange={(e) => setSelectedStockForChart(STOCK_DATA[e.target.value])}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
              >
                {Object.values(STOCK_DATA).map((stock) => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Chart Type Buttons */}
            <div className="flex gap-2">
              {chartTypeButtons.map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition capitalize transform hover:scale-105 active:scale-95 ${
                    chartType === type
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover-lift'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Timeframe Buttons */}
            <div className="flex gap-2">
              {timeframeButtons.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setChartTimeframe(tf)}
                  className={`px-4 py-2 rounded-lg font-medium transition transform hover:scale-105 active:scale-95 ${
                    chartTimeframe === tf
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover-lift'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {chartType === 'line' ? (
            <StockChart data={getChartData()} type="line" timeframe={chartTimeframe} />
          ) : (
            <CandlestickChart data={getChartData()} />
          )}
        </div>

        {/* AI Insights & Top Gainers/Losers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* AI Insights */}
          <div className="lg:col-span-1">
            {isLoading ? <SkeletonCard height={400} /> : <div className="animate-slide-in-right"><AIInsights stock={selectedStockForChart} /></div>}
          </div>

          {/* Top Gainers & Losers */}
          <div className="space-y-6 lg:col-span-2">
            {/* Top Gainers */}
            <div className="card card-elevated p-6 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white mb-4">📈 Top Gainers</h3>
              <div className="space-y-3">
                {TOP_GAINERS.map((stock, idx) => (
                  <div key={stock.symbol} className={`flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 hover-lift p-2 rounded transition-all delay-${idx * 100}`}>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success animate-float">+{stock.change.toFixed(2)}%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">${stock.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="card card-elevated p-6 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white mb-4">📉 Top Losers</h3>
              <div className="space-y-3">
                {TOP_LOSERS.map((stock, idx) => (
                  <div key={stock.symbol} className={`flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 hover-lift p-2 rounded transition-all delay-${idx * 100}`}>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-danger">{stock.change.toFixed(2)}%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">${stock.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stock Overview */}
        <div>
          <h2 className="text-2xl font-manrope font-bold text-gray-900 dark:text-white mb-6">⭐ Popular Stocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              Object.values(STOCK_DATA).map((stock, idx) => (
                <div key={stock.symbol} className={`animate-slide-in-up delay-${idx * 100}`}>
                  <StockCard
                    stock={stock}
                    onBuySell={(s) => handleBuySell(s, 'BUY')}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Market News Section */}
        <div className="mt-8">
          <StockNews stock={selectedStockForChart} />
        </div>
      </main>

      {/* Buy/Sell Modal */}
      {selectedStock && (
        <BuySellModal
          stock={selectedStock}
          type={modalType}
          onClose={() => setSelectedStock(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Dashboard
