import React from 'react'
import { AlertCircle, Check, ExternalLink } from 'lucide-react'
import { isAPIKeyConfigured } from '../services/stockAPI'

const APIConfigStatus = () => {
  const isConfigured = isAPIKeyConfigured()

  return (
    <div
      className={`p-4 rounded-lg border ${
        isConfigured
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
          : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      }`}
    >
      <div className="flex items-start gap-3">
        {isConfigured ? (
          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <h3
            className={`font-semibold ${
              isConfigured
                ? 'text-green-900 dark:text-green-100'
                : 'text-yellow-900 dark:text-yellow-100'
            }`}
          >
            {isConfigured ? 'Real-time Stock Prices Enabled' : 'Real-time Stock Prices Unavailable'}
          </h3>
          <p
            className={`text-sm mt-1 ${
              isConfigured
                ? 'text-green-700 dark:text-green-200'
                : 'text-yellow-700 dark:text-yellow-200'
            }`}
          >
            {isConfigured
              ? 'Your API key is configured. Stock prices will refresh from live market data.'
              : 'To enable real-time stock prices, add your Alpha Vantage API key to the .env file.'}
          </p>

          {!isConfigured && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                Setup steps:
              </p>
              <ol className="text-sm text-yellow-800 dark:text-yellow-200 list-decimal list-inside space-y-1">
                <li>
                  Get a free API key from{' '}
                  <a
                    href="https://www.alphavantage.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-yellow-900 dark:hover:text-yellow-100 flex items-center gap-1 inline"
                  >
                    Alpha Vantage
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>Create a .env file in the project root</li>
                <li>Add: VITE_ALPHA_VANTAGE_KEY=your_key_here</li>
                <li>Restart the development server</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default APIConfigStatus
