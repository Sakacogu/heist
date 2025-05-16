'use client';

import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../app';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = { id, name: `Vara ${id}`, price: 4990 };
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:flex md:gap-10">
      <div className="md:w-1/2 bg-cyan-50 rounded-xl h-96 flex items-center justify-center text-3xl font-bold text-cyan-600">
        {product.name}
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0">
        <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
        <label className="block mb-2 font-medium">Stk</label>
        <input type="number" defaultValue={1} min={1} className="w-24 mb-4 border rounded p-2" />
        <label className="block mb-2 font-medium">Gerð</label>
        <select className="mb-6 border rounded p-2">
          <option>Standard</option>
          <option>Pro</option>
        </select>
        <div className="flex gap-4">
          <button
            onClick={() => addItem(product)}
            className="flex-1 bg-cyan-600 text-white rounded-lg px-4 py-3 font-medium shadow hover:bg-cyan-700"
          >
            Setja í körfu
          </button>
          <button className="flex-1 bg-gray-100 text-gray-800 rounded-lg px-4 py-3 font-medium shadow hover:bg-gray-200">
            Setja í pakka
          </button>
        </div>
      </div>
    </div>
  );
}