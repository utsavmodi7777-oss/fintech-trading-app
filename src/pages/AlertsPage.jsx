import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AlertManager from '../components/AlertManager'
import { useAlerts } from '../context/AlertsContext'
import { Clock, AlertTriangle } from 'lucide-react'

const AlertsPage = ({ currentPage, setCurrentPage }) => {
  const { alertHistory, getActiveAlertsCount, getUnreadCount } = useAlerts()

  const activeCount = getActiveAlertsCount()
  const unreadCount = getUnreadCount()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-manrope font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-2">
            🔔 Price Alerts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Set up alerts to monitor your stocks and get notified of price movements
          </p>

          {/* Alert Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Alerts</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {activeCount}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Unread Notifications</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {unreadCount}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total History</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {alertHistory.length}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alert Manager - Left */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <AlertManager />
            </div>
          </div>

          {/* Alert History - Right */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              Recent Activity
            </h2>

            {alertHistory.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                No alert history yet
              </p>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {alertHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-purple-500 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-2">
                      {item.type === 'alert_triggered' ? (
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {item.symbol}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-words">
                          {item.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          {item.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AlertsPage
