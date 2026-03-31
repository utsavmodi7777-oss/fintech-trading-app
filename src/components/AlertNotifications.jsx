import React, { useEffect } from 'react'
import { X, AlertCircle, CheckCircle } from 'lucide-react'
import { useAlerts } from '../context/AlertsContext'

const AlertNotifications = () => {
  const { notifications, deleteNotification, markNotificationAsRead } = useAlerts()

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 max-h-[80vh] overflow-y-auto">
      {notifications.slice(0, 5).map((notification) => (
        <AlertNotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => deleteNotification(notification.id)}
          onRead={() => markNotificationAsRead(notification.id)}
        />
      ))}
    </div>
  )
}

const AlertNotificationItem = ({ notification, onClose, onRead }) => {
  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = notification.type === 'price_alert' ? 'bg-blue-500' : 'bg-green-500'
  const icon = notification.type === 'price_alert' ? AlertCircle : CheckCircle

  const Icon = icon

  return (
    <div
      className={`${bgColor} text-white rounded-lg shadow-lg p-4 max-w-sm animate-slide-in-right`}
      onClick={onRead}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold">{notification.symbol}</p>
          <p className="text-sm opacity-90">{notification.message}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default AlertNotifications
