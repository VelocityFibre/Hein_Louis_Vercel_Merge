"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  initials: string
  role: string
  email: string
}

type AuthContextType = {
  currentUser: User | null
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const predefinedUsers: User[] = [
  { id: "1", name: "John Doe", initials: "JD", role: "Project Manager", email: "john.doe@velocity.com" },
  { id: "2", name: "Jane Smith", initials: "JS", role: "Administrator", email: "jane.smith@velocity.com" },
  { id: "3", name: "Alice Brown", initials: "AB", role: "Contractor", email: "alice.brown@contractor.com" },
]

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    try {
      const storedUser = localStorage.getItem("velocityFibreUser")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setCurrentUser(parsedUser)
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error)
      localStorage.removeItem("velocityFibreUser")
    }
    setIsLoading(false)
  }, [isMounted])

  const login = (user: User) => {
    setCurrentUser(user)
    if (isMounted) {
      try {
        localStorage.setItem("velocityFibreUser", JSON.stringify(user))
      } catch (error) {
        console.error("Error saving user to localStorage:", error)
      }
    }
    router.push("/")
  }

  const logout = () => {
    console.log("Logout function called") // Debug log
    setCurrentUser(null)
    if (isMounted) {
      try {
        localStorage.removeItem("velocityFibreUser")
      } catch (error) {
        console.error("Error removing user from localStorage:", error)
      }
    }
    router.push("/login")
  }

  // Don't render anything until we're mounted on the client
  if (!isMounted) {
    return <div>Loading...</div>
  }

  return <AuthContext.Provider value={{ currentUser, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
