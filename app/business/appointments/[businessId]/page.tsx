interface BookingPageProps {
    params: Promise<{
        businessId: string;
    }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
    const { businessId } = await params;
    return (
        <div>
            <h1>Appointments</h1>
        </div>
    );
}
