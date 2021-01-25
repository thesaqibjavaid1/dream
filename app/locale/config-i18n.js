import i18n from 'i18next';
import {I18nManager} from 'react-native';
import {initReactI18next} from 'react-i18next';

import languages from './locales';
import I18n from 'react-native-i18n';

//const deviceLocale = 'ar';

const deviceLocale = I18n.currentLocale();
I18nManager.forceRTL(false);
//console.log('device locale: ', deviceLocale);

i18n.use(initReactI18next).init({
  fallbackLng: deviceLocale,
  lng: deviceLocale,

  resources: languages,

  ns: ['common'],
  defaultNS: 'common',

  debug: false,
});

export default i18n;
