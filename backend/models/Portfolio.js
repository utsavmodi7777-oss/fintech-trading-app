const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  buyPrice: { type: Number, required: true },
  currentPrice: { type: Number, default: 0 },
});

const PortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: 100000 },
  investments: [InvestmentSchema],
  watchlist: [String],
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
