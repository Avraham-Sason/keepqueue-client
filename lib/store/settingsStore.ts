import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./utils";
import heTranslations from "../translations/he.json";
import enTranslations from "../translations/en.json";
import { Language } from "../types/global";

type Translations = typeof heTranslations;
type TranslationsKey = keyof typeof heTranslations | keyof typeof enTranslations | (string & {});

interface SettingsState {
    a11yEnabled: boolean;
    toggleA11y: () => void;
    setA11y: (enabled: boolean) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationsKey) => string;
}

const translations: Record<Language, Translations> = {
    he: heTranslations,
    en: enTranslations,
};

export const useSettingsStoreBase = create<SettingsState>()(
    persist(
        (set, get) => ({
            a11yEnabled: false,
            toggleA11y: () => set({ a11yEnabled: !get().a11yEnabled }),
            setA11y: (enabled) => set({ a11yEnabled: enabled }),

            language: "he",
            setLanguage: (lang) => set({ language: lang }),
            t: (key) => {
                const current = translations[get().language] as Record<string, string>;
                const fallbackEn = enTranslations as Record<string, string>;
                if (Object.prototype.hasOwnProperty.call(current, key) && current[key]) {
                    return current[key];
                }
                if (Object.prototype.hasOwnProperty.call(fallbackEn, key) && fallbackEn[key]) {
                    return fallbackEn[key];
                }
                return key as string;
            },
        }),
        {
            name: "settings",
        }
    )
);

export const useSettingsStore = createSelectors<SettingsState>(useSettingsStoreBase);
