import React from 'react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '../utils/formatting'

const CandlestickChart = ({ data }) => {
  const isPositive = data[data.length - 1].close >= data[0].open

  // Transform data for candlestick visualization
  const candleData = data.map((candle) => ({
    ...candle,
    range: [candle.low, candle.high],
    body: [Math.min(candle.open, candle.close), Math.abs(candle.close - candle.open)],
  }))

  const CustomCandle = (props) => {
    const { x, y, width, yAxis, payload } = props
    if (!payload) return null

    const scale = yAxis.scale
    const yBase = y(payload.low)
    const yTop = y(payload.high)
    const yOpen = y(payload.open)
    const yClose = y(payload.close)

    const isUp = payload.close >= payload.open
    const color = isUp ? '#4d8355' : '#e85d5d'

    return (
      <g>
        {/* Wick */}
        <line x1={x + width / 2} y1={yTop} x2={x + width / 2} y2={yBase} stroke={color} strokeWidth={1} />
        {/* Body */}
        <rect
          x={x + width * 0.25}
          y={Math.min(yOpen, yClose)}
          width={width * 0.5}
          height={Math.abs(yClose - yOpen) || 2}
          fill={color}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-gray-600 text-sm">Candlestick View</p>
        <h3 className="text-3xl font-manrope font-bold text-gray-900">
          {formatCurrency(data[data.length - 1].close)}
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={candleData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#707070" style={{ fontSize: '12px' }} />
          <YAxis stroke="#707070" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #d8d8d8', borderRadius: '8px' }}
            cursor={{ fill: 'rgba(113, 128, 191, 0.1)' }}
            content={({ active, payload }) => {
              if (active && payload && payload[0]) {
                const data = payload[0].payload
                return (
                  <div className="bg-white border border-gray-300 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-gray-900">{data.date}</p>
                    <p className="text-gray-600">Open: {formatCurrency(data.open)}</p>
                    <p className="text-gray-600">High: {formatCurrency(data.high)}</p>
                    <p className="text-gray-600">Low: {formatCurrency(data.low)}</p>
                    <p className="text-gray-600">Close: {formatCurrency(data.close)}</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="body" shape={<CustomCandle />} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CandlestickChart
