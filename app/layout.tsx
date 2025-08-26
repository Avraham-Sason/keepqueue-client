import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";
import { A11yProvider } from "@/components/a11y";
import { LanguageProvider } from "@/lib/translations/language-context";
import { get_server_t } from "@/lib/translations/server";

const inter = Inter({ subsets: ["latin"] });

const t = get_server_t("he");
export const metadata: Metadata = {
    title: `${t("brandName")} - ${t("heroMain")} ${t("heroSub")}`,
    description: t("heroParagraph"),
    generator: "v0.dev",
    icons: {
        icon: "/placeholder-logo.png",
        shortcut: "/placeholder-logo.png",
        apple: "/placeholder-logo.png",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="he" dir="rtl" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <A11yProvider>
                        <LanguageProvider>{children}</LanguageProvider>
                    </A11yProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
