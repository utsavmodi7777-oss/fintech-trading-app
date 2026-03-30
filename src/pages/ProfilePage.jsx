import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { usePortfolio } from '../context/PortfolioContext'
import { User, Lock, LogOut, Mail, Calendar, Award, TrendingUp, Shield } from 'lucide-react'

const ProfilePage = ({ onLogout, setCurrentPage }) => {
  const { user, updateProfile, logout } = useAuth()
  const { portfolio } = usePortfolio()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  const handleSaveProfile = () => {
    updateProfile(editData)
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    onLogout()
  }

  // Calculate statistics
  const totalInvested = portfolio.investments.reduce((acc, inv) => acc + inv.quantity * inv.buyPrice, 0)
  const totalValue = portfolio.investments.reduce((acc, inv) => acc + inv.quantity * inv.currentPrice, 0)
  const totalProfit = totalValue - totalInvested
  const profitPercentage = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0
  const accountAge = user ? new Date(user.createdAt) : new Date()
  const daysActive = Math.floor((Date.now() - accountAge.getTime()) / (1000 * 60 * 60 * 24))

  const stats = [
    {
      label: 'Total Invested',
      value: `₹${totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      icon: TrendingUp,
      color: 'text-primary-500',
    },
    {
      label: 'Current Value',
      value: `₹${totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      icon: Award,
      color: 'text-success',
    },
    {
      label: 'Total Gain/Loss',
      value: `₹${totalProfit.toLocaleString('en-IN', { maximumFractionDigits: 0 })} (${profitPercentage.toFixed(2)}%)`,
      icon: TrendingUp,
      color: totalProfit >= 0 ? 'text-success' : 'text-danger',
    },
    {
      label: 'Account Age',
      value: `${daysActive} days`,
      icon: Calendar,
      color: 'text-warning',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="text-primary-500 hover:text-primary-600 text-sm font-semibold mb-4 flex items-center gap-1"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Profile Header Card */}
        <div className="card card-elevated p-8 mb-8 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                alt="Profile"
                className="w-20 h-20 rounded-lg border-2 border-primary-500 shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-manrope font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Member since {new Date(user?.createdAt).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-danger hover:bg-danger/90 text-white rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="card card-elevated p-6 hover-lift">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">{stat.label}</h3>
                  <Icon size={24} className={stat.color} />
                </div>
                <p className="text-2xl font-manrope font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="card card-elevated p-8">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-8 border-b border-gray-300 dark:border-gray-700">
            {[
              { id: 'overview', label: '📊 Overview', icon: User },
              { id: 'account', label: '⚙️ Account Settings', icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-4 font-semibold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-primary-500 border-primary-500'
                    : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-primary-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Portfolio Overview */}
              <div>
                <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white mb-4">
                  📈 Portfolio Overview
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Holdings:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {portfolio.investments.length} stocks
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Available Balance:</span>
                    <span className="font-bold text-primary-500">
                      ₹{portfolio.balance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Transactions:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {portfolio.transactionHistory.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Watchlist Items:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {portfolio.watchlist.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white mb-4">
                  🎯 Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:shadow-lg shadow-primary-500/30 transition-all font-semibold hover-lift"
                  >
                    View Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentPage('watchlist')}
                    className="p-4 bg-gradient-to-r from-warning/50 to-warning/60 text-white rounded-lg hover:shadow-lg shadow-warning/30 transition-all font-semibold hover-lift"
                  >
                    View Watchlist
                  </button>
                  <button
                    onClick={() => setCurrentPage('portfolio')}
                    className="p-4 bg-gradient-to-r from-success/50 to-success/60 text-white rounded-lg hover:shadow-lg shadow-success/30 transition-all font-semibold hover-lift"
                  >
                    Portfolio Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-8">
              {/* Edit Profile */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <User size={24} className="text-primary-500" />
                    Profile Information
                  </h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary-500 hover:text-primary-600 font-semibold text-sm"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium">{user?.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Mail size={16} />
                      Email Address
                    </label>
                    <p className="text-gray-900 dark:text-white font-medium">{user?.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  {isEditing && (
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>

              {/* Security Settings */}
              <div className="border-t border-gray-300 dark:border-gray-700 pt-8">
                <h3 className="text-xl font-manrope font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <Lock size={24} className="text-danger" />
                  Security Settings
                </h3>
                <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-warning font-medium">
                    ⚠️ For security, you should change your password periodically.
                  </p>
                </div>
                <button className="px-6 py-2 bg-warning hover:bg-warning/90 text-white rounded-lg font-semibold transition-all hover-lift">
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
