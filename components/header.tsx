"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Settings, HelpCircle, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const pathname = usePathname()
  const { t } = useLanguage()

  // Extract page title from pathname
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean)
    if (path.length === 1 && path[0] === "dashboard") return t("dashboard.title")
    if (path.length > 1) {
      const page = path[1]
      return t(`common.${page}`) || page.charAt(0).toUpperCase() + page.slice(1)
    }
    return t("dashboard.title")
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
      <SidebarTrigger className="-ml-1" />

      <div className="flex-1 flex items-center gap-4">
        <h1 className="text-xl font-semibold hidden md:block">{getPageTitle()}</h1>

        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("header.searchPlaceholder")} className="pl-8 bg-background" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden md:flex gap-1 bg-transparent">
          <Plus className="h-4 w-4" />
          {t("common.newAppointment")}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>{t("common.notifications")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{t("header.newAppointmentBooked")}</p>
                    <p className="text-sm text-muted-foreground">
                      Rachel Cohen booked a Hair Cut for tomorrow at 10:00 AM
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium text-primary">
              {t("header.viewAllNotifications")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <LanguageToggle />
        <ThemeToggle />

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
