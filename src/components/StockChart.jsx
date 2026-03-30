import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency, formatPercentage } from '../utils/formatting'

const StockChart = ({ data, type = 'line', timeframe = '1D' }) => {
  const isPositive = data[data.length - 1].price >= data[0].price

  return (
    <div className="w-full">
      {/* Chart Header */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm">Current Price</p>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-manrope font-bold text-gray-900">
            {formatCurrency(data[data.length - 1].price)}
          </h3>
          <span className={`text-lg font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? '+' : ''}{formatPercentage((data[data.length - 1].price - data[0].price) / data[0].price * 100)}
          </span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        {type === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#707070" style={{ fontSize: '12px' }} />
            <YAxis stroke="#707070" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #d8d8d8', borderRadius: '8px' }}
              formatter={(value) => formatCurrency(value)}
              labelStyle={{ color: '#707070' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#7180BF"
              dot={false}
              strokeWidth={3}
              isAnimationActive={true}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#707070" style={{ fontSize: '12px' }} />
            <YAxis stroke="#707070" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #d8d8d8', borderRadius: '8px' }}
              formatter={(value) => formatCurrency(value)}
            />
            <Bar dataKey="price" fill="#7180BF" radius={[8, 8, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export default StockChart
