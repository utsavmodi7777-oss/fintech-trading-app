import React, { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { STOCK_DATA } from '../data/stocks'

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => {
    if (!query.trim()) return []
    
    const lowerQuery = query.toLowerCase()
    return Object.values(STOCK_DATA)
      .filter((stock) =>
        stock.symbol.toLowerCase().includes(lowerQuery) ||
        stock.name.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8)
  }, [query])

  const handleSelect = (stock) => {
    onSelect(stock)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-3 p-0.5 hover:bg-gray-100 rounded"
          >
            <X size={18} className="text-gray-400" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {results.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => handleSelect(stock)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-200 last:border-0 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{stock.symbol}</p>
                  <p className="text-sm text-gray-600">{stock.name}</p>
                </div>
                <span className={`text-sm font-semibold ${stock.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-600 z-50">
          No stocks found for "{query}"
        </div>
      )}
    </div>
  )
}

export default SearchBar
