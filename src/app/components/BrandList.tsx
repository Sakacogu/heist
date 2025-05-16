'use client';

import React from 'react';

export default function BrandList() {
  const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D'];
  return (
    <section className="flex flex-wrap gap-6 justify-center py-6">
      {brands.map((b) => (
        <div
          key={b}
          className="w-24 h-24 bg-silver-100 border border-silver-300 rounded-full flex items-center justify-center text-center text-sm font-medium shadow-sm"
        >
          {b}
        </div>
      ))}
    </section>
  );
}
