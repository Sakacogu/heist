"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";

import LottieSlide from "@/components/LottieSlide";

export type FeaturedItem = {
  id: string;
  name: string;
  lottie: object;
  description: string;
  link?: string;
};

type FeaturedCarouselProps = { items: FeaturedItem[] };

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  // constants
  const STEP_PX = 400; // distance between slides
  const SCALE = [0.6, 0.8, 1, 0.8, 0.6]; // scaling for positions –2…+2
  const DRAG_TOLERANCE = 10; // px before a drag is “real”
  const ROTATE_MS = 6000; // auto-advance period

  // state & refs
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);

  const dragging = useRef(false);
  const didDrag = useRef(false);
  const dragStartX = useRef(0);
  const hoverPause = useRef(false);

  const router = useRouter();
  const itemCount = items.length;

  const slideDiff = (index: number) => {
    // shortest signed distance between current & index
    let d = index - current;
    if (d > itemCount / 2) d -= itemCount;
    if (d < -itemCount / 2) d += itemCount;
    return d;
  };

  const goNext = useCallback(
    () => setCurrent((c) => (c + 1) % itemCount),
    [itemCount],
  );

  const goPrev = useCallback(
    () => setCurrent((c) => (c - 1 + itemCount) % itemCount),
    [itemCount],
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (!dragging.current && !hoverPause.current) goNext();
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [goNext]);

  function handleDragStart(e: React.PointerEvent) {
    dragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handleDragMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > DRAG_TOLERANCE) didDrag.current = true;
    setDragX(dx);
  }

  function handleDragEnd(e: React.PointerEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    // snap to nearest slide
    const delta = Math.round(-dragX / STEP_PX);
    setCurrent((c) => (c + delta + itemCount) % itemCount);
    setDragX(0);
  }

  return (
    <div className="relative w-full h-full bg-gray-50">
      {/* track */}
      <div
        className="relative h-[520px] flex items-center justify-center overflow-hidden"
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
        onMouseEnter={() => (hoverPause.current = true)}
        onMouseLeave={() => (hoverPause.current = false)}
      >
        {items.map((item, i) => {
          const diff = slideDiff(i);
          if (Math.abs(diff) > 2) return null; // only render ±2 neighbours

          const x = diff * STEP_PX + dragX;
          const scale = SCALE[diff + 2];
          const z = 10 - Math.abs(diff); // depth ordering

          return (
            <div
              key={item.id}
              className="absolute left-1/2 top-1/2 h-[448px] w-[672px]
                         rounded-3xl bg-white shadow-md overflow-hidden
                         cursor-pointer"
              style={{
                transform: `translate(calc(-50% + ${x}px), -50%) scale(${scale})`,
                zIndex: z,
                transition: dragging.current ? "none" : "transform 0.06s ease",
              }}
              onClick={() =>
                !didDrag.current && router.push(item.link ?? "/products")
              }
            >
              {/* overlay text block */}
              <div className="absolute inset-0 z-10 flex items-start justify-center pt-6 pointer-events-none">
                <Link
                  href={item.link ?? "/products"}
                  className="pointer-events-auto block w-full mx-2 rounded-3xl
                             bg-cyan-500/90 px-6 py-4 text-center shadow-lg"
                >
                  <p className="text-xl text-gray-900">{item.description}</p>
                </Link>
              </div>

              {/* lottie animation */}
              <LottieSlide json={item.lottie} />
            </div>
          );
        })}
      </div>

      {/* nav buttons */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-6">
        <button
          onClick={goPrev}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goNext}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
