import type React from "react";
import { CustomerHeader } from "./customer-header";

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <CustomerHeader />
            <main className="container mx-auto py-6">{children}</main>
        </div>
    );
}
