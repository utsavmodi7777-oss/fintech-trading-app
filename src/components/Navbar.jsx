import React from 'react'
import { Menu, Bell, User, LogOut, Settings } from 'lucide-react'
import SearchBar from './SearchBar'
import DarkModeToggle from './DarkModeToggle'
import NotificationCenter from './NotificationCenter'
import { STOCK_DATA } from '../data/stocks'

const Navbar = ({ currentPage, setCurrentPage, onStockSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const handleStockSelect = (stock) => {
    if (onStockSelect) {
      onStockSelect(stock)
    }
  }

  return (
    <nav className="sticky top-0 z-50 glass-sm border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage && setCurrentPage('dashboard')}
            className="flex items-center space-x-3 cursor-pointer hover-lift transition-all"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
              <span className="text-white font-manrope font-bold text-lg">FT</span>
            </div>
            <h1 className="text-xl font-manrope font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent hidden sm:block">
              FinTrade
            </h1>
          </button>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`font-semibold transition-all pb-2 border-b-2 ${
                currentPage === 'dashboard'
                  ? 'text-primary-500 border-primary-500'
                  : 'text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-500'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('global-markets')}
              className={`font-semibold transition-all pb-2 border-b-2 ${
                currentPage === 'global-markets'
                  ? 'text-primary-500 border-primary-500'
                  : 'text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-500'
              }`}
            >
              Markets
            </button>
            <button
              onClick={() => setCurrentPage('india-stocks')}
              className={`font-semibold transition-all pb-2 border-b-2 ${
                currentPage === 'india-stocks'
                  ? 'text-primary-500 border-primary-500'
                  : 'text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-500'
              }`}
            >
              🇮🇳 India
            </button>
            <button
              onClick={() => setCurrentPage('screener')}
              className={`font-semibold transition-all pb-2 border-b-2 ${
                currentPage === 'screener'
                  ? 'text-primary-500 border-primary-500'
                  : 'text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-500'
              }`}
            >
              Screener
            </button>
            <button
              onClick={() => setCurrentPage('portfolio')}
              className={`font-semibold transition-all pb-2 border-b-2 ${
                currentPage === 'portfolio'
                  ? 'text-primary-500 border-primary-500'
                  : 'text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-500'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setCurrentPage('alerts')}
              className={`font-semibold transition-all pb-2 border-b-2 ${
                currentPage === 'alerts'
                  ? 'text-primary-500 border-primary-500'
                  : 'text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-500'
              }`}
            >
              Alerts
            </button>
          </div>

          {/* Search - Center on Desktop */}
          <div className="hidden lg:block flex-1 mx-8">
            <SearchBar onSelect={handleStockSelect} />
          </div>

          {/* Right Side - Icons & Profile */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Notification Center */}
            <NotificationCenter />

            <button 
              onClick={() => setCurrentPage('profile')}
              className="p-2 hover:bg-white/10 dark:hover:bg-white/5 rounded-lg transition-all hover-lift hidden sm:block"
            >
              <User size={20} className="text-gray-600 dark:text-gray-300" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 dark:hover:bg-white/5 rounded-lg transition-all hover-lift"
            >
              <Menu size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <SearchBar onSelect={handleStockSelect} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-white/5 dark:bg-gray-900/50 backdrop-blur-md animate-slide-in-down">
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={() => {
                setCurrentPage('dashboard')
                setIsMenuOpen(false)
              }}
              className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-white/5 dark:hover:bg-white/10 py-2 px-2 rounded transition-all"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentPage('watchlist')
                setIsMenuOpen(false)
              }}
              className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-white/5 dark:hover:bg-white/10 py-2 px-2 rounded transition-all"
            >
              Watchlist
            </button>
            <button
              onClick={() => {
                setCurrentPage('portfolio')
                setIsMenuOpen(false)
              }}
              className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-white/5 dark:hover:bg-white/10 py-2 px-2 rounded transition-all"
            >
              Portfolio
            </button>
            <button
              onClick={() => {
                setCurrentPage('analytics')
                setIsMenuOpen(false)
              }}
              className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-white/5 dark:hover:bg-white/10 py-2 px-2 rounded transition-all"
            >
              Analytics
            </button>
            <button
              onClick={() => {
                setCurrentPage('profile')
                setIsMenuOpen(false)
              }}
              className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-white/5 dark:hover:bg-white/10 py-2 px-2 rounded transition-all"
            >
              Profile
            </button>
            <hr className="my-2 border-white/10" />
            <button className="w-full flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-white/5 dark:hover:bg-white/10 py-2 px-2 rounded transition-all">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
