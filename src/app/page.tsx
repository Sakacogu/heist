'use client';

import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import FeaturedCarousel, { FeaturedItem } from '@/components/FeaturedCarousel';
import BrandList            from '@/components/BrandList';
import VoiceAssistantSection from '@/components/VoiceAssistantSection';
import VideoList            from '@/components/VideoList';

import goodnight from '@/lotties/goodnight.json';
import energy    from '@/lotties/energy.json';
import security  from '@/lotties/security.json';
import morning   from '@/lotties/morning.json';
import unified   from '@/lotties/unified.json';
import savings   from '@/lotties/savings.json';


export default function Home() {

  const { t } = useTranslation('home');
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 600], [0, 120]);

  const slides: FeaturedItem[] = [
    { id: 'goodnight', name: 'Goodnight',        lottie: goodnight, description: t('goodnightDesc'), link: '/products' },
    { id: 'energy',    name: 'Energy Saver',     lottie: energy, description: t('energyDesc'), link: '/products' },
    { id: 'security',  name: 'Security',         lottie: security, description: t('securityDesc'), link: '/products' },
    { id: 'morning',   name: 'Morning Routine',  lottie: morning, description: t('morningDesc'), link: '/products' },
    { id: 'unified',   name: 'One App',          lottie: unified, description: t('unifiedDesc'), link: '/products' },
    { id: 'savings',   name: 'Bill Savings',     lottie: savings, description: t('savingsDesc'), link: '/products' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden">
        <motion.div
          style={{ y: blobY }}
          className="pointer-events-none absolute -top-64 left-1/2 -translate-x-1/2
                     h-[40rem] w-[40rem] rounded-full opacity-30 blur-3xl
                     bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-600" />
        <div className="relative z-10 max-w-3xl h-[230px] mx-auto flex flex-col
                        items-center justify-center text-center gap-6 px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            {t('heroTag')}
          </p>
        </div>
      </section>

      <FeaturedCarousel items={slides} />

      <div className="md:flex md:justify-center md:gap-8 px-4">
        <div className="md:w-2/3 mb-16">
          <h2 className="text-3xl font-semibold mb-6 mt-14 text-center
                         bg-cyan-600 text-gray-100 py-4 rounded-3xl max-w-xl mx-auto">
            {t('mainBrands')}
          </h2>
          <BrandList />

          <h2 className="text-3xl font-semibold mt-16 mb-8 text-center
                         bg-cyan-600 text-gray-100 py-4 rounded-3xl max-w-3xl mx-auto">
            {t('voiceAI')}
          </h2>
          <VoiceAssistantSection />
        </div>

        <aside className="md:w-1/4">
          <h2 className="text-3xl font-semibold mb-6 mt-14 text-center
                         bg-cyan-600 text-gray-100 py-4 rounded-3xl max-w-xs mx-auto">
            {t('videoList')}
          </h2>
          <VideoList />
        </aside>
      </div>
    </div>
  );
}
