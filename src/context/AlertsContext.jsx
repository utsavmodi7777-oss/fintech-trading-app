import React, { createContext, useState, useCallback } from 'react'

export const AlertsContext = createContext()

export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'price_alert',
      symbol: 'AAPL',
      conditionType: 'above', // 'above' or 'below'
      targetPrice: 180,
      currentPrice: 175.5,
      isActive: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      triggeredAt: null,
      notificationSent: false,
    },
    {
      id: 2,
      type: 'price_alert',
      symbol: 'GOOGL',
      conditionType: 'below',
      targetPrice: 115,
      currentPrice: 120.75,
      isActive: true,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      triggeredAt: null,
      notificationSent: false,
    },
  ])

  const [notifications, setNotifications] = useState([])
  const [alertHistory, setAlertHistory] = useState([
    {
      id: 'hist-1',
      symbol: 'TSLA',
      message: 'Price dropped below $240',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      type: 'alert_triggered',
      read: true,
    },
  ])

  /**
   * Create a new price alert
   */
  const createAlert = useCallback((symbol, conditionType, targetPrice) => {
    const newAlert = {
      id: Date.now(),
      type: 'price_alert',
      symbol,
      conditionType, // 'above' or 'below'
      targetPrice,
      currentPrice: null, // Will be fetched later
      isActive: true,
      createdAt: new Date(),
      triggeredAt: null,
      notificationSent: false,
    }

    setAlerts((prev) => [newAlert, ...prev])

    // Add to history
    setAlertHistory((prev) => [
      {
        id: `hist-${Date.now()}`,
        symbol,
        message: `Alert created: Price ${conditionType} $${targetPrice}`,
        timestamp: new Date(),
        type: 'alert_created',
        read: false,
      },
      ...prev,
    ])

    return newAlert
  }, [])

  /**
   * Delete an alert
   */
  const deleteAlert = useCallback((alertId) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))

    setAlertHistory((prev) => [
      {
        id: `hist-${Date.now()}`,
        symbol: alerts.find((a) => a.id === alertId)?.symbol,
        message: 'Alert deleted',
        timestamp: new Date(),
        type: 'alert_deleted',
        read: false,
      },
      ...prev,
    ])
  }, [alerts])

  /**
   * Disable/Enable an alert
   */
  const toggleAlert = useCallback((alertId) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
      )
    )
  }, [])

  /**
   * Update alert target price
   */
  const updateAlert = useCallback((alertId, targetPrice) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, targetPrice } : alert
      )
    )
  }, [])

  /**
   * Check if any alerts should trigger (call this with current prices)
   */
  const checkAlerts = useCallback((currentPrices) => {
    const triggeredAlerts = []

    setAlerts((prev) =>
      prev.map((alert) => {
        const currentPrice = currentPrices[alert.symbol]

        if (!currentPrice || !alert.isActive) return alert

        let shouldTrigger = false

        if (alert.conditionType === 'above' && currentPrice >= alert.targetPrice) {
          shouldTrigger = true
        } else if (alert.conditionType === 'below' && currentPrice <= alert.targetPrice) {
          shouldTrigger = true
        }

        if (shouldTrigger && !alert.notificationSent) {
          triggeredAlerts.push({
            ...alert,
            currentPrice,
            triggeredAt: new Date(),
          })

          return {
            ...alert,
            currentPrice,
            triggeredAt: new Date(),
            notificationSent: true,
          }
        }

        return { ...alert, currentPrice }
      })
    )

    // Add triggered alerts to notifications and history
    triggeredAlerts.forEach((alert) => {
      const message = `${alert.symbol} is now $${alert.currentPrice.toFixed(2)} (${alert.conditionType} $${alert.targetPrice})`

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'price_alert',
          symbol: alert.symbol,
          message,
          timestamp: new Date(),
          read: false,
        },
        ...prev,
      ])

      setAlertHistory((prev) => [
        {
          id: `hist-${Date.now()}`,
          symbol: alert.symbol,
          message: `Alert triggered: ${message}`,
          timestamp: new Date(),
          type: 'alert_triggered',
          read: false,
        },
        ...prev,
      ])
    })

    return triggeredAlerts
  }, [])

  /**
   * Mark notification as read
   */
  const markNotificationAsRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }, [])

  /**
   * Delete notification
   */
  const deleteNotification = useCallback((notificationId) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId))
  }, [])

  /**
   * Get unread notifications count
   */
  const getUnreadCount = useCallback(() => {
    return notifications.filter((notif) => !notif.read).length
  }, [notifications])

  /**
   * Get active alerts count
   */
  const getActiveAlertsCount = useCallback(() => {
    return alerts.filter((alert) => alert.isActive).length
  }, [alerts])

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        notifications,
        alertHistory,
        createAlert,
        deleteAlert,
        toggleAlert,
        updateAlert,
        checkAlerts,
        markNotificationAsRead,
        deleteNotification,
        getUnreadCount,
        getActiveAlertsCount,
      }}
    >
      {children}
    </AlertsContext.Provider>
  )
}

export const useAlerts = () => {
  const context = React.useContext(AlertsContext)
  if (!context) {
    throw new Error('useAlerts must be used within AlertsProvider')
  }
  return context
}
