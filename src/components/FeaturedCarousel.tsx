'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedCarousel() {
  const items = Array.from({ length: 6 });
  const N = items.length;
  const STEP = 400;

  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + N) % N);
  const next = () => setCurrent((c) => (c + 1) % N);

  const diffFor = (i: number) => {
    let d = i - current;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  return (
    <div className="relative h-164 my-8 overflow-hidden w-full flex items-center justify-center">
      <button
        onClick={prev}
        className="absolute left-4 z-20 p-2 bg-white rounded-full shadow hover:bg-gray-100"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 z-20 p-2 bg-white rounded-full shadow hover:bg-gray-100"
      >
        <ChevronRight size={28} />
      </button>

      {items.map((_, i) => {
        const diff = diffFor(i);
        const abs = Math.abs(diff);

        if (abs > 2) return null;

        const scaleMap = [0.6, 0.8, 1, 0.8, 0.6];
        const scale = scaleMap[diff + 2];

        const zIndex = 10 + (2 - abs);

        const xOffset = diff * STEP;

        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2  w-[672px] h-[448px] bg-cyan-50 rounded-3xl shadow-md
                       flex items-center justify-center text-2xl font-bold text-cyan-600"
            style={{
              transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${scale})`,
              zIndex,
              transition: 'transform 0.4s ease, z-index 0.4s ease',
            }}
          >
            Vara {i + 1}
          </div>
        );
      })}
    </div>
  );
}
