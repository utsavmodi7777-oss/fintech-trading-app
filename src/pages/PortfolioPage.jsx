import React from 'react'
import Navbar from '../components/Navbar'
import WalletSection from '../components/WalletSection'
import TransactionHistory from '../components/TransactionHistory'
import ExportButton from '../components/ExportButton'
import { exportPortfolioCSV, exportTransactionsCSV } from '../services/csvExport'
import { exportPortfolioPDF, exportTransactionsPDF } from '../services/pdfExport'
import { usePortfolio } from '../context/PortfolioContext'

const PortfolioPage = ({ currentPage, setCurrentPage }) => {
  const { portfolio } = usePortfolio()

  const handleExportPortfolioCSV = async () => {
    exportPortfolioCSV(portfolio, `portfolio-${new Date().getTime()}.csv`)
  }

  const handleExportPortfolioPDF = async () => {
    await exportPortfolioPDF(portfolio)
  }

  const handleExportTransactionsCSV = async () => {
    exportTransactionsCSV(portfolio.transactionHistory, `transactions-${new Date().getTime()}.csv`)
  }

  const handleExportTransactionsPDF = async () => {
    await exportTransactionsPDF(portfolio.transactionHistory)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-manrope font-bold text-gray-900 dark:text-white mb-2">
                Wallet & Transactions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your funds and view transaction history
              </p>
            </div>
            <ExportButton
              onExportCSV={handleExportPortfolioCSV}
              onExportPDF={handleExportPortfolioPDF}
              label="Export Portfolio"
            />
          </div>
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
