import FeaturedCarousel, { FeaturedItem } from '@/components/FeaturedCarousel';
import BrandList from '@/components/BrandList';
import VoiceAssistantSection from '@/components/VoiceAssistantSection';
import VideoList from '@/components/VideoList';

import goodnight from '@/lotties/goodnight.json';
import energy    from '@/lotties/energy.json';
import security  from '@/lotties/security.json';
import morning   from '@/lotties/morning.json';
import unified   from '@/lotties/unified.json';
import savings   from '@/lotties/savings.json';

const slides: FeaturedItem[] = [
  { id: 'goodnight', name: 'Goodnight',        lottie: goodnight },
  { id: 'energy',    name: 'Energy Saver',     lottie: energy },
  { id: 'security',  name: 'Security',         lottie: security },
  { id: 'morning',   name: 'Morning Routine',  lottie: morning },
  { id: 'unified',   name: 'One App',          lottie: unified },
  { id: 'savings',   name: 'Bill Savings',     lottie: savings },
];

export const metadata = {
  title: 'Heist - Home',
};

export default function Home() {
  return (
    <div className='min-h-screen w-full bg-gray-50'>
      <FeaturedCarousel items={slides} />

      <div className="md:flex md:items-start md:justify-center md:gap-8 px-4">
        <div className="md:w-2/3">
        <div>
            <h2 className="text-3xl font-semibold mb-6 text-center">Helstu merki okkar</h2>
          <BrandList />
          </div>
          <VoiceAssistantSection />
        </div>
        <aside className="md:w-1/3">
          <VideoList />
        </aside>
      </div>
    </div>
  );
}
