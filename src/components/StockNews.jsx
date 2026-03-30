import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Globe, Calendar, Share2 } from 'lucide-react'

const StockNews = ({ stock }) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching news for the stock
    const mockNews = [
      {
        id: 1,
        symbol: stock?.symbol || 'AAPL',
        title: `${stock?.symbol || 'AAPL'} Hits New Heights with Strong Q1 Performance`,
        description: 'Company reports record earnings with 25% revenue growth. Analysts remain bullish on long-term prospects.',
        sentiment: 'positive',
        source: 'Business Times',
        timestamp: '2h ago',
        impact: 'high',
        link: '#'
      },
      {
        id: 2,
        symbol: stock?.symbol || 'AAPL',
        title: `${stock?.symbol || 'AAPL'} Announces New Product Launch Next Quarter`,
        description: 'Tech company gears up for major product announcement. Industry experts expect significant market disruption.',
        sentiment: 'positive',
        source: 'Tech News Daily',
        timestamp: '4h ago',
        impact: 'medium',
        link: '#'
      },
      {
        id: 3,
        symbol: stock?.symbol || 'AAPL',
        title: `Market Analysts Maintain $180+ Price Target on ${stock?.symbol || 'AAPL'}`,
        description: 'Top-rated analysts reiterate buy recommendations with increased price targets after latest earnings.',
        sentiment: 'positive',
        source: 'Market Watch',
        timestamp: '6h ago',
        impact: 'high',
        link: '#'
      },
      {
        id: 4,
        symbol: stock?.symbol || 'AAPL',
        title: `Supply Chain Updates: ${stock?.symbol || 'AAPL'} Strengthens Manufacturing`,
        description: 'Company diversifies manufacturing across multiple regions to reduce supply chain risks.',
        sentiment: 'neutral',
        source: 'Wall Street Insider',
        timestamp: '8h ago',
        impact: 'medium',
        link: '#'
      },
      {
        id: 5,
        symbol: stock?.symbol || 'AAPL',
        title: `${stock?.symbol || 'AAPL'}: Regulatory Approval for New Market Entry`,
        description: 'Receives green light to expand operations in emerging markets. Expected to unlock new revenue streams.',
        sentiment: 'positive',
        source: 'Financial Express',
        timestamp: '12h ago',
        impact: 'medium',
        link: '#'
      }
    ]

    // Simulate loading delay
    setTimeout(() => {
      setNews(mockNews)
      setLoading(false)
    }, 600)
  }, [stock])

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-success/10 border-success/30 text-success'
      case 'negative':
        return 'bg-danger/10 border-danger/30 text-danger'
      default:
        return 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
    }
  }

  const getSentimentIcon = (sentiment) => {
    return sentiment === 'positive' ? (
      <TrendingUp size={16} />
    ) : sentiment === 'negative' ? (
      <TrendingDown size={16} />
    ) : (
      <Globe size={16} />
    )
  }

  const getImpactBadge = (impact) => {
    const colors = {
      high: 'bg-danger/20 text-danger px-2 py-1 rounded text-xs font-semibold',
      medium: 'bg-warning/20 text-warning px-2 py-1 rounded text-xs font-semibold',
      low: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-semibold'
    }
    const impactLabels = { high: 'High Impact', medium: 'Medium Impact', low: 'Low Impact' }
    return <span className={colors[impact]}>{impactLabels[impact]}</span>
  }

  if (loading) {
    return (
      <div className="card card-elevated p-6 bg-white dark:bg-gray-800">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 border border-gray-200 dark:border-gray-700 rounded space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card card-elevated p-6 bg-white dark:bg-gray-800 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="text-primary-500" size={24} />
        <h2 className="text-2xl font-manrope font-bold text-gray-900 dark:text-white">Market News</h2>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {news.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className={`block p-4 rounded-lg border-2 transition-all hover:shadow-md hover:scale-102 cursor-pointer ${getSentimentColor(
              item.sentiment
            )}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                {getSentimentIcon(item.sentiment)}
                <span className="font-semibold text-xs uppercase opacity-75">{item.source}</span>
              </div>
              {getImpactBadge(item.impact)}
            </div>

            {/* Title */}
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 hover:underline leading-snug">{item.title}</h3>

            {/* Description */}
            <p className="text-sm opacity-80 mb-3 line-clamp-2">{item.description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs opacity-60">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {item.timestamp}
                </span>
              </div>
              <button className="hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded">
                <Share2 size={14} />
              </button>
            </div>
          </a>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          📊 News updates every 15 minutes | Last refreshed just now
        </p>
      </div>
    </div>
  )
}

export default StockNews
