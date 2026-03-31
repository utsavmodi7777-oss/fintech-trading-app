const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');

// @route   POST /api/trade/buy
// @desc    Buy stock
// @access  Private
router.post('/buy', auth, async (req, res) => {
  const { symbol, quantity, price } = req.body;
  if (!symbol || !quantity || !price) {
    return res.status(400).json({ msg: 'Missing fields' });
  }
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      portfolio = new Portfolio({ user: req.user.id });
    }
    const totalCost = quantity * price;
    if (portfolio.balance < totalCost) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }
    // Deduct balance
    portfolio.balance -= totalCost;
    // Update holdings
    let investment = portfolio.investments.find(i => i.symbol === symbol);
    if (investment) {
      // Weighted average buy price
      const totalShares = investment.quantity + quantity;
      investment.buyPrice = ((investment.buyPrice * investment.quantity) + (price * quantity)) / totalShares;
      investment.quantity = totalShares;
    } else {
      portfolio.investments.push({ symbol, quantity, buyPrice: price, currentPrice: price });
    }
    await portfolio.save();
    // Store transaction
    const txn = new Transaction({ user: req.user.id, type: 'BUY', symbol, quantity, price });
    await txn.save();
    res.json({ portfolio, transaction: txn });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   POST /api/trade/sell
// @desc    Sell stock
// @access  Private
router.post('/sell', auth, async (req, res) => {
  const { symbol, quantity, price } = req.body;
  if (!symbol || !quantity || !price) {
    return res.status(400).json({ msg: 'Missing fields' });
  }
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(400).json({ msg: 'Portfolio not found' });
    }
    let investment = portfolio.investments.find(i => i.symbol === symbol);
    if (!investment || investment.quantity < quantity) {
      return res.status(400).json({ msg: 'Not enough shares to sell' });
    }
    // Update holdings
    investment.quantity -= quantity;
    if (investment.quantity === 0) {
      portfolio.investments = portfolio.investments.filter(i => i.symbol !== symbol);
    }
    // Add balance
    const totalProceeds = quantity * price;
    portfolio.balance += totalProceeds;
    await portfolio.save();
    // Store transaction
    const txn = new Transaction({ user: req.user.id, type: 'SELL', symbol, quantity, price });
    await txn.save();
    res.json({ portfolio, transaction: txn });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
