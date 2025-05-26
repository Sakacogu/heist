'use client';

import Image from 'next/image';
import { useCart } from '@/app/lib/cart-provider';
import type { CartItem } from '@/app/lib/cart-provider';

type Bundle = {
  id: number;
  title: string;
  products: {
    _id: string;
    title: string;
    priceISK: number;
    image: { asset: { url: string } };
  }[];
};

export default function PackagesPageClient({ bundles }: { bundles: Bundle[] }) {
  const { addItem } = useCart();

  return (
    <main className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-6">
      {bundles.map((b) => {
        const total = b.products.reduce((s, p) => s + p.priceISK, 0);

        return (
          <div key={b.id} className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">{b.title}</h2>

            {/* product list */}
            <ul className="flex-1 space-y-3 mb-6">
              {b.products.map((p) => (
                <li key={p._id} className="flex items-center gap-2 text-sm">
                  <Image
                    src={p.image.asset.url + '?w=40&h=40&fit=crop&auto=format'}
                    alt={p.title}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                  {p.title}
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                b.products.forEach((p) =>
                  addItem({
                    id: p._id,
                    name: p.title,
                    price: p.priceISK,
                    image: p.image.asset.url + '?w=160&h=120&fit=crop&auto=format',
                  } as CartItem),
                );
              }}
              className="bg-cyan-600 text-white w-full py-3 rounded-lg font-medium hover:bg-cyan-700"
            >
              Setja í körfu – {total.toLocaleString('is-IS')} kr.
            </button>
          </div>
        );
      })}
    </main>
  );
}
