'use client'

import React, { use, useState } from 'react';
import ProductCard from '../components/ProductCard';

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Vara ${i + 1}`,
  price: (Math.random() * 9000 + 1000).toFixed(0),
  category: ['ljós', 'ofnar', 'gardínur', 'öryggi', 'innstungur'][i % 5],
}));

export default function ProductsPage() {
  const [active, setActive] = useState('all');
  const categories = ['all', 'ljós', 'ofnar', 'gardínur', 'öryggi', 'innstungur'];
  const filtered = active === 'all' ? mockProducts : mockProducts.filter((p) => p.category === active);
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              active === c ? 'bg-cyan-600 text-white' : 'bg-white text-gray-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}