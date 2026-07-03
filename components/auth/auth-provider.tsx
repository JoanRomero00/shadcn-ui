"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

export interface User {
  name: string
  email: string
  roles: string[]
  avatar?: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

interface DecodedToken {
  sub?: string
  username?: string
  email?: string
  roles?: string[]
  exp?: number
  [key: string]: any
}

function decodeJwt(token: string): DecodedToken | null {
  try {
    const base64Url = token.split(".")[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decodificando JWT:", error)
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const router = useRouter()

  const checkAuth = React.useCallback(() => {
    if (typeof window === "undefined") return

    const token = localStorage.getItem("jwt_token")
    if (!token) {
      setIsAuthenticated(false)
      setUser(null)
      setIsLoading(false)
      return
    }

    const decoded = decodeJwt(token)
    if (!decoded) {
      // Token inválido o corrupto
      localStorage.removeItem("jwt_token")
      setIsAuthenticated(false)
      setUser(null)
      setIsLoading(false)
      return
    }

    // Verificar si el token ha expirado
    const currentTime = Date.now() / 1000
    if (decoded.exp && decoded.exp < currentTime) {
      // Token expirado
      localStorage.removeItem("jwt_token")
      setIsAuthenticated(false)
      setUser(null)
      setIsLoading(false)
      return
    }

    // Configurar información del usuario
    const username = decoded.username || decoded.sub || "Usuario"
    const email = decoded.email || (decoded.sub && decoded.sub.includes("@") ? decoded.sub : `${username}@santafe.gov.ar`)
    const roles = decoded.roles || []

    setIsAuthenticated(true)
    setUser({
      name: username,
      email: email,
      roles: roles,
    })
    setIsLoading(false)
  }, [])

  // Verificar la sesión al montar
  React.useEffect(() => {
    checkAuth()
    
    // Escuchar cambios de almacenamiento (por si se abre en otra pestaña)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "jwt_token") {
        checkAuth()
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [checkAuth])

  const login = React.useCallback((token: string) => {
    localStorage.setItem("jwt_token", token)
    
    const decoded = decodeJwt(token)
    if (decoded) {
      const username = decoded.username || decoded.sub || "Usuario"
      const email = decoded.email || (decoded.sub && decoded.sub.includes("@") ? decoded.sub : `${username}@santafe.gov.ar`)
      const roles = decoded.roles || []

      setIsAuthenticated(true)
      setUser({
        name: username,
        email: email,
        roles: roles,
      })
    }
    setIsLoading(false)
  }, [])

  const logout = React.useCallback(() => {
    localStorage.removeItem("jwt_token")
    setIsAuthenticated(false)
    setUser(null)
    router.push("/login")
  }, [router])

  const value = React.useMemo(() => ({
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  }), [isAuthenticated, user, isLoading, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
