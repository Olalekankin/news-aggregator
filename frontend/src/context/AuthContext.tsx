import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

// Type definition for user data
export interface UserPreferences {
  id: number
  user_id: number
  preferred_sources: string[]
  preferred_categories: string[]
  preferred_authors: string[]
  created_at: string
  updated_at: string
}
interface User {
  id: number
  name: string
  email: string
  preferences?: UserPreferences
}

// Type definition for the context value
interface AuthContextType {
  isAuthenticated: boolean // Tracks if the user is logged in
  user: User | null // Stores the current user's information
  token: string | null // Stores the authentication token
  login: (userData: User, token: string) => void // Logs in a user and sets their information
  logout: () => void // Logs out the user and clears their data
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode // The children components that will use this context
}

// AuthProvider component to provide authentication context to its children
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false) // State for authentication status
  const [user, setUser] = useState<User | null>(null) // State for user information
  const [token, setToken] = useState<string | null>(null) // State for the auth token

  // Logs in a user, saves their data, and sets them as authenticated
  const login = (userData: User, token: string) => {
    try {
      setIsAuthenticated(true)
      setUser(userData)
      setToken(token)
      localStorage.setItem('user', JSON.stringify(userData)) // Save user data to localStorage
      localStorage.setItem('token', token) // Save token to localStorage
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // Logs out a user, clears their data, and removes them from localStorage
  const logout = () => {
    try {
      setIsAuthenticated(false)
      setUser(null)
      setToken(null)
      localStorage.removeItem('user') 
      localStorage.removeItem('token') 
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user') 
      const storedToken = localStorage.getItem('token') 
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser)) // Parse and set user data
        setToken(storedToken) // Set token
        setIsAuthenticated(true) // Set authentication status
      }
    } catch (error) {
      console.error('Failed to load auth data:', error)
    }
  }, [])

  return (
    // Provide authentication context to children components
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout }}
    >
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
