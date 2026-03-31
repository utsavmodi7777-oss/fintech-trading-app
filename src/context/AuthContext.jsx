
import { register, login as apiLogin } from '../api/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Restore user from JWT/localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const signup = useCallback(async (name, email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await register(name, email, password)
      localStorage.setItem('token', data.token)
      // Optionally fetch user profile from backend here
      setUser({ name, email })
      localStorage.setItem('user', JSON.stringify({ name, email }))
      return data
    } catch (err) {
      setError(err.response?.data?.msg || err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await apiLogin(email, password)
      localStorage.setItem('token', data.token)
      // Optionally fetch user profile from backend here
      setUser({ email })
      localStorage.setItem('user', JSON.stringify({ email }))
      return data
    } catch (err) {
      setError(err.response?.data?.msg || err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setError(null)
  }, [])

  const value = {
    user,
    isLoading,
    error,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
