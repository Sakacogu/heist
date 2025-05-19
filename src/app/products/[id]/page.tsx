'use client';

import { useCart } from '../../lib/cart-provider';

export default function ProductDetail({ params }: { params: { id: string } }) {

  const { addItem } = useCart();
  const product = { id: params.id, name: `Vara ${params.id}`, price: 4990 };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:flex md:gap-10">
      <div className="md:w-1/2 bg-cyan-50 rounded-xl h-96 flex items-center justify-center text-3xl font-bold text-cyan-600">{product.name}</div>
      <div className="md:w-1/2 mt-6 md:mt-0">
        <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
        <button onClick={()=>addItem(product)} className="w-full bg-cyan-600 text-white py-3 rounded-lg font-medium shadow hover:bg-cyan-700">Setja í körfu – {product.price} kr.</button>
      </div>
    </div>
  );
}