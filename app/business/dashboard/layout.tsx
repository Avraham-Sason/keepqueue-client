import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { BusinessSidebar } from "@/components/business/business-sidebar"
import { BusinessHeader } from "@/components/business/business-header"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function BusinessDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requireBusinessOwner={true}>
      <SidebarProvider>
        <BusinessSidebar />
        <SidebarInset>
          <BusinessHeader />
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
