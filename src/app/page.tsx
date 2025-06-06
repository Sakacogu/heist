'use client';

import { useTranslation } from 'react-i18next';
import FeaturedCarousel, { FeaturedItem } from '@/components/FeaturedCarousel';
import BrandList           from '@/components/BrandList';
import VoiceAssistantSection from '@/components/VoiceAssistantSection';
import VideoList           from '@/components/VideoList';
import Link from 'next/link';

import goodnight from '@/lotties/goodnight.json';
import energy    from '@/lotties/energy.json';
import security  from '@/lotties/security.json';
import morning   from '@/lotties/morning.json';
import unified   from '@/lotties/unified.json';
import savings   from '@/lotties/savings.json';


export default function Home() {

  const { t } = useTranslation('home');

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

      <section className="bg-cyan-600 text-white">
        <div className="max-w-3xl h-[230px] mx-auto flex flex-col text-center py-17 gap-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-cyan-100">{t('heroTag')}</p>
        </div>
      </section>

      <FeaturedCarousel items={slides} />

      <div className="md:flex md:justify-center md:gap-8 px-4">
        <div className="md:w-2/3 mb-[50px]">
          <h2 className="text-3xl font-semibold mb-6 mt-14 text-center bg-cyan-600 text-gray-100 py-4 rounded-3xl max-w-xl mx-auto">
          {t('mainBrands')}
          </h2>
          <BrandList />

          <h2 className="text-3xl font-semibold mt-[60px] mb-[30px] text-center bg-cyan-600 text-gray-100 py-4 rounded-3xl max-w-3xl mx-auto">
            {t('voiceAI')}
          </h2>
          <VoiceAssistantSection />
        </div>
        

        <aside className="md:w-1/4">
          <h2 className="text-3xl font-semibold mb-6 mt-14 text-center bg-cyan-600 text-gray-100 py-4 rounded-3xl max-w-xl mx-auto">
            {t('videoList')}
          </h2>
          <VideoList />
        </aside>
      </div>
    </div>
  );
}
