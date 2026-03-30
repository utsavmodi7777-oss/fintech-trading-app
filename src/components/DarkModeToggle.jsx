import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '../hooks/useRealtimePrice'

const DarkModeToggle = () => {
  const { isDark, toggle } = useDarkMode()

  return (
    <button
      onClick={toggle}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  )
}

export default DarkModeToggle
