'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  is: {
    translation: {
      home: 'Heim',
      packages: 'Pakkar',
      setup: 'Uppsetning',
      products: 'Vörur',
      contact: 'Samband',
      cart: 'Karfa',
      // …extend as needed
    },
  },
  en: {
    translation: {
      home: 'Home',
      packages: 'Packages',
      setup: 'Setup',
      products: 'Products',
      contact: 'Contact',
      cart: 'Cart',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'is',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;