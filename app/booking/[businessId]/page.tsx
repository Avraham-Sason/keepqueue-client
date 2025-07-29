import { BookingInterface } from "@/components/booking-interface"

interface BookingPageProps {
  params: {
    businessId: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  return <BookingInterface businessId={params.businessId} />
}
