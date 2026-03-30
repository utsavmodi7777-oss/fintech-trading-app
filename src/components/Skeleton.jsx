import React from 'react'

export const Skeleton = ({ className = '', width = '100%', height = '20px', count = 1 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gradient-to-r from-gray-200 dark:from-gray-700 via-gray-100 dark:via-gray-600 to-gray-200 dark:to-gray-700 rounded ${className}`}
          style={{ width, height }}
        />
      ))}
    </div>
  )
}

export const SkeletonCard = () => (
  <div className="card p-6 space-y-4">
    <Skeleton height="24px" width="40%" />
    <Skeleton height="32px" width="70%" />
    <Skeleton height="16px" width="100%" count={2} />
    <Skeleton height="40px" width="100%" />
  </div>
)

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="card p-4 flex items-center gap-4">
        <Skeleton width="20%" height="20px" />
        <Skeleton width="30%" height="20px" />
        <Skeleton width="25%" height="20px" />
        <Skeleton width="25%" height="20px" />
      </div>
    ))}
  </div>
)

export default Skeleton
