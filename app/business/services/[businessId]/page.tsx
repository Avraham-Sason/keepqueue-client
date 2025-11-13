import Services from "./Services";

interface ServicesProps {
    params: Promise<{
        businessId: string;
    }>;
}

export default async function ServicesPage({ params }: ServicesProps) {
    const { businessId } = await params;
    return <Services />;
}
