import React, { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { fetchStockPrice } from '../services/stockAPI'

const LivePortfolio = ({ investments = [] }) => {
  const [stockData, setStockData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true)
      const data = {}

      for (const investment of investments) {
        try {
          const priceData = await fetchStockPrice(investment.symbol)
          if (priceData) {
            data[investment.symbol] = priceData
          }
        } catch (error) {
          console.error(`Error fetching ${investment.symbol}:`, error)
        }
      }

      setStockData(data)
      setLoading(false)
    }

    if (investments.length > 0) {
      fetchPrices()
    } else {
      setLoading(false)
    }
  }, [investments])

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (investments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>No investments yet. Start by adding stocks to your portfolio.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {investments.map((investment) => {
        const currentPrice = stockData[investment.symbol]?.price || investment.currentPrice
        const priceChange = stockData[investment.symbol]?.change || 0
        const changePercent = stockData[investment.symbol]?.changePercent || 0
        const totalValue = currentPrice * investment.quantity
        const investmentCost = investment.buyPrice * investment.quantity
        const gain = totalValue - investmentCost
        const gainPercent = (gain / investmentCost) * 100

        return (
          <div
            key={investment.symbol}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {investment.symbol}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {investment.quantity} shares @ ${investment.buyPrice.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">
                  ${currentPrice.toFixed(2)}
                </p>
                <p
                  className={`text-sm font-medium flex items-center justify-end gap-1 ${
                    priceChange >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {priceChange >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {priceChange >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Invested: ${investmentCost.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current Value: ${totalValue.toFixed(2)}
                </p>
              </div>
              <div>
                <p
                  className={`font-bold text-lg ${
                    gain >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {gain >= 0 ? '+' : '$'}{gain.toFixed(2)}
                </p>
                <p
                  className={`text-sm font-medium ${
                    gainPercent >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {gainPercent >= 0 ? '+' : ''}{gainPercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LivePortfolio
