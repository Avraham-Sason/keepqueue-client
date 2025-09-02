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
            url: "https://www.keepqueue.com/",
            siteName: t("brandName"),
            locale: "he_IL",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${t("heroMain")} ${t("heroSub")} | ${t("brandName")}`,
            description: t("heroParagraph"),
        },
    };
}

export default function HomePage() {
    return <LandingPage />;
}
