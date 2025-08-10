import { LandingPage } from "./landing-page";
import type { Metadata } from "next";
import { get_server_t } from "@/lib/translations/server";

const t = get_server_t("he");
export const metadata: Metadata = {
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

export default function HomePage() {
    return <LandingPage />;
}
