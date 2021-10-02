import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      addRun: 'Add run',
      allRuns: 'All runs',
    },
  },
  hu: {
    translation: {
      addRun: 'Új futás',
      allRuns: 'Futások',
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
