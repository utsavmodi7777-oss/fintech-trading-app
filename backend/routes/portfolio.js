const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');

// @route   GET /api/portfolio
// @desc    Get user portfolio
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      // Create new portfolio if not exists
      portfolio = new Portfolio({ user: req.user.id });
      await portfolio.save();
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
