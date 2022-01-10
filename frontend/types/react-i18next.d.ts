import 'react-i18next';
import { defaultNS, resources } from 'utils/i18n';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['pl'];
    defaultNS: typeof defaultNS;
  }
}
