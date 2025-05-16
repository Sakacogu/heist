'use client';

import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
    >
      <div className="h-40 bg-cyan-50 rounded-lg mb-3 flex items-center justify-center">
        <span className="font-semibold text-cyan-600">{product.name}</span>
      </div>
      <span className="text-gray-800 font-medium">{product.name}</span>
      <span className="mt-auto text-cyan-600 font-semibold">{product.price} kr.</span>
    </Link>
  );
}