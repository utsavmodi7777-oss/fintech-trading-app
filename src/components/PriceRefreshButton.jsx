import React from 'react'
import { RefreshCw, Zap } from 'lucide-react'

const PriceRefreshButton = ({
  onRefresh,
  isLoading,
  lastUpdate,
  showStatus = true,
}) => {
  const getLastUpdateText = () => {
    if (!lastUpdate) return 'Never'
    
    const now = new Date()
    const diff = now - lastUpdate
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (seconds < 60) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return lastUpdate.toLocaleDateString()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all transform ${
          isLoading
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/30 active:scale-95'
        }`}
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Updating...' : 'Refresh Prices'}
      </button>

      {showStatus && lastUpdate && (
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span>Updated {getLastUpdateText()}</span>
        </div>
      )}
    </div>
  )
}

export default PriceRefreshButton
