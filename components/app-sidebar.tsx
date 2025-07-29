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
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

export function AppSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const menuItems = [
    {
      title: t("common.dashboard"),
      url: "/dashboard",
      icon: Home,
    },
    {
      title: t("common.appointments"),
      url: "/dashboard/appointments",
      icon: Clock,
      badge: "12",
    },
    {
      title: t("common.calendar"),
      url: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: t("common.customers"),
      url: "/dashboard/customers",
      icon: Users,
      badge: "156",
    },
    {
      title: t("common.services"),
      url: "/dashboard/services",
      icon: Settings,
    },
    {
      title: t("common.analytics"),
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: t("common.reviews"),
      url: "/dashboard/reviews",
      icon: Star,
    },
    {
      title: t("common.whatsapp"),
      url: "/dashboard/whatsapp",
      icon: MessageSquare,
    },
    {
      title: t("common.billing"),
      url: "/dashboard/billing",
      icon: CreditCard,
    },
  ]

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-md">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Keepqueue</h2>
            <p className="text-xs text-muted-foreground">Beauty Salon Pro</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                      <Link href={item.url} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src="/placeholder.svg?height=36&width=36" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Sarah's Beauty</p>
            <p className="text-xs text-muted-foreground truncate">
              <span className="text-primary">Pro Plan</span> • 12 days left
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
          <Link href="/">
            <LogOut className="h-4 w-4 mr-2" />
            {t("common.signOut")}
          </Link>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
