import React, { useState, useCallback } from 'react'
import { Sparkles, Send, Loader } from 'lucide-react'

// This is a hook to interact with Groq API
// User needs to provide their own API key
export const useGroqAI = (apiKey) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateInsight = useCallback(
    async (prompt) => {
      if (!apiKey) {
        setError('Groq API key not provided')
        return null
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'mixtral-8x7b-32768',
            messages: [
              {
                role: 'system',
                content:
                  'You are a professional stock market advisor with expertise in Indian stock market. Provide concise, actionable insights. Always respond in 2-3 sentences max.',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 150,
          }),
        })

        if (!response.ok) {
          throw new Error(`Groq API error: ${response.statusText}`)
        }

        const data = await response.json()
        return data.choices[0].message.content
      } catch (err) {
        setError(err.message)
        return null
      } finally {
        setLoading(false)
      }
    },
    [apiKey]
  )

  return { generateInsight, loading, error }
}

// AI Recommendations Component
const AIRecommendations = ({ stock, portfolio, apiKey }) => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState(false)

  const { generateInsight } = useGroqAI(apiKey)

  const handleGetRecommendation = async () => {
    if (!apiKey) {
      setError('Please provide Groq API key in settings')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const prompt = `
        Stock: ${stock.symbol} (${stock.name})
        Current Price: ₹${stock.price}
        Change: ${stock.changePercent}%
        Market Cap: ${stock.marketCap}
        P/E Ratio: ${stock.pe}
        
        Based on this data, should I buy, hold, or sell? Provide 1-2 sentence recommendation.
      `

      const insight = await generateInsight(prompt)

      if (insight) {
        setRecommendations((prev) => [
          ...prev,
          {
            id: Date.now(),
            stock: stock.symbol,
            recommendation: insight,
            timestamp: new Date().toLocaleTimeString(),
          },
        ])
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePortfolioAnalysis = async () => {
    if (!apiKey) {
      setError('Please provide Groq API key in settings')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const prompt = `
        Portfolio Summary:
        - Total Holdings: ${portfolio.investments.length} stocks
        - Top Holdings: ${portfolio.investments.slice(0, 3).map((i) => i.symbol).join(', ')}
        
        Provide 1-2 sentences on portfolio health and diversification.
      `

      const insight = await generateInsight(prompt)

      if (insight) {
        setRecommendations((prev) => [
          ...prev,
          {
            id: Date.now(),
            stock: 'Portfolio',
            recommendation: insight,
            timestamp: new Date().toLocaleTimeString(),
          },
        ])
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* API Key Notice */}
      {!apiKey && (
        <div className="bg-warning/20 border border-warning/50 rounded-lg p-4">
          <p className="text-sm text-warning font-medium">
            ⚠️ Groq API key required. Add it in settings to enable AI recommendations.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-danger/20 border border-danger/50 rounded-lg p-4">
          <p className="text-sm text-danger font-medium">Error: {error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleGetRecommendation}
          disabled={loading || !apiKey}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Sparkles size={18} />}
          {loading ? 'Analyzing...' : 'AI Analysis'}
        </button>
        <button
          onClick={handlePortfolioAnalysis}
          disabled={loading || !apiKey}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-warning/50 to-warning/60 text-white rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Sparkles size={18} />}
          {loading ? 'Analyzing...' : 'Portfolio Check'}
        </button>
      </div>

      {/* Recommendations List */}
      {recommendations.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              💭 AI Recommendations ({recommendations.length})
            </h4>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary-500 hover:text-primary-600"
            >
              {expanded ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {(expanded ? recommendations : recommendations.slice(-2)).map((rec) => (
            <div
              key={rec.id}
              className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/30 rounded-lg p-3"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-primary-600 dark:text-primary-400 text-sm">
                  {rec.stock}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{rec.timestamp}</p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{rec.recommendation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AIRecommendations
