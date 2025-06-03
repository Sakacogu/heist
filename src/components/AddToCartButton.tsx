'use client';

import { useCart } from '@/app/karfa/lib/CartProvider';
import type { CartItem } from '@/app/karfa/lib/CartProvider';

export default function AddToCartButton({ item }: { item: CartItem }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(item)}
      className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700"
    >
      Setja í körfu - {item.price.toLocaleString('is-IS')} kr.
    </button>
  );
}
