'use client';

import React from 'react';

export default function FeaturedCarousel() {
  // Use Swiper or Keen‑slider later; for prototype just horizontally scroll cards
  const placeholders = Array.from({ length: 4 });
  return (
    <section className="overflow-x-auto whitespace-nowrap py-4">
      {placeholders.map((_, i) => (
        <div
          key={i}
          className="inline-block w-80 h-48 mx-2 bg-cyan-50 rounded-2xl shadow-md flex items-center justify-center text-2xl font-bold text-cyan-600"
        >
          Vara {i + 1}
        </div>
      ))}
    </section>
  );
}