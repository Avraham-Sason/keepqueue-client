"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: "business" | "customer"
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredUserType, redirectTo = "/" }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo)
      return
    }

    if (requiredUserType && user?.type !== requiredUserType) {
      // Redirect to appropriate dashboard based on user type
      if (user?.type === "business") {
        router.push("/business/dashboard")
      } else if (user?.type === "customer") {
        router.push("/customer/marketplace")
      } else {
        router.push(redirectTo)
      }
      return
    }
  }, [isAuthenticated, user, requiredUserType, redirectTo, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>מפנה לדף ההתחברות...</p>
        </div>
      </div>
    )
  }

  if (requiredUserType && user?.type !== requiredUserType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>מפנה לדף המתאים...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
