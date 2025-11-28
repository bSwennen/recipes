import i18next from 'i18next';
import en from './locales/en.json';
import nl from './locales/nl.json';

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en,
    nl,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
