import heTranslations from "./he.json";
import enTranslations from "./en.json";

export type Language = "he" | "en";
type Translations = typeof heTranslations;
export type TranslationsKey =
  | keyof typeof heTranslations
  | keyof typeof enTranslations
  | (string & {});

const translations: Record<Language, Translations> = {
  he: heTranslations,
  en: enTranslations,
};

export function get_server_t(language: Language = "he") {
  // returns a t() compatible with client hook
  const current = translations[language] as Record<string, string>;
  const fallbackEn = enTranslations as Record<string, string>;
  return (key: TranslationsKey): string => {
    if (Object.prototype.hasOwnProperty.call(current, key) && current[key]) {
      return current[key];
    }
    if (
      Object.prototype.hasOwnProperty.call(fallbackEn, key) &&
      fallbackEn[key]
    ) {
      return fallbackEn[key];
    }
    return String(key);
  };
}


