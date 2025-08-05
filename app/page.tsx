import { LandingPage } from "./landing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ניהול תורים חכם לעסקי יופי | Keepqueue",
    description:
        "נהל את התורים שלך מקצה לקצה עם תזכורות WhatsApp אוטומטיות, תזמון חכם ואנליטיקה מתקדמת. הפלטפורמה האידיאלית לסלונים, קליניקות ומרכזי בריאות.",
    openGraph: {
        title: "ניהול תורים חכם לעסקי יופי | Keepqueue",
        description:
            "נהל את התורים שלך מקצה לקצה עם תזכורות WhatsApp אוטומטיות, תזמון חכם ואנליטיקה מתקדמת. הפלטפורמה האידיאלית לסלונים, קליניקות ומרכזי בריאות.",
        url: "https://www.keepqueue.com/",
        siteName: "Keepqueue",
        locale: "he_IL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ניהול תורים חכם לעסקי יופי | Keepqueue",
        description: "נהל את התורים שלך מקצה לקצה עם תזכורות WhatsApp אוטומטיות, תזמון חכם ואנליטיקה מתקדמת.",
    },
};

export default function HomePage() {
    return <LandingPage />;
}
