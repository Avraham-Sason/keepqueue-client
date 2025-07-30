"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { LogOut, User } from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          KeepQueue
        </Link>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                {user.name}
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t("auth.logout")}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  {t("auth.signin")}
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">{t("auth.signup")}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
