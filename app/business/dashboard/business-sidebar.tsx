"use client"

import {
  Calendar,
  Home,
  Users,
  Settings,
  BarChart3,
  Clock,
  Star,
  MessageSquare,
  CreditCard,
  LogOut,
} from "lucide-react"
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
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/translations/language-context"

const menuItems = [
  {
    title: "dashboard",
    url: "/business/dashboard",
    icon: Home,
  },
  {
    title: "appointments",
    url: "/business/dashboard/appointments",
    icon: Clock,
    badge: "12",
  },
  {
    title: "calendar",
    url: "/business/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "customers",
    url: "/business/dashboard/customers",
    icon: Users,
    badge: "156",
  },
  {
    title: "services",
    url: "/business/dashboard/services",
    icon: Settings,
  },
  {
    title: "analytics",
    url: "/business/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "reviews",
    url: "/business/dashboard/reviews",
    icon: Star,
  },
  {
    title: "WhatsApp",
    url: "/business/dashboard/whatsapp",
    icon: MessageSquare,
  },
  {
    title: "billing",
    url: "/business/dashboard/billing",
    icon: CreditCard,
  },
]

export function BusinessSidebar() {
  const { t } = useLanguage()
  return (
    <Sidebar side="right">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Users className="h-5 w-5 text-primary-foreground" />
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
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center justify-between">
                      <div className="flex items-center">
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
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{t("brandName")}</p>
            <p className="text-xs text-muted-foreground truncate">{t("freeTrial")} • 12 {t("daysLeft")}</p>
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
  )
}
