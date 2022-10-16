import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      paceUnitShortKilometres: 'minute/km',
      paceUnitShortMiles: 'minute/mile',
      genericSuccess: 'Successful',
      genericFailure: 'Something went wrong',
      setCoach: {
        open: 'Add athlete',
        title: 'Take on athletes for coaching',
        placeholder: 'Select athlete by typing',
        cancel: 'Cancel',
        add: 'Take on',
      },
      menu: {
        addRun: 'Add run',
        allRuns: 'All runs',
        register: 'Register',
        login: 'Login',
        createRunPlan: 'Create run plan',
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
        heartRateLabel: 'Heart rate',
        heartRateUnit: 'BPM',
        kilometres: 'Kilometres',
        miles: 'Miles',
        addButton: 'Add',
        editButton: 'Edit',
        formError: 'Must be filled, and must be greater than zero',
        dateLabel: 'Date',
        dateError: 'Must be filled',
        success: 'Run added successfully',
        uploadFile: 'Import TCX file',
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
        failed: 'Login failed',
      },
      runPage: {
        description: 'Description',
        stats: 'Statistics',
        open: 'Link with run plan',
        actual: 'Actual',
        described: 'Described',
        difference: 'Difference:',
        distance: 'Distance',
        duration: 'Duration',
        pace: 'Pace',
        heartRate: 'Heart rate',
        link: 'Set completed run plan',
        linkPlaceholder: 'Select a run plan',
        linkAdd: 'Set',
      },
      allRunList: {
        nameHeader: 'Athlete',
        dateHeader: 'Date',
        typeHeader: 'Type',
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
      runPlanForm: {
        header: 'Create run plan',
        paceLabel: 'Pace',
        instructions: 'Instructions:',
        instructionsPlaceholder: 'Tell the athlete what to do',
        distance: 'Distance:',
        assignedTo: 'Add athletes to assign:',
        submit: 'Create',
      },
    },
  },
  hu: {
    translation: {
      paceUnitShortKilometres: 'perc/km',
      paceUnitShortMiles: 'perc/mérföld',
      genericSuccess: 'Sikerült',
      genericFailure: 'Nem sikerült',
      setCoach: {
        open: 'Futó felvétele',
        title: 'Futó felvétele edzettként ',
        placeholder: 'Futó kiválasztása...',
        cancel: 'Mégse',
        add: 'Felvétel',
      },
      menu: {
        addRun: 'Új futás',
        allRuns: 'Futások',
        register: 'Regisztrálás',
        login: 'Bejelentkezés',
        createRunPlan: 'Futás terv létrehozása',
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
        heartRateLabel: 'Pulzus',
        heartRateUnit: 'Ütés/Perc',
        addButton: 'Hozzáad',
        editButton: 'Szerkesztés',
        formError: 'Ki kell tölteni, és többnek kell lennie nullánál!',
        dateLabel: 'Dátum',
        dateError: 'Ki kell tölteni',
        success: 'Futás sikeresen hozzáadva',
        uploadFile: 'TCX fájl importálása',
      },
      runPage: {
        description: 'Leírás',
        stats: 'Statisztikák',
        actual: 'Tényleges',
        described: 'Előírt',
        difference: 'Különbség:',
        distance: 'Táv',
        duration: 'Idő',
        pace: 'Tempó',
        heartRate: 'Pulzus',
        link: 'Teljesített terv kiválasztása',
        linkPlaceholder: 'Terv kiválasztása',
        linkAdd: 'Kiválasztás',
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
        failed: 'Sikertelen bejelentkezés!',
      },
      allRunList: {
        nameHeader: 'Futó',
        dateHeader: 'Dátum',
        typeHeader: 'Típus',
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
      runPlanForm: {
        header: 'Futás terv létrehozása',
        instructions: 'Instrukciók:',
        paceLabel: 'Tempó:',
        instructionsPlaceholder: 'Mit csináljon a futó...',
        distance: 'Táv:',
        assignedTo: 'Melyik futónak legyen elküldve?',
        submit: 'Létrehozás',
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
