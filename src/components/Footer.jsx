import React from 'react'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Github, Heart, ArrowRight } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 bg-gradient-to-r from-primary-600/20 to-primary-500/20 rounded-2xl p-8 border border-primary-500/20">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-manrope font-bold text-white mb-2">Stay Updated with Market Insights</h3>
            <p className="text-gray-400 mb-6">Get daily trading tips, market news, and investment strategies delivered to your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:shadow-lg shadow-primary-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                Subscribe
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-white font-manrope font-bold text-lg">FT</span>
              </div>
              <div>
                <h4 className="font-manrope font-bold text-white text-lg">FinTrade</h4>
                <p className="text-xs text-gray-500">Smart Trading Platform</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6">Empowering traders with intelligent tools and real-time market insights.</p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 active:scale-95">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 active:scale-95">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 active:scale-95">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 active:scale-95">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h5 className="text-white font-semibold mb-4">Product</h5>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Trading Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Analytics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">AI Insights</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-white font-semibold mb-4">Company</h5>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-semibold mb-4">Contact & Support</h5>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors cursor-pointer">
                <Mail size={16} /> support@fintrade.com
              </li>
              <li className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors cursor-pointer">
                <Phone size={16} /> +91 9898408110
              </li>
              <li className="flex items-start gap-2 text-gray-400 hover:text-primary-400 transition-colors cursor-pointer">
                <MapPin size={16} className="mt-1" />
                <span>Gandhinagar, India 382421</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Disclaimer</a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            <p>© {currentYear} <span className="text-primary-400 font-semibold">FinTrade</span>. All rights reserved.</p>
          </div>

          {/* Made with Love */}
          <div className="text-right text-sm text-gray-500 flex items-center justify-end gap-2">
            Made with
            <Heart size={16} className="text-danger animate-pulse" />
            for smart traders
          </div>
        </div>
      </div>

      {/* Floating Action Support Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transition-all transform hover:scale-110 active:scale-95">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </button>
      </div>
    </footer>
  )
}

export default Footer
