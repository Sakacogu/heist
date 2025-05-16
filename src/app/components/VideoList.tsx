'use client';

import React from 'react';

export default function VideoList() {
  return (
    <section className="grid md:grid-cols-3 gap-4 py-6 px-4">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="bg-black/10 rounded-xl aspect-video flex items-center justify-center text-lg font-bold text-gray-600"
        >
          Video {n}
        </div>
      ))}
    </section>
  );
}