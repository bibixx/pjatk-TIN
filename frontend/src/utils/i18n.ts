import { LANG_KEY } from 'constants/localStorage';
import i18n from 'i18next';
import pl from 'locales/pl.json';
import enGb from 'locales/en-gb.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  pl,
  'en-GB': enGb,
} as const;

export const defaultNS = 'translation';

i18n.use(initReactI18next).init({
  lng: localStorage.getItem(LANG_KEY) ?? 'pl',
  defaultNS,
  resources,
});
