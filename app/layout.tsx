import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";
import { getServerTranslation, getServerLanguage } from "@translations/server";
import { LanguageInitializer, A11yInitializer } from "@/components/config";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
    const t = await getServerTranslation();
    return {
        metadataBase: new URL("https://keepqueue-v0.vercel.app"),
        title: `${t("brandName")} - ${t("heroMain")} ${t("heroSub")}`,
        description: t("heroParagraph"),
        generator: "v0.dev",
        openGraph: {
            siteName: t("brandName"),
            locale: "he_IL",
            type: "website",
            images: [
                {
                    url: "/logo.png",
                    width: 1200,
                    height: 630,
                    alt: t("brandName"),
                },
            ],
        },
        icons: {
            icon: "/logo.png",
            shortcut: "/logo.png",
            apple: "/logo.png",
        },
    };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const lang = await getServerLanguage();
    return (
        <html lang={lang} dir={lang === "he" ? "rtl" : "ltr"} suppressHydrationWarning>
            <body className={cn(inter.className, "w-screen min-h-dvh")} suppressHydrationWarning>
                <A11yInitializer />
                <LanguageInitializer />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
