import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      paceUnitShortKilometres: 'minute/km',
      paceUnitShortMiles: 'minute/mile',
      menu: {
        addRun: 'Add run',
        allRuns: 'All runs',
        register: 'Register',
        login: 'Login',
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
        editButton: 'Edit',
        formError: 'Must be filled, and only positive numbers allowed',
        dateLabel: 'Date',
        dateError: 'Must be filled',
      },
      register: {
        title: 'Sign up',
        username: 'Username',
        password: 'Password',
        userTypeLabel: 'Are you a coach or an athlete',
        athlete: 'Athlete',
        coach: 'Coach',
        submit: 'Submit',
      },
      login: {
        title: 'Login',
        submit: 'Login',
      },
      allRunList: {
        dateHeader: 'Date',
        titleHeader: 'Title',
        durationHeader: 'Duration',
        distanceHeader: 'Distance',
        paceHeader: 'Pace',
        weekInterval: 'Week',
        monthInterval: 'Month',
        yearInterval: 'Year',
        actions: 'Actions',
        kilometresMeasurement: 'Kilometres',
        milesMeasurement: 'Miles',
        intervalLabel: 'Interval',
        measurementLabel: 'Distance unit',
      },
      runGroupTable: {
        overview: 'Total',
      },
    },
  },
  hu: {
    translation: {
      paceUnitShortKilometres: 'perc/km',
      paceUnitShortMiles: 'perc/mérföld',
      menu: {
        addRun: 'Új futás',
        allRuns: 'Futások',
        register: 'Regisztrálás',
        login: 'Bejelentkezés',
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
        editButton: 'Szerkesztés',
        formError: 'Ki kell tölteni, és csak pozitív számot lehet megadni',
        dateLabel: 'Dátum',
        dateError: 'Ki kell tölteni',
      },
      register: {
        title: 'Regisztrálás',
        username: 'Felhasználónév',
        password: 'Jelszó',
        userTypeLabel: 'Edzőként vagy futóként szeretnél regisztrálni?',
        athlete: 'Futó',
        coach: 'Edző',
        submit: 'Küldés',
      },
      login: {
        title: 'Bejelentkezés',
        submit: 'Bejelentkezés',
      },
      allRunList: {
        dateHeader: 'Dátum',
        titleHeader: 'Cím',
        durationHeader: 'Időtartam',
        distanceHeader: 'Táv',
        paceHeader: 'Tempó',
        weekInterval: 'Hét',
        monthInterval: 'Hónap',
        yearInterval: 'Év',
        actions: 'Műveletek',
        kilometresMeasurement: 'Kilóméterek',
        milesMeasurement: 'Mérföldek',
        intervalLabel: 'Felosztás',
        measurementLabel: 'Mértékegység',
      },
      runGroupTable: {
        overview: 'Összegzés',
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
