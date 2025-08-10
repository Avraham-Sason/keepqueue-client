"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import heTranslations from "./he.json";
import enTranslations from "./en.json";

type Language = "he" | "en";
type Translations = typeof heTranslations;
type TranslationsKey = keyof typeof heTranslations | keyof typeof enTranslations | (string & {});
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationsKey) => string;
    dir: "rtl" | "ltr";
}

const translations: Record<Language, Translations> = {
    he: heTranslations,
    en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("he");

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedLanguage && (savedLanguage === "he" || savedLanguage === "en")) {
            setLanguage(savedLanguage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("language", language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    }, [language]);

    const t = (key: TranslationsKey): string => {
        const current = translations[language] as Record<string, string>;
        const fallbackEn = enTranslations as Record<string, string>;

        if (Object.prototype.hasOwnProperty.call(current, key) && current[key]) {
            return current[key];
        }

        if (Object.prototype.hasOwnProperty.call(fallbackEn, key) && fallbackEn[key]) {
            return fallbackEn[key];
        }

        return key;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t,
                dir: language === "he" ? "rtl" : "ltr",
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
