'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export type FeaturedItem = {
  id: string;
  name: string;
  image: string;
};

interface FeaturedCarouselProps {
  items?: FeaturedItem[];
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const itemsList =
    items && items.length > 0
      ? items
      : Array.from({ length: 6 }).map((_, i) => ({
          id: String(i),
          name: `Vara ${i + 1}`,
          image: '',
        }));

  const N = itemsList.length;
  const STEP = 400;
  const DRAG_THRESHOLD = 10;

  const [dragX, setDragX] = useState(0);
  const [current, setCurrent] = useState(0);

  const dragging = useRef(false);
  const didDrag = useRef(false);
  const startX = useRef(0);

  const router = useRouter();

  const prev = () => setCurrent((c) => (c - 1 + N) % N);
  const next = () => setCurrent((c) => (c + 1) % N);

  const diffFor = (i: number) => {
    let d = i - current;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    didDrag.current = false;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > DRAG_THRESHOLD) didDrag.current = true;
    setDragX(delta);
  };

  const onDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    const moved = -dragX / STEP;
    const roundMoved = Math.round(moved);
    setCurrent((c) => (c + roundMoved + N) % N);
    setDragX(0);
  };

  const scaleMap = [0.6, 0.8, 1, 0.8, 0.6];

  return (
    <div
      className="relative h-[520px] my-8 overflow-hidden w-full flex items-center justify-center"
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
      onWheel={(e) => {
        e.preventDefault();
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.deltaY > 0 ? next() : prev();
        } else {
          e.deltaX > 0 ? next() : prev();
        }
      }}
    >
      {itemsList.map((item, i) => {
        const diff = diffFor(i);
        const abs = Math.abs(diff);
        if (abs > 2) return null;

        const scale = scaleMap[diff + 2];
        const zIndex = 20 - abs;
        const xOffset = diff * STEP + dragX;

        return (
          <div
            key={item.id}
            className="absolute left-1/2 top-1/2 w-[672px] h-[448px] bg-cyan-50 rounded-3xl shadow-md flex items-center justify-center text-2xl font-bold text-cyan-600 overflow-hidden cursor-pointer"
            style={{
              transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${scale})`,
              zIndex,
              transition: dragging.current
                ? 'none'
                : 'transform 0.4s ease, z-index 0.4s ease',
            }}
            onClick={() => {
              if (!didDrag.current) {
                router.push(`/products/${item.id}`);
              }
            }}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              item.name
            )}
          </div>
        );
      })}
    </div>
  );
}
