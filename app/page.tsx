import type { Metadata } from "next";
import { getServerTranslation } from "@translations/server";
import LandingPage from "./landing-page";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getServerTranslation();
    return {
        title: `${t("heroMain")} ${t("heroSub")} | ${t("brandName")}`,
        description: t("heroParagraph"),
        openGraph: {
            title: `${t("heroMain")} ${t("heroSub")} | ${t("brandName")}`,
            description: t("heroParagraph"),
            url: "https://keepqueue-v0.vercel.app/",
            siteName: t("brandName"),
            locale: "he_IL",
            type: "website",
            images: [
                {
                    url: "https://keepqueue-v0.vercel.app/logo.png",
                    width: 1200,
                    height: 630,
                    alt: t("brandName"),
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${t("heroMain")} ${t("heroSub")} | ${t("brandName")}`,
            description: t("heroParagraph"),
            images: ["https://keepqueue-v0.vercel.app/logo.png"],
        },
    };
}

export default function HomePage() {
    return <LandingPage />;
}
