import type React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { BusinessSidebar } from "./business-sidebar";
import { BusinessHeader } from "./business-header";
import BusinessConfig from "./Config";

export default function BusinessDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <BusinessConfig />
            <BusinessSidebar />
            <SidebarInset>
                <BusinessHeader />
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
