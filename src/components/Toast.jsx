import React, { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useNotification } from '../context/NotificationContext'

const Toast = () => {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="fixed top-6 right-6 z-[1000] space-y-3 max-w-sm pointer-events-none">
      {notifications.map((notif) => (
        <ToastItem key={notif.id} notification={notif} onRemove={removeNotification} />
      ))}
    </div>
  )
}

const ToastItem = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onRemove(notification.id), 300)
    }, notification.duration || 4000)

    return () => clearTimeout(timer)
  }, [notification.id, notification.duration, onRemove])

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-white flex-shrink-0" size={20} />
      case 'error':
        return <AlertCircle className="text-white flex-shrink-0" size={20} />
      case 'info':
        return <Info className="text-white flex-shrink-0" size={20} />
      default:
        return null
    }
  }

  const bgClass = {
    success: 'from-success to-success/80 border-success/30',
    error: 'from-danger to-danger/80 border-danger/30',
    info: 'from-primary-500 to-primary-600 border-primary-400/30',
  }[notification.type] || 'from-gray-900 to-gray-800 border-gray-700/30'

  return (
    <div
      className={`glass-sm bg-gradient-to-r ${bgClass} text-white rounded-lg p-4 flex items-start gap-3 transition-all duration-300 pointer-events-auto hover-lift ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-96'
      }`}
    >
      {getIcon(notification.type)}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm break-words">{notification.message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => onRemove(notification.id), 300)
        }}
        className="flex-shrink-0 hover:opacity-80 transition-opacity p-1"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Toast
