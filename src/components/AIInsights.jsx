import React, { useMemo } from 'react'
import { TrendingUp, AlertTriangle, Zap } from 'lucide-react'

const AIInsights = ({ stock }) => {
  const insights = useMemo(() => {
    const price = stock.price
    const change = stock.changePercent
    const pe = stock.pe
    const high52w = stock.high52w
    const low52w = stock.low52w
    const range52w = high52w - low52w
    const pricePosition = (price - low52w) / range52w * 100

    const analysis = []

    // Price momentum analysis
    if (change > 3) {
      analysis.push({
        icon: TrendingUp,
        title: 'Strong Bullish Momentum',
        description: `Stock is up ${change.toFixed(2)}% - Strong buying pressure detected`,
        sentiment: 'bullish',
      })
    } else if (change < -3) {
      analysis.push({
        icon: AlertTriangle,
        title: 'Bearish Pressure',
        description: `Stock is down ${Math.abs(change).toFixed(2)}% - Consider waiting`,
        sentiment: 'bearish',
      })
    }

    // Valuation analysis
    if (pe < 20) {
      analysis.push({
        icon: Zap,
        title: 'Undervalued',
        description: `P/E ratio of ${pe} suggests potential upside`,
        sentiment: 'bullish',
      })
    } else if (pe > 40) {
      analysis.push({
        icon: AlertTriangle,
        title: 'Overvalued',
        description: `P/E ratio of ${pe} is relatively high`,
        sentiment: 'bearish',
      })
    }

    // 52-week analysis
    if (pricePosition > 80) {
      analysis.push({
        icon: AlertTriangle,
        title: 'Near 52-week High',
        description: `Stock is trading near its yearly peak`,
        sentiment: 'neutral',
      })
    } else if (pricePosition < 20) {
      analysis.push({
        icon: TrendingUp,
        title: 'Near 52-week Low',
        description: `Stock is trading near yearly lows - potential buy`,
        sentiment: 'bullish',
      })
    }

    // Volume analysis (mock)
    if (stock.volume > '50M') {
      analysis.push({
        icon: Zap,
        title: 'High Trading Volume',
        description: `Strong liquidity with ${stock.volume} shares traded`,
        sentiment: 'bullish',
      })
    }

    return analysis
  }, [stock])

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
          <Zap size={18} className="text-white" />
        </div>
        <h3 className="text-xl font-manrope font-bold text-gray-900">AI Insights</h3>
      </div>

      {insights.length > 0 ? (
        <div className="space-y-4">
          {insights.map((insight, idx) => {
            const Icon = insight.icon
            const bgColor = {
              bullish: 'bg-green-50 border-l-4 border-success',
              bearish: 'bg-red-50 border-l-4 border-danger',
              neutral: 'bg-gray-100 border-l-4 border-gray-400',
            }[insight.sentiment]

            return (
              <div key={idx} className={`p-4 rounded-lg ${bgColor}`}>
                <div className="flex gap-3">
                  <Icon
                    size={20}
                    className={{
                      bullish: 'text-success',
                      bearish: 'text-danger',
                      neutral: 'text-gray-600',
                    }[insight.sentiment]}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{insight.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-gray-600">Analyzing stock data...</p>
      )}
    </div>
  )
}

export default AIInsights
