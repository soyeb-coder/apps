// Copyright 2017-2023 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { LANGUAGE_DEFAULT, settings } from '@polkadot/ui-settings';

import Backend from './Backend.js';

const languageDetector = new LanguageDetector();

languageDetector.addDetector({
  lookup: () => {
    const i18nLang = settings.i18nLang;

    return i18nLang === LANGUAGE_DEFAULT
      ? undefined
      : i18nLang;
  },
  name: 'i18nLangDetector'
});

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    backend: {},
    debug: false,
    detection: {
      order: ['i18nLangDetector', 'navigator']
    },
    fallbackLng: false,
    interpolation: {
      escapeValue: false,
      prefix: '{{',
      suffix: '}}'
    },
    keySeparator: false,
    load: 'languageOnly',
    ns: [
      'apps',
      'apps-config',
      'apps-electron',
      'apps-routing',
      'app-accounts',
      'app-claims',
      'app-contracts',
      'app-council',
      'app-democracy',
      'app-explorer',
      'app-extrinsics',
      'app-generic-asset',
      'app-js',
      'app-parachains',
      'app-poll',
      'app-rpc',
      'app-settings',
      'app-signing',
      'app-society',
      'app-staking',
      'app-storage',
      'app-sudo',
      'app-tech-comm',
      'app-treasury',
      'react-api',
      'react-components',
      'react-hooks',
      'react-params',
      'react-query',
      'react-signer',
      'translation'
    ],
    nsSeparator: false,
    react: {
      useSuspense: true
    },
    returnEmptyString: false,
    returnNull: false
  })
  .catch((error: Error): void =>
    console.log('i18n: failure', error)
  );

settings.on('change', (settings): void => {
  (
    settings.i18nLang === LANGUAGE_DEFAULT
      // If we want to use the default language, we need to pass no
      // actual param through here
      // https://github.com/i18next/i18next/blob/21eac5a605601ec1067aac3583c6ec6bc2ecd3b7/src/i18next.js#L366
      ? i18next.changeLanguage()
      : i18next.changeLanguage(settings.i18nLang)
  ).catch(console.error);
});

export default i18next;
