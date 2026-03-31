# Price Alerts System Guide

## Overview

The Price Alerts system allows users to set up notifications when stock prices reach specific targets. Get instant alerts 🔔 when your watched stocks hit your target prices!

---

## Features

✅ **Set Price Alerts**
- Alert when stock price goes ABOVE a target price
- Alert when stock price goes BELOW a target price
- Create unlimited alerts

✅ **Alert Management**
- Enable/disable alerts without deleting them
- Edit target prices on the fly
- Clear history after reviewing

✅ **Real-Time Notifications**
- Toast notifications when alert triggers
- Desktop notifications (coming soon)
- Alert history with timestamps

✅ **Alert History**
- Track all triggered alerts
- See when alerts were created/deleted
- Review past notifications

---

## How to Use

### 1. **Go to Alerts Page**
   - Click **"Alerts"** in the navigation bar
   - Or from Dashboard → Alerts link

### 2. **Create a New Alert**
   - Click **"New Alert"** button
   - Fill in:
     - **Stock Symbol**: E.g., AAPL, GOOGL, TSLA
     - **Condition**: "Price Above" or "Price Below"
     - **Target Price**: Your desired price point
   - Click **"Create Alert"**

### 3. **Manage Alerts**
   - **Toggle**: Click toggle button to enable/disable
   - **Edit Price**: Click the price to edit target
   - **Delete**: Click trash icon to remove alert
   - **View History**: See recent activity on right panel

---

## Example Scenarios

### Scenario 1: Buy When Price Drops
"I want to buy AAPL but only if it drops below $170"
1. Go to Alerts
2. Create Alert:
   - Symbol: AAPL
   - Condition: Price Below
   - Target: 170
3. Get notified when AAPL ≤ $170 🎉

### Scenario 2: Sell When Price Rises
"I want to sell GOOGL if it goes above $130"
1. Create Alert:
   - Symbol: GOOGL
   - Condition: Price Above
   - Target: 130
2. Receive notification when GOOGL ≥ $130 🚀

### Scenario 3: Monitor Multiple Stocks
Create multiple alerts to track several stocks at once:
- AAPL below $170
- GOOGL above $130
- TSLA below $240
- MSFT above $350

All tracked in one place! 📊

---

## Alert Status

### Active Alerts ✅
- Highlighted in GREEN
- Actively monitoring prices
- Will trigger notifications

### Disabled Alerts ⚪
- Highlighted in GRAY
- Not monitoring anymore
- Can be re-enabled anytime

### Triggered Alerts 🎯
- Shows checkmark ✓
- Triggered date/time displayed
- Can still be edited/deleted

---

## Notifications

### Toast Alerts 🔔
- Pop-up notifications in bottom-right
- Auto-dismiss after 5 seconds
- Shows: Stock, Price, Condition, Target

Example:
```
AAPL
Price is now $169.50 (below $170)
```

### Notification History
- See all past notifications
- View timestamp for each
- Track alert activity

---

## Tips & Best Practices

1. **Start with 3-5 alerts** - Don't create too many at once
2. **Update prices** - Edit targets if market conditions change
3. **Disable before takeover** - Turn off alerts if you plan to sell
4. **Review history** - Check what alerts triggered last week
5. **Combine with Portfolio** - Export portfolio before big price moves

---

## Limitations & Future Enhancements

### Current (✅)
- Price alerts (above/below)
- Edit target prices
- Alert history
- Toast notifications

### Coming Soon (🔄)
- Email notifications
- SMS alerts
- Percentage-based alerts (e.g., "up 10%")
- Multiple conditions (AND/OR logic)
- Alert templates
- Scheduled alerts

---

## Troubleshooting

### Q: Alert not triggering?
A: Make sure:
1. Alert is **Active** (toggle on)
2. Stock symbol is correct (AAPL not Apple)
3. Price hasn't already surpassed target
4. Refresh prices from Dashboard

### Q: Can't see notifications?
A: Check:
1. Notifications appear in bottom-right corner
2. Scroll down if many alerts
3. Check notification history panel

### Q: How often are prices checked?
A: Prices update every 5 minutes (based on API limit tier)
- Free tier: 5 checks/minute
- Paid tier: Real-time updates

---

## API Integration

Alerts work with the Real-Time Stock Price system:
- Fetches latest prices every 5 minutes
- Checks all active alerts
- Triggers notifications when conditions met
- Stores history in localStorage

---

## Data Storage

All alert data is stored in:
- **Browser localStorage** - Client-side storage
- **Persists** across page refreshes
- **Clears** when browser data deleted
- Future: Cloud sync coming soon

---

## Privacy

Your alerts are:
✅ Stored locally on your device
✅ Never sent to external servers
✅ Completely private
✅ Under your full control

---

## Contact & Support

For issues or feature requests:
- GitHub: [fintech-trading-app](https://github.com/utsavmodi7777-oss/fintech-trading-app)
- Email: support@fintrade.com
- Discord: [Community](coming-soon)

---

## Version History

- **v1.0.0** (Current): Initial launch with price alerts
- **v1.1.0** (Soon): Email/SMS notifications
- **v2.0.0** (Soon): Advanced alert rules & automation
