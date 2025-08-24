"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, User, LogOut, Calendar, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { A11yToggle } from "@/components/a11y-toggle"
import Link from "next/link"
import { useLanguage } from "@/lib/translations/language-context"

export function CustomerHeader() {
  const { t } = useLanguage()
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/customer/marketplace" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">{t("brandName")}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/customer/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
            <MapPin className="h-4 w-4 inline mr-1" />
            {t("searchBusinesses")}
          </Link>
          <Link href="/customer/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            <Calendar className="h-4 w-4 inline mr-1" />
            {t("myAppointments")}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("searchBusinesses")} className="pl-8 w-64" />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">2</Badge>
          </Button>

          <A11yToggle />
          <ThemeToggle />

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>RC</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">רחל כהן</p>
            </div>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <LogOut className="h-4 w-4 mr-2" />
              {t("signOut")}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
