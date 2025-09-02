import { cookies, headers } from "next/headers";
import heTranslations from "./he.json";
import enTranslations from "./en.json";

type Translations = typeof heTranslations;
export type TranslationsKey = keyof typeof heTranslations | keyof typeof enTranslations | (string & {});
export type Language = "he" | "en";

export async function getServerLanguage(): Promise<Language> {
    const cookieStore = await cookies();
    const cookieLang = cookieStore.get("language")?.value;
    if (cookieLang === "he" || cookieLang === "en") return cookieLang;

    const hdrs = await headers();
    const accept = hdrs.get("accept-language") || "";
    const candidates = accept.split(",").map((p: string) => p.trim().split(";")[0].toLowerCase());

    for (const code of candidates) {
        if (code.startsWith("he")) return "he";
        if (code.startsWith("en")) return "en";
    }
    return "he";
}

export async function getServerTranslation() {
    const lang = await getServerLanguage();
    return getJsonTranslation(lang);
}


const translations: Record<Language, Translations> = {
    he: heTranslations,
    en: enTranslations,
};

export function getJsonTranslation(language: Language = "he") {
    const current = translations[language] as Record<string, string>;
    const fallbackEn = enTranslations as Record<string, string>;
    return (key: TranslationsKey): string => {
        if (Object.prototype.hasOwnProperty.call(current, key) && current[key]) {
            return current[key];
        }
        if (Object.prototype.hasOwnProperty.call(fallbackEn, key) && fallbackEn[key]) {
            return fallbackEn[key];
        }
        return String(key);
    };
}
