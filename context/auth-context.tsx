"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    // Check for stored auth state on mount
    const storedUser = localStorage.getItem("nextbite_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email: email,
      avatar: "/placeholder.svg?height=32&width=32",
    }

    setUser(mockUser)

    if (rememberMe) {
      localStorage.setItem("nextbite_user", JSON.stringify(mockUser))
    }

    setIsLoading(false)
    router.push("/profile")
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockUser: User = {
      id: "1",
      name: name,
      email: email,
      avatar: "/placeholder.svg?height=32&width=32",
    }

    setUser(mockUser)
    localStorage.setItem("nextbite_user", JSON.stringify(mockUser))

    setIsLoading(false)
    router.push("/profile")
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("nextbite_user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
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
