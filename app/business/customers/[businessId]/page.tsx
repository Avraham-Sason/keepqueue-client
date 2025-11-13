import Customers from "./Customers";

interface BookingPageProps {
    params: Promise<{
        businessId: string;
    }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
    const { businessId } = await params;
    return <Customers />;
}
