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
      login: 'Innskráning',

      heroTitle: 'Snjöll heimastjórnun á þínum forsendum',
      heroTag: 'Ljós, hitastýring, net og öryggi – allt undir einu þaki.',

      mainBrands: 'Helstu samstarfsmerki',
      voiceAI: 'Hægt að stjórna með gervigreind!',

      starterPack: 'Starter ljós',
      securityPack: 'Öryggispakki',
      mixPack: 'Mix & Match',

      chooseSystems: 'Veldu snjallkerfin þín',
      compareQuick: 'Flýtisamanburður',
      legend: '✓ = grunnstuðningur · ✓✓✓ = full samþætting',
      buildDream: 'Klárt að smíða drauma-heimakerfið?',
      viewProductsBtn: 'Skoða vörur & pakkar',

      allProducts: 'Allar vörur',
      allBrands: 'Öll merki',
      allFunctions: 'Allar tegundir',
      lighting: 'Lýsing',
      heating: 'Hitastýring',
      security: 'Öryggi',
      wifi: 'Wi-Fi',
      blinds: 'Rúllugardínur',

      emptyCart: 'Karfan er tóm.',
      viewProducts: 'Skoða vörur',
      total: 'Samtals',
      checkout: 'Ganga frá greiðslu',
      addToCart: 'Setja í körfu',

      contactHeading: 'Hafa samband',
      contactSubtitle: 'Velkomin! Við svörum á virkum dögum 09-17.',
      phone: 'Sími',
      email: 'Netfang',
      bookMeeting: 'Bóka fund',

      colSystem: 'Kerfi',
      colDim: 'Lýsing / Dimming',
      colPower: 'Aflmæling',
      colWifi: 'Wi-Fi 6',
      colAuto: 'Sjálfvirkni',
      colCam: 'Myndavélar',

      enterEmail: 'Sláðu inn netfang',
      continue: 'Áfram',
      checkInbox: 'Tékkaðu pósthólfið – innskráningartengill hefur verið sendur!',
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
      login: 'Login',

      heroTitle: 'Smart home control on your terms',
      heroTag: 'Lights, climate, Wi-Fi and security – all in one app.',

      mainBrands: 'Our key partner brands',
      voiceAI: 'Voice-assistant ready!',

      starterPack: 'Starter Lights',
      securityPack: 'Security Pack',
      mixPack: 'Mix & Match',

      chooseSystems: 'Choose your ecosystems',
      compareQuick: 'Quick comparison',
      legend: '✓ = basic · ✓✓✓ = full integration',
      buildDream: 'Ready to build your dream setup?',
      viewProductsBtn: 'Browse products & bundles',

      allProducts: 'All products',
      allBrands: 'All brands',
      allFunctions: 'All types',
      lighting: 'Lighting',
      heating: 'Heating',
      security: 'Security',
      wifi: 'Wi-Fi',
      blinds: 'Blinds',

      emptyCart: 'Your cart is empty.',
      viewProducts: 'Browse products',
      total: 'Total',
      checkout: 'Checkout',
      addToCart: 'Add to cart',

      contactHeading: 'Contact us',
      contactSubtitle: 'We reply Mon–Fri 09-17.',
      phone: 'Phone',
      email: 'Email',
      bookMeeting: 'Book a meeting',

      colSystem: 'System',
      colDim: 'Dimming',
      colPower: 'Power metering',
      colWifi: 'Wi-Fi 6',
      colAuto: 'Automation',
      colCam: 'Cameras',

      enterEmail: 'Enter your e-mail',
      continue: 'Continue',
      checkInbox: 'Check your inbox for the login link!',
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
