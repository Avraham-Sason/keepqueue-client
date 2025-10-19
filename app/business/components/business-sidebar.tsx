"use client";

import { Calendar, Home, Users, Settings, BarChart3, Clock, Star, MessageSquare, CreditCard, LogOut } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/hooks";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore, useSettingsStore } from "@/lib/store";
import { useBusinessesStore } from "@/lib/store/businesses";
import Image from "next/image";

const menuItems = [
    {
        title: "dashboard",
        url: "/business/dashboard",
        icon: Home,
    },
    {
        title: "appointments",
        url: "/business/appointments",
        icon: Clock,
        badge: "12",
    },
    {
        title: "calendar",
        url: "/business/calendar",
        icon: Calendar,
    },
    {
        title: "customers",
        url: "/business/customers",
        icon: Users,
        badge: "156",
    },
    {
        title: "services",
        url: "/business/services",
        icon: Settings,
    },
    {
        title: "analytics",
        url: "/business/analytics",
        icon: BarChart3,
    },
    {
        title: "reviews",
        url: "/business/reviews",
        icon: Star,
    },
    {
        title: "WhatsApp",
        url: "/business/whatsapp",
        icon: MessageSquare,
    },
    {
        title: "billing",
        url: "/business/billing",
        icon: CreditCard,
    },
];

export function BusinessSidebar() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState(menuItems[0].title);
    const user = useAuthStore.user();
    const isRtl = useSettingsStore.isRtl();
    const currentBusiness = useBusinessesStore.currentBusiness();
    if (!user || !currentBusiness) {
        return null;
    }
    return (
        <Sidebar side={isRtl ? "right" : "left"} variant="sidebar">
            <SidebarHeader className="p-4">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                        <Image src="/logo.png" alt="logo" width={32} height={32} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{t("brandName")}</h2>
                        <p className="text-xs text-muted-foreground">{t("businessAdminPanel")}</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{t("businessManagement")}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={activeTab === item.title} onClick={() => setActiveTab(item.title)}>
                                        <Link href={`${item.url}/${currentBusiness.id}`} className={cn("flex items-center justify-between")}>
                                            <div className={"flex items-center gap-2 "}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{t(item.title)}</span>
                                            </div>
                                            {item.badge && (
                                                <Badge variant="secondary" className="ml-auto">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 space-y-4">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL ?? "/placeholder.svg?height=32&width=32"} />
                        <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{t("brandName")}</p>
                        <p className="text-xs text-muted-foreground truncate">
                            {t("freeTrial")} • 12 {t("daysLeft")}
                        </p>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/">
                        <LogOut className="h-4 w-4 mr-2" />
                        {t("signOut")}
                    </Link>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
