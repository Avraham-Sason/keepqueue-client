"use client";
import { useAuthStoreBase, useBusinessesStore } from "@/lib/store";
import { useEffect } from "react";
import { getBusinessByOwnerId } from "./helpers";
import { useRouter, usePathname } from "next/navigation";

export const useBusiness = () => {
    const { user } = useAuthStoreBase();
    const setCurrentBusiness = useBusinessesStore.setCurrentBusiness();
    useEffect(() => {
        const userId = user?.id;
        if (!userId) return;

        let interval: ReturnType<typeof setInterval> | null = null;
        let activeController: AbortController | null = null;
        let isMounted = true;

        const fetchAndSetBusiness = async (signal?: AbortSignal) => {
            console.log("⚡ fetching business");
            try {
                const business = await getBusinessByOwnerId(userId, signal);
                console.log("🔥 fetched business", business);

                if (isMounted && business) {
                    setCurrentBusiness(business);
                }
            } catch (error: any) {
                if (error?.name !== "CanceledError" && error?.name !== "AbortError") {
                    console.error("Error fetching business", error);
                }
            }
        };

        const run = () => {
            if (activeController) {
                activeController.abort();
            }
            activeController = new AbortController();
            fetchAndSetBusiness(activeController.signal);
        };

        run();
        interval = setInterval(() => {
            console.log("⚡ activate interval");
            run();
        }, 10 * 1000);

        return () => {
            isMounted = false;
            if (interval) clearInterval(interval);
            if (activeController) activeController.abort();
        };
    }, [user?.id]);
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
