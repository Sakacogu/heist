'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  is: {
    translation: {

      home:        'Heim',
      packages:    'Pakkar',
      setup:       'Uppsetning',
      products:    'Vörur',
      contact:     'Samband',
      cart:        'Karfa',

      heroTitle:   'Snjall heimastjórn á þínum forsendum',
      heroTagline: 'Ljós, hitastýring, net og öryggi – allt undir einu þaki.',

      mainBrands:  'Helstu samstarfsmerki',

      allProducts:   'Allar vörur',
      allBrands:     'Öll merki',
      allFunctions:  'Allar tegundir',

      lighting:   'Lýsing',
      heating:    'Hitastýring',
      security:   'Öryggi',
      wifi:       'Wi-Fi',
      blinds:     'Rúllugardínur',

      emptyCart:  'Engar vörur í körfunni.',
      viewProducts: 'Skoða vörur',
      total:      'Samtals',
      checkout:   'Ganga frá greiðslu',
      addToCart:  'Setja í körfu',

      quickLinks: 'Flýtileiðir',
      contactUs:  'Tengiliðir',
    },
  },
  en: {
    translation: {
      home:        'Home',
      packages:    'Packages',
      setup:       'Setup',
      products:    'Products',
      contact:     'Contact',
      cart:        'Cart',

      heroTitle:   'Smart home control on your terms',
      heroTagline: 'Lights, climate, Wi-Fi and security – all in one app.',

      mainBrands:  'Our key partner brands',

      allProducts:  'All products',
      allBrands:    'All brands',
      allFunctions: 'All types',

      lighting:   'Lighting',
      heating:    'Heating',
      security:   'Security',
      wifi:       'Wi-Fi',
      blinds:     'Blinds',

      emptyCart:  'Your cart is empty.',
      viewProducts: 'Browse products',
      total:      'Total',
      checkout:   'Checkout',
      addToCart:  'Add to cart',

      quickLinks: 'Quick links',
      contactUs:  'Contact',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'is',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
