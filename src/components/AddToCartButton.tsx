'use client';

import { useCart } from '../app/lib/cart-provider';

export function AddToCartButton({
  id,
  name,
  price,
  image
}: {
  id: string;
  name: string;
  price: number;
  image?: string;
}) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id, name, price, image })}
      className="w-full bg-cyan-600 text-white py-3 rounded-lg font-medium shadow hover:bg-cyan-700"
    >
      Setja í körfu
    </button>
  );
}
