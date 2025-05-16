'use client';

import React from 'react';
import FeaturedCarousel from '../components/FeaturedCarousel';
import BrandList from '../components/BrandList';
import VoiceAssistantSection from '../components/VoiceAssistantSection';
import VideoList from '../components/VideoList';

export default function HomePage() {
  return (
    <div>
      <FeaturedCarousel />
      <div className="md:flex md:items-start md:justify-center md:gap-8 px-4">
        <div className="md:w-2/3">
          <BrandList />
          <VoiceAssistantSection />
        </div>
        <aside className="md:w-1/3">
          <VideoList />
        </aside>
      </div>
    </div>
  );
}