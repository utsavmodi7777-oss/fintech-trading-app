import React, { useState, useEffect } from 'react'
import { X, Bell, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { useNotification } from '../context/NotificationContext'

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Trade Executed',
      message: 'Successfully bought 10 shares of AAPL at $150.25',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Market Update',
      message: 'TSLA stock reached new 52-week high of $250.50',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Price Alert',
      message: 'GOOGL dropped 3% - consider taking profit or buying more',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Risk Warning',
      message: 'Your portfolio is heavily concentrated in tech stocks (65%)',
      timestamp: new Date(Date.now() - 1 * 60 * 60000),
      read: true
    },
    {
      id: 5,
      type: 'success',
      title: 'Dividend Received',
      message: 'Received ₹2,500 dividend from your MSFT holdings',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      read: true
    }
  ])

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-success" size={20} />
      case 'warning':
        return <AlertTriangle className="text-warning" size={20} />
      case 'alert':
        return <AlertCircle className="text-danger" size={20} />
      case 'info':
        return <Info className="text-primary-500" size={20} />
      default:
        return <Bell className="text-gray-500" size={20} />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/30 text-success'
      case 'warning':
        return 'bg-warning/10 border-warning/30 text-warning'
      case 'alert':
        return 'bg-danger/10 border-danger/30 text-danger'
      case 'info':
        return 'bg-primary-500/10 border-primary-500/30 text-primary-600'
      default:
        return 'bg-gray-100 dark:bg-gray-700'
    }
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <Bell size={24} className="text-gray-600 dark:text-gray-400" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-danger text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Notification Center */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Panel */}
          <div className="absolute right-0 top-12 w-96 max-h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell size={20} />
                Notifications
                {unreadCount > 0 && (
                  <span className="text-xs bg-danger text-white px-2 py-1 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={40} className="mx-auto mb-2 opacity-30" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      !notif.read ? 'bg-primary-50 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">
                              {notif.title}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {formatTime(notif.timestamp)}
                            </p>
                          </div>
                          {!notif.read && (
                            <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-1"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
                          {notif.message}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notif.id)
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <button className="w-full text-center py-2 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:bg-primary-50 dark:hover:bg-gray-600 rounded transition">
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationCenter
