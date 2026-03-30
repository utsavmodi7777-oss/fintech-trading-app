# FinTrade - Advanced Fintech Trading Platform

A modern, enterprise-grade fintech trading platform built with React, Vite, and Tailwind CSS. FinTrade empowers traders with intelligent tools, real-time analytics, AI-powered insights, and comprehensive portfolio management.

![FinTrade Banner](https://img.shields.io/badge/Status-Active%20Development-brightgreen) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-4.5.14-purple) ![License](https://img.shields.io/badge/License-MIT-green)

##  Features

###  **Authentication System**
- Secure user signup and login with password strength validation
- JWT-like session management with localStorage persistence
- Pre-loaded demo account: utsav@gmail.com / utsav123
- User profile management with editable account settings

###  **Advanced Analytics Dashboard**
- 9+ Interactive Charts using Recharts with real-time metrics
- Portfolio composition pie charts
- Monthly profit trends vs market index
- P&L distribution analysis
- Stock-wise detailed breakdown tables
- Risk metrics dashboard (Volatility, Sharpe Ratio, Max Drawdown)
- Individual stock gain/loss tracking
- Portfolio health score

###  **Portfolio Management**
- Real-time portfolio tracking with 5 sample stocks
- Watchlist management for monitoring stocks
- Transaction history tracking
- Available balance display ( starting capital)

###  **Watchlist & Market Data**
- Monitor multiple stocks simultaneously
- Track price changes and percentage gains/losses
- Add/remove stocks from watchlist

###  **Stock News Section**
- Latest market news with sentiment indicators
- Impact level badges (High, Medium, Low)
- Stock-specific news feed

###  **Notification Center**
- Bell icon with unread count badge
- Professional dropdown interface
- Mark notifications as read

###  **AI-Powered Recommendations**
- Groq API integration (mixtral-8x7b model)
- Stock analysis and recommendations
- Portfolio optimization suggestions

###  **Premium UI/UX Design**
- Glasmorphism design system
- Smooth animations and micro-interactions
- Full dark mode support
- Mobile responsive on all devices

##  **Technology Stack**

**Frontend:** React 18.2.0 | Vite 4.5.14 | Tailwind CSS 3.3.0
**Charts:** Recharts 2.10.0 | Animations: Framer Motion
**Icons:** Lucide React 0.263 | API: Axios
**State:** React Context API | Storage: localStorage

##  **Project Structure**

src/ contains:
- pages/ - LoginPage, SignupPage, Dashboard, AnalyticsPage, ProfilePage, etc.
- components/ - Navbar, Footer, NotificationCenter, etc.
- context/ - AuthContext, PortfolioContext, NotificationContext
- hooks/ - useGroqAI for AI integration

##  **Getting Started**

### Prerequisites
- Node.js 16.0+
- npm 8.0+

### Installation

1. Clone: git clone https://github.com/utsavmodi7777-oss/fintech-trading-app.git
2. Install: 
pm install
3. Start: 
pm run dev
4. Open: http://localhost:5173

### Demo Account
- Email: utsav@gmail.com
- Password: utsav123
- Portfolio: 5 stocks with sample P&L data
- Balance: 450,000

##  **Sample Data**

Pre-loaded portfolio:
- AAPL - 50 shares @ 150.25 (Current: 165.50)
- GOOGL - 30 shares @ 140.75 (Current: 155.30)
- MSFT - 40 shares @ 380.50 (Current: 420.80)
- TSLA - 20 shares @ 250.00 (Current: 285.60)
- AMZN - 25 shares @ 175.50 (Current: 195.75)

##  **Available Scripts**


pm run dev - Start development server

pm run build - Build for production

pm run preview - Preview production build

pm run lint - Run ESLint

##  **AI Integration**

1. Get Groq API key from https://console.groq.com/keys
2. Add it in the app settings
3. Enable stock analysis and recommendations

##  **Browser Support**

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

##  **Future Enhancements**

- Real-time stock price API integration
- Backend with Supabase
- Two-factor authentication (2FA)
- Email verification
- Advanced technical indicators
- Trading bot automation
- Social features
- Mobile app (React Native)
- Push notifications

##  **Contact & Support**

- Email: support@fintrade.com
- Phone: +91 9898408110
- Location: Gandhinagar, India 382421
- GitHub: https://github.com/utsavmodi7777-oss

##  **License**

MIT License - free to use and modify

##  **Author**

Utsav Modi
- GitHub: @utsavmodi7777-oss
- Email: utsavmodi7777@gmail.com
- Location: Gandhinagar, India

##  **Version History**

### v1.0.0 (March 30, 2026)
- Initial release 
- Complete authentication system
- Advanced analytics dashboard (9+ charts)
- Portfolio management
- AI integration with Groq API
- Professional UI/UX with glasmorphism
- Full dark mode support
- Mobile responsive design
- All features implemented and tested

---

Made with  by Utsav Modi

For issues, feature requests, or contributions, reach out via GitHub or email.
