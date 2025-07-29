import { BusinessMarketplace } from "@/components/marketplace/business-marketplace"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function CustomerMarketplacePage() {
  return (
    <ProtectedRoute requireCustomer={true}>
      <BusinessMarketplace />
    </ProtectedRoute>
  )
}
