import React from 'react'
import Navbar from '../components/Navbar'
import WalletSection from '../components/WalletSection'
import TransactionHistory from '../components/TransactionHistory'

const PortfolioPage = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-manrope font-bold text-gray-900 dark:text-white mb-2">
            Wallet & Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your funds and view transaction history
          </p>
        </div>

        {/* Wallet Section */}
        <div className="mb-8 animate-fade-in">
          <WalletSection />
        </div>

        {/* Transaction History */}
        <div className="animate-fade-in">
          <TransactionHistory />
        </div>
      </main>
    </div>
  )
}

export default PortfolioPage
