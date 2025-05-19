'use client';

import { useState, useRef } from 'react';

export default function FeaturedCarousel() {
  const items = Array.from({ length: 6 });
  const N = items.length;
  const STEP = 400;

  const [dragX, setDragX] = useState(0);
  
  const dragging = useRef(false);
  const startX = useRef(0);
  const wheelAccum = useRef(0);
  const WHEEL_THRESHOLD = 150;

  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + N) % N);
  const next = () => setCurrent((c) => (c + 1) % N);

  const diffFor = (i: number) => {
    let d = i - current;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;

    const moved = -dragX / STEP;
    const roundMoved = Math.round(moved);
    setCurrent((c) => (c + roundMoved + N) % N);

  };

  const onDragStart = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setDragX(e.clientX - startX.current);
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

  return (
    <div className="relative h-[520px] my-8 overflow-hidden w-full flex items-center justify-center"
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
  >

      {items.map((_, i) => {
        const diff = diffFor(i);
        const abs = Math.abs(diff);

        if (abs > 2) return null;

        const scaleMap = [0.6, 0.8, 1, 0.8, 0.6];
        const scale = scaleMap[diff + 2];

        const zIndex = 20 - abs;

        const xOffset = diff * STEP + dragX;

        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2  w-[672px] h-[448px] bg-cyan-50 rounded-3xl shadow-md
                       flex items-center justify-center text-2xl font-bold text-cyan-600"
            style={{
              transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${scale})`,
              zIndex,
              transition: dragging.current ? 'none' : 'transform 0.4s ease, z-index 0.4s ease',
            }}
          >
            Vara {i + 1}
          </div>
        );
      })}
    </div>
  );
}
