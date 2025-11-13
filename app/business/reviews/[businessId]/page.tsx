import Reviews from "./Reviews";

interface ReviewsProps {
    params: Promise<{
        businessId: string;
    }>;
}

export default async function ReviewsPage({ params }: ReviewsProps) {
    const { businessId } = await params;
    return <Reviews />;
}
