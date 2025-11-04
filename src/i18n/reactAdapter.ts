// React-i18next adapter implementation
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import type { Translator } from './translator';

// Import translation resources
import enTranslation from '../locales/en/translation.json';
import sqTranslation from '../locales/sq/translation.json';

const resources = {
  en: { translation: enTranslation },
  sq: { translation: sqTranslation },
};

export const createAdapter = (): Translator => {
  return {
    init: async (options = {}) => {
      await i18n.use(initReactI18next).init({
        resources,
        lng: options.lng || 'en',
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false, // React already escapes
        },
      });
    },

    t: (key: string, opts?: any) => {
      return i18n.t(key, opts);
    },

    useT: () => {
      const { t } = useTranslation();
      return (k: string, opts?: any) => t(k, opts);
    },

    changeLanguage: async (lng: string) => {
      await i18n.changeLanguage(lng);
    },

    getAvailableLanguages: () => {
      return Object.keys(resources);
    },
  };
};

