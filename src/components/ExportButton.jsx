import React, { useState } from 'react'
import { Download, FileText, Sheet } from 'lucide-react'

const ExportButton = ({
  onExportCSV,
  onExportPDF,
  label = 'Export',
  showLabel = true,
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleExportCSV = async () => {
    setIsLoading(true)
    try {
      await onExportCSV()
    } catch (error) {
      console.error('Export CSV error:', error)
      alert('Failed to export CSV')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const handleExportPDF = async () => {
    setIsLoading(true)
    try {
      await onExportPDF()
    } catch (error) {
      console.error('Export PDF error:', error)
      alert('Failed to export PDF')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`
          flex items-center gap-2 rounded-lg font-medium transition-all
          ${sizeClasses[size]}
          ${
            isLoading
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/30 active:scale-95'
          }
        `}
      >
        <Download className={`w-${size === 'sm' ? 3 : 4} h-${size === 'sm' ? 3 : 4}`} />
        {showLabel && (isLoading ? 'Exporting...' : label)}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <button
            onClick={handleExportCSV}
            disabled={isLoading}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 first:rounded-t-lg disabled:opacity-50"
          >
            <Sheet className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Export as CSV</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Excel, Sheets compatible</p>
            </div>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isLoading}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 last:rounded-b-lg disabled:opacity-50"
          >
            <FileText className="w-5 h-5 text-red-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Export as PDF</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Print friendly report</p>
            </div>
          </button>

          {/* Close on click outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  )
}

export default ExportButton
