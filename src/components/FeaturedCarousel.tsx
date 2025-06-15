"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import LottieSlide from "@/components/LottieSlide";

export interface FeaturedItem {
  id: string;
  name: string;
  description: string;
  lottie: object;
  link?: string;
}

interface FeaturedCarouselProps {
  items: FeaturedItem[];
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const total = items.length;
  const STEP_PX = 400; // horizontal slide step
  const SCALE = [0.6, 0.8, 1, 0.8, 0.6] as const;
  const DRAG_THRESHOLD = 10;

  const [dragX, setDragX] = useState(0);
  const [current, setCurrent] = useState(0);

  const dragging = useRef(false);
  const didDrag = useRef(false);
  const startX = useRef(0);
  const hoverPause = useRef(false);

  const router = useRouter();

  // prev / next helpers
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // distance from current slide (shortest path in circular list)
  const diffFor = (i: number) => {
    let d = i - current;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  // Auto-advance every 6s unless user is dragging or hovering
  useEffect(() => {
    const id = setInterval(() => {
      if (!dragging.current && !hoverPause.current) next();
    }, 6000);
    return () => clearInterval(id);
  }, [total]);

  // Pointer drag handlers
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

    // convert drag distance to slide count
    const moved = Math.round(-dragX / STEP_PX);
    setCurrent((c) => (c + moved + total) % total);
    setDragX(0);
  };

  return (
    <div className="relative h-full w-full bg-gray-50">
      <div
        className="relative flex h-[520px] w-full items-center justify-center overflow-hidden"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => (hoverPause.current = true)}
        onMouseLeave={() => (hoverPause.current = false)}
      >
        {items.map((item, i) => {
          const diff = diffFor(i);
          const absDiff = Math.abs(diff);
          if (absDiff > 2) return null; // only render ±2 neighbours

          const scale = SCALE[diff + 2];
          const zIndex = 20 - absDiff;
          const xOffset = diff * STEP_PX + dragX;

          return (
            <div
              key={item.id}
              className="absolute top-1/2 left-1/2 h-[448px] w-[672px] cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md"
              style={{
                transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${scale})`,
                zIndex,
                transition: dragging.current
                  ? "none"
                  : "transform 0.04s ease, z-index 0.04s ease",
              }}
              onClick={() =>
                !didDrag.current && router.push(item.link ?? "/products")
              }
            >
              {/* description banner */}
              <div className="pointer-events-none absolute inset-0 z-50 flex items-start justify-center pt-6">
                <Link href={item.link ?? "/products"}>
                  <div className="m-2 w-full rounded-3xl border border-cyan-400 bg-cyan-500 p-6 shadow-md">
                    <p className="drop-shadow-lg text-xl text-gray-900">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </div>

              {/* lottie animation */}
              <LottieSlide json={item.lottie} />
            </div>
          );
        })}
      </div>

      {/* manual nav buttons */}
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
