"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type User, allUsers } from "./mock-data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
  isBusinessOwner: boolean
  isCustomer: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("keepqueue-user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        localStorage.removeItem("keepqueue-user")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Find user in mock data
    const foundUser = allUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("keepqueue-user", JSON.stringify(foundUser))
      return { success: true }
    } else {
      return { success: false, error: "כתובת מייל או סיסמה שגויים" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("keepqueue-user")
  }

  const isAuthenticated = !!user
  const isBusinessOwner = user?.type === "business"
  const isCustomer = user?.type === "customer"

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isBusinessOwner,
        isCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
