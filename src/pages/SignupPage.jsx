import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'

const SignupPage = ({ onSignupSuccess, onSwitchToLogin }) => {
  const { signup, error: authError } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'password') {
      let strength = 0
      if (value.length >= 8) strength++
      if (/[A-Z]/.test(value)) strength++
      if (/[0-9]/.test(value)) strength++
      if (/[^a-zA-Z0-9]/.test(value)) strength++
      setPasswordStrength(strength)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    try {
      await signup(formData.email, formData.password, formData.name)
      onSignupSuccess?.()
    } catch (err) {
      setError(err.message || 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  const strengthColors = ['bg-danger', 'bg-warning', 'bg-warning', 'bg-success']
  const strengthTexts = ['Weak', 'Fair', 'Good', 'Strong']

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center px-4 py-8">
      <div className="glass-lg max-w-md w-full p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center mx-auto shadow-lg">
            <span className="text-white font-manrope font-bold text-2xl">FT</span>
          </div>
          <h1 className="text-3xl font-manrope font-bold text-white">Join FinTrade</h1>
          <p className="text-gray-700">Create your trading account today</p>
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
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 text-gray-900 placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 text-gray-900 placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                required
              />
            </div>
            {formData.password && (
              <div className="mt-2 space-y-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-600'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-700">
                  Strength: <span className={`font-semibold ${strengthColors[passwordStrength - 1]}`}>{strengthTexts[passwordStrength - 1] || 'Weak'}</span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 text-gray-900 placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                required
              />
              {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <CheckCircle size={18} className="absolute right-3 top-3.5 text-success" />
              )}
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" className="rounded mt-1" required />
            <span className="text-sm text-gray-800">
              I agree to the <span className="text-primary-600 font-semibold">Terms & Conditions</span> and{' '}
              <span className="text-primary-600 font-semibold">Privacy Policy</span>
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-primary-400 to-primary-600 text-white font-semibold rounded-lg hover:shadow-lg shadow-primary-500/30 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-700">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
