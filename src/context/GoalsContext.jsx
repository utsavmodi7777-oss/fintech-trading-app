import React, { createContext, useState, useCallback } from 'react'

export const GoalsContext = createContext()

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      description: 'Build 6 months of living expenses',
      targetAmount: 50000,
      currentAmount: 32500,
      targetDate: new Date(2025, 11, 31),
      category: 'savings',
      priority: 'high',
      color: 'blue',
      createdAt: new Date(2024, 10, 15),
      progress: 65,
    },
    {
      id: 2,
      name: 'Retirement Fund',
      description: 'Retirement savings plan',
      targetAmount: 500000,
      currentAmount: 145000,
      targetDate: new Date(2050, 11, 31),
      category: 'investment',
      priority: 'high',
      color: 'green',
      createdAt: new Date(2024, 9, 1),
      progress: 29,
    },
    {
      id: 3,
      name: 'Vacation Fund',
      description: 'Trip to Europe',
      targetAmount: 10000,
      currentAmount: 7200,
      targetDate: new Date(2025, 6, 15),
      category: 'personal',
      priority: 'medium',
      color: 'purple',
      createdAt: new Date(2024, 11, 1),
      progress: 72,
    },
  ])

  /**
   * Create a new goal
   */
  const createGoal = useCallback(
    (name, description, targetAmount, targetDate, category = 'savings', priority = 'medium') => {
      const newGoal = {
        id: Date.now(),
        name,
        description,
        targetAmount,
        currentAmount: 0,
        targetDate,
        category,
        priority,
        color: ['blue', 'green', 'purple', 'orange', 'pink'][Math.floor(Math.random() * 5)],
        createdAt: new Date(),
        progress: 0,
      }

      setGoals((prev) => [newGoal, ...prev])
      return newGoal
    },
    []
  )

  /**
   * Update goal progress
   */
  const updateGoalProgress = useCallback((goalId, currentAmount) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          const progress = Math.min((currentAmount / goal.targetAmount) * 100, 100)
          return {
            ...goal,
            currentAmount,
            progress,
          }
        }
        return goal
      })
    )
  }, [])

  /**
   * Delete a goal
   */
  const deleteGoal = useCallback((goalId) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId))
  }, [])

  /**
   * Check if goal is completed
   */
  const isGoalCompleted = useCallback((goalId) => {
    const goal = goals.find((g) => g.id === goalId)
    return goal && goal.currentAmount >= goal.targetAmount
  }, [goals])

  /**
   * Get days until goal deadline
   */
  const getDaysUntilDeadline = useCallback((goalId) => {
    const goal = goals.find((g) => g.id === goalId)
    if (!goal) return 0

    const now = new Date()
    const targetDate = new Date(goal.targetDate)
    const diff = targetDate - now
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

    return Math.max(days, 0)
  }, [goals])

  /**
   * Get required monthly savings for goal
   */
  const getMonthlyTarget = useCallback((goalId) => {
    const goal = goals.find((g) => g.id === goalId)
    if (!goal) return 0

    const daysLeft = getDaysUntilDeadline(goalId)
    const monthsLeft = Math.max(daysLeft / 30, 1)
    const remaining = goal.targetAmount - goal.currentAmount

    return remaining / monthsLeft
  }, [goals, getDaysUntilDeadline])

  /**
   * Get goals by category
   */
  const getGoalsByCategory = useCallback(
    (category) => {
      return goals.filter((goal) => goal.category === category)
    },
    [goals]
  )

  /**
   * Get goals by priority
   */
  const getGoalsByPriority = useCallback(
    (priority) => {
      return goals.filter((goal) => goal.priority === priority)
    },
    [goals]
  )

  /**
   * Get completed goals
   */
  const getCompletedGoals = useCallback(() => {
    return goals.filter((goal) => goal.currentAmount >= goal.targetAmount)
  }, [goals])

  /**
   * Get in-progress goals
   */
  const getInProgressGoals = useCallback(() => {
    return goals.filter((goal) => goal.currentAmount < goal.targetAmount)
  }, [goals])

  /**
   * Add contribution to goal
   */
  const addContribution = useCallback((goalId, amount) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          const newAmount = goal.currentAmount + amount
          const progress = Math.min((newAmount / goal.targetAmount) * 100, 100)
          return {
            ...goal,
            currentAmount: newAmount,
            progress,
          }
        }
        return goal
      })
    )
  }, [])

  /**
   * Get total savings across all goals
   */
  const getTotalSavings = useCallback(() => {
    return goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  }, [goals])

  /**
   * Get total target amount across all goals
   */
  const getTotalTarget = useCallback(() => {
    return goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  }, [goals])

  /**
   * Get overall progress percentage
   */
  const getOverallProgress = useCallback(() => {
    const total = getTotalTarget()
    if (total === 0) return 0
    return Math.round((getTotalSavings() / total) * 100)
  }, [getTotalTarget, getTotalSavings])

  return (
    <GoalsContext.Provider
      value={{
        goals,
        createGoal,
        updateGoalProgress,
        deleteGoal,
        isGoalCompleted,
        getDaysUntilDeadline,
        getMonthlyTarget,
        getGoalsByCategory,
        getGoalsByPriority,
        getCompletedGoals,
        getInProgressGoals,
        addContribution,
        getTotalSavings,
        getTotalTarget,
        getOverallProgress,
      }}
    >
      {children}
    </GoalsContext.Provider>
  )
}

export const useGoals = () => {
  const context = React.useContext(GoalsContext)
  if (!context) {
    throw new Error('useGoals must be used within GoalsProvider')
  }
  return context
}
