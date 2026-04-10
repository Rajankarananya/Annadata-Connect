import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

/**
 * AuthContext - Manages authentication state
 * Stores: token, user data, role, loading state
 */
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('authToken') || null,
    user: JSON.parse(localStorage.getItem('authUser') || 'null'),
    role: localStorage.getItem('authRole') || null,
    isLoading: false,
    error: null,
  })

  // Login
  const login = useCallback(async (email, password) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      // Will be called with authApi.login once Dev B provides endpoint
      // For now, this is a placeholder
      throw new Error('Auth endpoints not yet available from Dev B')
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }))
      throw error
    }
  }, [])

  // Register
  const register = useCallback(async (data) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      // Will be called with authApi.register once Dev B provides endpoint
      throw new Error('Auth endpoints not yet available from Dev B')
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }))
      throw error
    }
  }, [])

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    localStorage.removeItem('authRole')
    setAuth({
      token: null,
      user: null,
      role: null,
      isLoading: false,
      error: null,
    })
  }, [])

  // Update auth on successful login (called after API returns)
  const setAuthSuccess = useCallback((token, user, role) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('authUser', JSON.stringify(user))
    localStorage.setItem('authRole', role)
    setAuth({
      token,
      user,
      role,
      isLoading: false,
      error: null,
    })
  }, [])

  const isAuthenticated = !!auth.token
  const isFarmer = auth.role === 'farmer'
  const isAdmin = auth.role === 'admin' || auth.role === 'field_officer'

  const value = {
    ...auth,
    login,
    register,
    logout,
    setAuthSuccess,
    isAuthenticated,
    isFarmer,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
