"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Calendar,
    Users,
    DollarSign,
    TrendingUp,
    Clock,
    Star,
    Phone,
    Mail,
    MapPin,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    AlertCircle,
    Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useBusinessesStore } from "@/lib/store";
import { useAuthStore } from "@/lib/store";
import { useBusiness } from "../../hooks";
import type { User, CalendarEventWithRelations } from "@/lib/types";
import { timestampToString, timestampToMillis } from "@/lib/helpers";
import { useLanguage } from "@/hooks";
import BusinessLoading from "../../loading";
import { BusinessDetailsSections, QuickActionsSection, RecentAppointmentsSection, StatsSection, WelcomeSection } from "./components";

export function DashboardOverview() {
    const params = useParams<{ businessId: string }>();
    const businessIdParam = params?.businessId;
    const businessId = Array.isArray(businessIdParam) ? businessIdParam[0] : businessIdParam;
    
    useBusiness(businessId);

    const user = useAuthStore.user();
    const businessOwner = user as User;

    const currentBusiness = useBusinessesStore.currentBusiness();

    if (!businessOwner || businessOwner.type !== "business") {
        return <BusinessLoading />;
    }

    if (!currentBusiness || (businessId && currentBusiness.id !== businessId)) {
        return <BusinessLoading />;
    }

    

    return (
        <div className="space-y-8">
            <WelcomeSection />
            <StatsSection />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <RecentAppointmentsSection />
                <BusinessDetailsSections />
            </div>
            <QuickActionsSection />
        </div>
    );
}
