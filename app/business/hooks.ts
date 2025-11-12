"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore, useBusinessesStore } from "@/lib/store";
import { getBusinessById, getBusinessByOwnerId } from "./helpers";
import { useRouter, usePathname } from "next/navigation";

export const useBusiness = (businessId?: string) => {
    const user = useAuthStore.user();
    const setCurrentBusiness = useBusinessesStore.setCurrentBusiness();
    const userId = user?.id;

    const { data: queryData, isLoading } = useQuery({
        queryKey: ["business", businessId || userId],
        queryFn: async (context) => {
            console.log("⚡ fetching business");
            const business = businessId
                ? await getBusinessById(businessId, context.signal)
                : await getBusinessByOwnerId(userId as string, context.signal);
            return business;
        },
        enabled: !!(businessId || userId),
        refetchInterval: 10 * 1000, // Poll every 10 seconds
        refetchOnWindowFocus: false,
        retry: 1,
    });

    // Update Zustand store when query data changes
    useEffect(() => {
        if (queryData) {
            setCurrentBusiness(queryData);
        }
    }, [queryData, setCurrentBusiness]);

    return queryData;
};

export const useBusinessProxy = () => {
    const currentBusiness = useBusinessesStore.currentBusiness();
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (!currentBusiness) return;
        if (pathname === "/business") {
            router.replace(`/business/dashboard/${currentBusiness.id}`);
        }
    }, [currentBusiness?.id, pathname]);
};
