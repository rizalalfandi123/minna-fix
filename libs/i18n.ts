import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Language } from "~/contexts/userContext";
import en from "~/locales/en";
import id from "~/locales/id";

export type LanguageOption = {
    code: Language;
    name: string;
};

export const availableLanguages: Array<LanguageOption> = [
    { code: "en", name: "English" },
    { code: "id", name: "Bahasa Indonesia" },
];

export const resources = {
    en: { translation: en },
    id: { translation: id },
} as const;

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export type Resources = typeof resources;

export default i18n;
