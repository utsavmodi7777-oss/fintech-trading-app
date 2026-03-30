export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export const formatPercentage = (value) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value)
}

export const getColorClass = (value) => {
  return value >= 0 ? 'text-success' : 'text-danger'
}

export const getBackgroundColorClass = (value) => {
  return value >= 0 ? 'bg-green-50' : 'bg-red-50'
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}
