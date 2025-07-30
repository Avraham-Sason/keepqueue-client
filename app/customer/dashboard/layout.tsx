import type React from "react"
import { CustomerHeader } from "@/components/customer/customer-header"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredUserType="customer">
      <div className="min-h-screen bg-background">
        <CustomerHeader />
        <main className="container mx-auto py-6">{children}</main>
      </div>
    </ProtectedRoute>
  )
}
