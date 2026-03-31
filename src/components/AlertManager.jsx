import React, { useState } from 'react'
import { Bell, X, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { useAlerts } from '../context/AlertsContext'

const AlertManager = () => {
  const { alerts, createAlert, deleteAlert, toggleAlert, updateAlert } = useAlerts()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    symbol: 'AAPL',
    conditionType: 'above',
    targetPrice: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [editPrice, setEditPrice] = useState('')

  const handleCreateAlert = (e) => {
    e.preventDefault()
    if (!formData.targetPrice) {
      alert('Please enter a target price')
      return
    }

    createAlert(
      formData.symbol,
      formData.conditionType,
      parseFloat(formData.targetPrice)
    )

    setFormData({ symbol: 'AAPL', conditionType: 'above', targetPrice: '' })
    setShowCreateForm(false)
  }

  const handleUpdatePrice = (alertId, newPrice) => {
    if (newPrice) {
      updateAlert(alertId, parseFloat(newPrice))
      setEditingId(null)
      setEditPrice('')
    }
  }

  const activeAlerts = alerts.filter((a) => a.isActive)
  const inactiveAlerts = alerts.filter((a) => !a.isActive)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-500" />
          Price Alerts
        </h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          New Alert
        </button>
      </div>

      {/* Create Alert Form */}
      {showCreateForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Create New Alert
          </h3>
          <form onSubmit={handleCreateAlert} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stock Symbol */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stock Symbol
                </label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) =>
                    setFormData({ ...formData, symbol: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g., AAPL"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500/50"
                />
              </div>

              {/* Condition Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Condition
                </label>
                <select
                  value={formData.conditionType}
                  onChange={(e) =>
                    setFormData({ ...formData, conditionType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500/50"
                >
                  <option value="above">Price Above</option>
                  <option value="below">Price Below</option>
                </select>
              </div>

              {/* Target Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.targetPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, targetPrice: e.target.value })
                  }
                  placeholder="e.g., 180.50"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Create Alert
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Alerts */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Active Alerts ({activeAlerts.length})
        </h3>
        {activeAlerts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            No active alerts. Create one to get started!
          </p>
        ) : (
          <div className="space-y-2">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700 flex justify-between items-center hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {alert.symbol}
                    </h4>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Alert when price goes{' '}
                    <span className="font-semibold">
                      {alert.conditionType === 'above' ? '📈 above' : '📉 below'}
                    </span>{' '}
                    $
                    {editingId === alert.id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editPrice || alert.targetPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        onBlur={() => handleUpdatePrice(alert.id, editPrice)}
                        className="w-20 px-1 py-0 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
                        autoFocus
                      />
                    ) : (
                      <span
                        onClick={() => {
                          setEditingId(alert.id)
                          setEditPrice(alert.targetPrice.toString())
                        }}
                        className="cursor-pointer hover:underline"
                      >
                        {alert.targetPrice.toFixed(2)}
                      </span>
                    )}
                  </p>
                  {alert.notificationSent && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                      ✓ Alert triggered on{' '}
                      {alert.triggeredAt?.toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    title="Disable alert"
                  >
                    <ToggleRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inactive Alerts */}
      {inactiveAlerts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Disabled Alerts ({inactiveAlerts.length})
          </h3>
          <div className="space-y-2">
            {inactiveAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-300 dark:border-gray-600 flex justify-between items-center opacity-60"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {alert.symbol}
                    </h4>
                    <span className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-300 text-xs rounded">
                      Disabled
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    ${alert.targetPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    title="Enable alert"
                  >
                    <ToggleLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AlertManager
