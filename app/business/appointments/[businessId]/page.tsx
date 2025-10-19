import { BookingInterface } from "@/components/BookingInterface"

interface BookingPageProps {
  params: Promise<{
    businessId: string
  }>
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { businessId } = await params
  return <BookingInterface businessId={businessId} />
}
