import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

const LoginPage = ({ onLoginSuccess, onSwitchToSignup }) => {
  const { login, error: authError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      onLoginSuccess?.()
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center px-4">
      <div className="glass-lg max-w-md w-full p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center mx-auto shadow-lg">
            <span className="text-white font-manrope font-bold text-2xl">FT</span>
          </div>
          <h1 className="text-3xl font-manrope font-bold text-white">Welcome Back</h1>
          <p className="text-gray-700">Sign in to your FinTrade account</p>
        </div>

        {/* Error Alert */}
        {(error || authError) && (
          <div className="bg-danger/20 border border-danger/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-danger flex-shrink-0 mt-0.5" />
            <p className="text-danger text-sm font-medium">{error || authError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 text-gray-900 placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 text-gray-900 placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-700">Remember me</span>
            </label>
            <button type="button" className="text-primary-600 hover:text-primary-700 transition-colors font-medium">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-primary-400 to-primary-600 text-white font-semibold rounded-lg hover:shadow-lg shadow-primary-500/30 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Test Credentials */}
        <div className="bg-primary-500/10 border border-primary-400/30 rounded-lg p-3 text-xs text-gray-800">
          <p className="font-semibold text-primary-700 mb-1">Demo Credentials:</p>
          <p>Email: utsav@gmail.com</p>
          <p>Password: utsav123</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
