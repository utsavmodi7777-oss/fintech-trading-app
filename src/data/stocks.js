// Mock stock data for different time periods
const generateChartData = (days) => {
  const data = []
  let price = 150
  for (let i = days; i >= 0; i--) {
    price += (Math.random() - 0.5) * 5
    data.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: Math.max(100, Math.round(price * 100) / 100),
      high: Math.round((price + Math.random() * 5) * 100) / 100,
      low: Math.round((price - Math.random() * 5) * 100) / 100,
      open: Math.round((price + (Math.random() - 0.5) * 3) * 100) / 100,
      close: price,
    })
  }
  return data
}

export const STOCK_DATA = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.5,
    change: 2.5,
    changePercent: 1.44,
    volume: '52.5M',
    marketCap: '2.8T',
    pe: 28.5,
    high52w: 199.62,
    low52w: 124.17,
    chart1D: generateChartData(1),
    chart1W: generateChartData(7),
    chart1M: generateChartData(30),
    chart1Y: generateChartData(365),
  },
  GOOGL: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 120.75,
    change: 1.8,
    changePercent: 1.51,
    volume: '28.3M',
    marketCap: '1.6T',
    pe: 24.2,
    high52w: 152.84,
    low52w: 88.44,
    chart1D: generateChartData(1),
    chart1W: generateChartData(7),
    chart1M: generateChartData(30),
    chart1Y: generateChartData(365),
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 330.25,
    change: 3.2,
    changePercent: 0.98,
    volume: '18.9M',
    marketCap: '2.5T',
    pe: 32.1,
    high52w: 369.99,
    low52w: 213.43,
    chart1D: generateChartData(1),
    chart1W: generateChartData(7),
    chart1M: generateChartData(30),
    chart1Y: generateChartData(365),
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 242.84,
    change: -5.2,
    changePercent: -2.1,
    volume: '115.4M',
    marketCap: '768.3B',
    pe: 45.3,
    high52w: 299.29,
    low52w: 101.81,
    chart1D: generateChartData(1),
    chart1W: generateChartData(7),
    chart1M: generateChartData(30),
    chart1Y: generateChartData(365),
  },
  AMZN: {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 145.92,
    change: 2.1,
    changePercent: 1.46,
    volume: '42.7M',
    marketCap: '1.5T',
    pe: 54.2,
    high52w: 188.65,
    low52w: 65.72,
    chart1D: generateChartData(1),
    chart1W: generateChartData(7),
    chart1M: generateChartData(30),
    chart1Y: generateChartData(365),
  },
}

export const TOP_GAINERS = [
  { symbol: 'NVDA', name: 'NVIDIA', change: 5.2, price: 875.42 },
  { symbol: 'META', name: 'Meta', change: 4.8, price: 312.56 },
  { symbol: 'AMD', name: 'AMD', change: 3.9, price: 156.78 },
]

export const TOP_LOSERS = [
  { symbol: 'INTC', name: 'Intel', change: -3.2, price: 35.42 },
  { symbol: 'IBM', name: 'IBM', change: -2.8, price: 156.32 },
  { symbol: 'CSCO', name: 'Cisco', change: -2.1, price: 52.18 },
]

export const TRENDING_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', volume: '52.5M' },
  { symbol: 'NVDA', name: 'NVIDIA', volume: '45.3M' },
  { symbol: 'TSLA', name: 'Tesla Inc.', volume: '115.4M' },
]
