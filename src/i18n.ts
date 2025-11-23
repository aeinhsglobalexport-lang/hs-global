import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
import frTranslation from './locales/fr/translation.json';
import deTranslation from './locales/de/translation.json';
import arTranslation from './locales/ar/translation.json';
import hiTranslation from './locales/hi/translation.json';
import ptTranslation from './locales/pt/translation.json';
import jaTranslation from './locales/ja/translation.json';
import itTranslation from './locales/it/translation.json';
import koTranslation from './locales/ko/translation.json';
import zhTranslation from './locales/zh/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      fr: { translation: frTranslation },
      de: { translation: deTranslation },
      ar: { translation: arTranslation },
      hi: { translation: hiTranslation },
      pt: { translation: ptTranslation },
      it: { translation: itTranslation },
      ja: { translation: jaTranslation },
      ko: { translation: koTranslation },
      zh: { translation: zhTranslation },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;