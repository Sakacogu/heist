   'use client';

   import i18n, { Resource } from 'i18next';
   import { initReactI18next } from 'react-i18next';
   
   const IS: Resource = {
     common: {
       home:     'Heim',
       packages: 'Pakkar',
       setup:    'Uppsetning',
       products: 'Vörur',
       contact:  'Samband',
       cart:     'Karfa',
       login:    'Innskráning',
   
       continue:  'Áfram',
       emptyCart: 'Karfan er tóm.',
       total:     'Samtals',
       checkout:  'Ganga frá greiðslu',
     },
   
     home: {
       heroTitle:  'Snjöll heimastjórnun á þínum forsendum',
       heroTag:    'Ljós, hitastýring, net og öryggi - allt undir einu þaki.',
       mainBrands: 'Helstu samstarfsmerki',
       voiceAI:    'Hægt að stjórna með gervigreind!',
       videoList: 'Myndbönd með leiðbeiningum',
       
       goodnightDesc: 'Láttu snjöll heimakerfi vinna fyrir þig',
       energyDesc: 'Stjórnaðu hverju sem er! Hugmyndarflugið eitt takmarkar þig',
       securityDesc: 'Passaðu upp á heimilið með betri öryggislausnum',
       morningDesc: 'Auðveldaðu þér að byrja daginn með snjöllum rútínum',
       unifiedDesc: 'Allt heimilið í einu appi!',
       savingsDesc: 'Lækkaðu rafmagnsreikninginn með snjall tækjunum',
       viewProductsBtn: 'Skoða vörur',
     },
   
     packages: {
       addAll:  'Setja allt í körfu',
       mostPop: 'Mest keypt',
       discount:'Afsláttur',
       noDisc:  'Enginn afsláttur',
       total:   'Samtals',
     },
   
     products: {
       allProducts:  'Allar vörur',
       allBrands:    'Öll merki',
       allFunctions: 'Allar tegundir',
   
       lighting: 'Lýsing',
       heating:  'Hitastýring',
       security: 'Öryggi',
       wifi:     'Wi-Fi',
       blinds:   'Rúllugardínur',
       control:  'Stjórnstöð',
     },
   
     contact: {
       heading:  'Hafa samband',
       subtitle: 'Velkomin! Við svörum á virkum dögum 09-17.',
       phone:    'Sími',
       email:    'Netfang',
       book:     'Bóka fund',
     },

   };
   
   const EN: Resource = {
     common: {
       home:     'Home',
       packages: 'Packages',
       setup:    'Setup',
       products: 'Products',
       contact:  'Contact',
       cart:     'Cart',
       login:    'Login',
   
       continue:  'Continue',
       emptyCart: 'Your cart is empty.',
       total:     'Total',
       checkout:  'Checkout',
     },
   
     home: {
       heroTitle:  'Smart home control on your terms',
       heroTag:    'Lights, climate, Wi-Fi and security - all in one app.',
       mainBrands: 'Our key partner brands',
       voiceAI:    'Voice-assistant ready!',
       videoList: 'Video guides',

       goodnightDesc: 'Wind down with smart home routines',
       energyDesc: 'Control everything! Your imagination is the limit',
       securityDesc: 'Protect your home with smart security',
       morningDesc: 'Start your day with smart home routines',
       unifiedDesc: 'Control all devices in one app',
       savingsDesc: 'Save on bills with smart home devices',
       viewProductsBtn: 'View products',
     },
   
     packages: {
       addAll:  'Add everything to cart',
       mostPop: 'Most popular',
       discount:'Discount',
       noDisc:  'No discount',
       total:   'Total',
     },
   
     products: {
       allProducts:  'All products',
       allBrands:    'All brands',
       allFunctions: 'All types',
   
       lighting: 'Lighting',
       heating:  'Heating',
       security: 'Security',
       wifi:     'Wi-Fi',
       blinds:   'Blinds',
       control:  'Control Hub',
     },
   
     contact: {
       heading:  'Contact us',
       subtitle: 'We reply Mon-Fri 09-17.',
       phone:    'Phone',
       email:    'Email',
       book:     'Book a meeting',
     },

   };

   i18n
     .use(initReactI18next)
     .init({
       resources: { is: IS, en: EN },
       lng: 'is',
       fallbackLng: 'en',
       ns: ['common', 'home', 'packages', 'products', 'contact'],
       defaultNS: 'common',
       interpolation: { escapeValue: false },
     });
   
   export default i18n;
   