import Analytics from "./Analytics";

interface AnalyticsProps {
    params: Promise<{
        businessId: string;
    }>;
}

export default async function AnalyticsPage({ params }: AnalyticsProps) {
    const { businessId } = await params;
    return <Analytics />;
}
