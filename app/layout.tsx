import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";
import { getServerTranslation, getServerLanguage } from "@translations/server";
import { LanguageInitializer, A11yInitializer } from "@/components/config";

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
                    url: "/placeholder.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("brandName"),
                },
            ],
        },
        icons: {
            icon: "/placeholder-logo.png",
            shortcut: "/placeholder-logo.png",
            apple: "/placeholder-logo.png",
        },
    };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const lang = await getServerLanguage();
    return (
        <html lang={lang} dir={lang === "he" ? "rtl" : "ltr"} suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <A11yInitializer />
                <LanguageInitializer />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
