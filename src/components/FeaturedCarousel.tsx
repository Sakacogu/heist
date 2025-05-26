'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LottieSlide from '@/components/LottieSlide';

export type FeaturedItem = {
  id: string;
  name: string;
  lottie: object;
};

interface FeaturedCarouselProps {
  items: FeaturedItem[];
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const itemsList = items;
  const N = itemsList.length;

  const STEP = 400;
  const SCALE = [0.6, 0.8, 1, 0.8, 0.6];
  const DRAG_THRESHOLD = 10;

  const [dragX, setDragX] = useState(0);
  const [current, setCurrent] = useState(0);

  const dragging = useRef(false);
  const didDrag = useRef(false);
  const startX = useRef(0);
  const hoverPause = useRef(false);

  const router = useRouter();

  const prev = () => setCurrent((c) => (c - 1 + N) % N);
  const next = () => setCurrent((c) => (c + 1) % N);

  const diffFor = (i: number) => {
    let d = i - current;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!dragging.current && !hoverPause.current) next();
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    didDrag.current = false;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > DRAG_THRESHOLD) didDrag.current = true;
    setDragX(dx);
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    const moved = -dragX / STEP;
    setCurrent((c) => (c + Math.round(moved) + N) % N);
    setDragX(0);
  };

  return (
    <div className="relative w-full h-full bg-gray-50">

      <div
        className="relative h-[520px] overflow-hidden w-full flex items-center justify-center"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => (hoverPause.current = true)}
        onMouseLeave={() => (hoverPause.current = false)}
      >
        {itemsList.map((item, i) => {
          const diff = diffFor(i);
          const abs = Math.abs(diff);
          if (abs > 2) return null;

          const scale = SCALE[diff + 2];
          const zIndex = 20 - abs;
          const xOffset = diff * STEP + dragX;

          return (
            <div
              key={item.id}
              className="absolute left-1/2 top-1/2 w-[672px] h-[448px] rounded-3xl shadow-md overflow-hidden cursor-pointer bg-white"
              style={{
                transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${scale})`,
                zIndex,
                transition: dragging.current
                  ? 'none'
                  : 'transform 0.4s ease, z-index 0.4s ease',
              }}
              onClick={() => {
                if (!didDrag.current) router.push('/products');
              }}
            >
              <LottieSlide json={item.lottie} />
            </div>
          );
        })}
      </div>


      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-6">
        <button
          onClick={prev}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
