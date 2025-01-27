import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

// Type definition type for user data
interface User {
  id: number
  name: string
  email: string
}

// Type definition for the context value
interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

// AuthContext with an initial value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Type definition for the props passed to the AuthProvider
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData)) // Saving user data to localStorage
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('user') // Clearing user data from localStorage
  }

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
