import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      menu: {
        addRun: 'Add run',
        allRuns: 'All runs',
      },
      runForm: {
        header: 'Add new run',
        titleLabel: 'Title',
        titleDescription: 'Title of the run',
        descriptionLabel: 'Description',
        descriptionDescription: 'Write something about the run',
        durationLabel: 'Duration',
        hourLabel: 'hr',
        minuteLabel: 'm',
        secondLabel: 's',
        distanceLabel: 'Distance',
        kilometres: 'Kilometres',
        miles: 'Miles',
        addButton: 'Add',
      },
    },
  },
  hu: {
    translation: {
      menu: {
        addRun: 'Új futás',
        allRuns: 'Futások',
      },
      runForm: {
        header: 'Új futás',
        titleLabel: 'Cím',
        titleDescription: 'A futás címe',
        descriptionLabel: 'Leírás',
        descriptionDescription: 'Írj valamit a futásodról',
        durationLabel: 'Idő',
        hourLabel: 'ó',
        minuteLabel: 'p',
        secondLabel: 'mp',
        distanceLabel: 'Táv',
        kilometres: 'Kilométer',
        miles: 'Mérföld',
        addButton: 'Hozzáad',
      },
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
