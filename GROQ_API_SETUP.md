# GROQ API Setup Guide

## 🤖 Enable AI Features in 2 Minutes

Your FinTrade app already has Groq AI integration built-in! Follow these steps to activate it:

---

## Step 1: Get Your Groq API Key (1 min)

1. Go to: **https://console.groq.com/**
2. Sign up or login with your account
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy your API key (looks like: `gsk_xxxxxxxxxxxxxxxxxxxx`)
6. Keep it safe! ⚠️

---

## Step 2: Add API Key to App (30 seconds)

### Method 1: Browser Console (Quick Test)
1. Open your app: **http://localhost:5175/**
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Paste this:
```javascript
localStorage.setItem('groq_api_key', 'paste-your-api-key-here')
```
5. Replace `paste-your-api-key-here` with your actual Groq API key
6. Press Enter
7. Refresh the page (F5)

**Done! ✅** AI features now enabled!

---

### Method 2: Settings Page (Coming Soon)
We'll add a proper settings page where you can enter the API key through the UI.

**How to add when ready:**
1. Create Settings page
2. Add form input for Groq API key
3. Save to localStorage on submit
4. Show success message

---

## Step 3: Use AI Features

You'll see AI buttons in different parts of the app:

### 📊 Analytics Page
- **"AI Analysis"** button - Get stock-specific recommendations
- **"Portfolio Check"** button - Analyze your entire portfolio

### 🏠 Dashboard
- AI insights for top stocks
- Buy/sell signals
- Risk assessment

### 📈 Stock Details
- Individual stock analysis
- Technical insights
- Market sentiment

---

## 🎯 What AI Can Do

Once activated, Groq AI will provide:

✅ **Stock Recommendations**
- Buy/Sell signals
- Entry/Exit points
- Risk assessment
- Growth potential

✅ **Portfolio Analysis**
- Diversification suggestions
- Risk profile assessment
- Rebalancing recommendations
- Performance tracking tips

✅ **Market Insights**
- Trend analysis
- Sector performance
- Comparative analysis
- Economic factors

✅ **Investment Guidance**
- Best opportunities
- Worst performers to review
- Sector rotation suggestions
- Portfolio optimization tips

---

## 💰 Groq Pricing (FREE TIER AVAILABLE!)

- **Free Plan**: 30 requests/minute
- **Perfect for**: Solo traders, learners, small portfolios
- **Cost**: $0 for free tier
- **Paid Plans**: Start at $1/month for higher limits

---

## 🔧 Troubleshooting

### "API Key not working"
- Check key is copied correctly (no spaces)
- Verify it's from Groq, not another service
- Make sure key is current (not expired)

### "API Error: 401 Unauthorized"
- API key is invalid
- Double-check you copied the full key
- Generate a new key from Groq console

### "Rate limit exceeded"
- You've used 30+ requests in a minute
- Wait a moment and try again
- Upgrade to paid plan for higher limits

### "No AI button showing"
- Refresh the page (F5)
- Check localStorage was set correctly:
  ```javascript
  console.log(localStorage.getItem('groq_api_key'))
  ```

---

## 🚀 Quick Test

After adding your API key:

```javascript
// Test in console:
const apiKey = localStorage.getItem('groq_api_key');
console.log('API Key Set:', apiKey ? '✅ Yes' : '❌ No');

// Test API call:
fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'mixtral-8x7b-32768',
    messages: [
      {role: 'user', content: 'What is 2+2?'}
    ]
  })
})
.then(r => r.json())
.then(d => console.log('✅ API Working:', d.choices[0].message.content))
.catch(e => console.error('❌ Error:', e.message))
```

---

## 📚 Advanced: How AI Works

The app uses **Groq's mixtral-8x7b-32768** model:
- **Speed**: Ultra-fast inference
- **Context**: 32K token window
- **Expertise**: Financial analysis, market insights
- **Accuracy**: State-of-the-art LLM performance

### System Prompt (Always Included):
```
"You are a professional stock market advisor with expertise in 
Indian equity markets. Provide concise, actionable investment advice. 
Consider risk-reward ratios, portfolio diversification, and current 
market conditions. Format your response as clear recommendations."
```

---

## 🔒 Security Note

⚠️ **Your API Key is Private!**
- Never share your API key
- Never commit it to GitHub
- Keep it in localStorage only (client-side)
- For production, use backend proxy

---

## 💡 Tips for Best Results

1. **Ask Specific Questions**
   - ✅ "Should I buy AAPL at $150?"
   - ❌ "What should I do with my money?"

2. **Include Context**
   ```
   "I have $50K, risk tolerance 70%, invested in tech. 
   Should I add GOOGL to my portfolio?"
   ```

3. **Get Multiple Perspectives**
   - Ask same question twice
   - AI gives different insights

4. **Review AI Suggestions**
   - AI helps decision-making, not final authority
   - Always do your own research
   - Consider your financial goals

---

## 📞 Support

**If you need help:**
- Groq API Docs: https://console.groq.com/docs
- API Status: https://status.groq.com/
- Contact: support@groq.com

---

**Your AI-Powered Trading Assistant is Ready! 🚀**

Next time you open Analytics → Click AI Analysis button → Get instant insights!
