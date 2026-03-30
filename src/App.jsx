import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { PortfolioProvider } from './context/PortfolioContext'
import { NotificationProvider } from './context/NotificationContext'
import Dashboard from './pages/Dashboard'
import WatchlistPage from './pages/WatchlistPage'
import PortfolioPage from './pages/PortfolioPage'
import ProfilePage from './pages/ProfilePage'
import AnalyticsPage from './pages/AnalyticsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Toast from './components/Toast'

// Groq API Key (user will set this)
const GROQ_API_KEY = localStorage.getItem('groq_api_key') || ''

function AppContent() {
  const { user, isAuthenticated } = useAuth()
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'

  // Demo login for testing
  useEffect(() => {
    const demoUser = localStorage.getItem('fintech_user')
    if (!demoUser && !isAuthenticated) {
      // Could auto-populate demo credentials here
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        {authMode === 'login' ? (
          <LoginPage
            onLoginSuccess={() => setCurrentPage('dashboard')}
            onSwitchToSignup={() => setAuthMode('signup')}
          />
        ) : (
          <SignupPage
            onSignupSuccess={() => {
              setAuthMode('login')
              setCurrentPage('dashboard')
            }}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
        <Toast />
      </>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'watchlist':
        return <WatchlistPage currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'portfolio':
        return <PortfolioPage currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'analytics':
        return <AnalyticsPage currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'profile':
        return (
          <ProfilePage
            onLogout={() => setCurrentPage('dashboard')}
            setCurrentPage={setCurrentPage}
          />
        )
      case 'dashboard':
      default:
        return (
          <Dashboard
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            groqApiKey={GROQ_API_KEY}
          />
        )
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {renderPage()}
      <Toast />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </PortfolioProvider>
    </AuthProvider>
  )
}

export default App
