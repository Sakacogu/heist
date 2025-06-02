'use client';

import Image  from 'next/image';
import { nanoid }    from 'nanoid';
import { useCart }   from '@/app/karfa/lib/cart-provider';
import { Zap }       from 'lucide-react';

function discountRate(qty: number, distinctBrands: number) {
  let pct = 0;
  if (qty >= 3) pct = 0.05;
  if (qty >= 5) pct = 0.10;
  if (qty >= 8) pct = 0.15;
  if (distinctBrands >= 3) pct += 0.05;
  return Math.min(pct, 0.25);
}

type Product = {
  _id: string;
  title: string;
  priceISK: number;
  slug: { current: string };
  brand?: string;
  image: { asset: { url: string } };
};
type Bundle = {
  id: number;
  title: string;
  blurb: string;
  ribbon: boolean;
  products: Product[];
};

export default function PackagesPageClient({ bundles }: { bundles: Bundle[] }) {
  const { addItem } = useCart();

  return (
    <main className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 p-10">
      {bundles.map((b) => {
        const qty        = b.products.length;
        const uniqBrands = new Set(b.products.map((p) => p.brand)).size;
        const subTotal   = b.products.reduce((s, p) => s + p.priceISK, 0);
        const pct        = discountRate(qty, uniqBrands);
        const savings    = Math.round(subTotal * pct);
        const total      = subTotal - savings;

        return (
          <div
            key={b.id}
            className="bundle-card group relative animate-fade-in"
          >
            {b.ribbon && (
              <span className="absolute -top-3 left-6 bg-amber-500 text-white
                               text-xs px-3 py-1 rounded-full shadow-lg">
                Mest keypt
              </span>
            )}

            <div className="bundle-header">
              <Zap className="absolute right-6 bottom-6 text-white/30 w-20 h-20 rotate-12" />
              <h2 className="absolute left-6 bottom-6 text-white text-2xl font-semibold drop-shadow">
                {b.title}
              </h2>
            </div>

            <div className="bundle-body">
              <p className="text-gray-700">{b.blurb}</p>

              <ul className="space-y-3">
                {b.products.map((p) => (
                  <li key={p._id} className="flex items-center gap-3">
                    <Image
                      src={p.image.asset.url + '?w=60&h=45&fit=crop&auto=format'}
                      alt={p.title}
                      width={60}
                      height={45}
                      className="rounded object-cover"
                    />
                    <span className="flex-1">{p.title}</span>
                    <span className="text-sm opacity-60">
                      {p.priceISK.toLocaleString('is-IS')} kr.
                    </span>
                  </li>
                ))}
              </ul>

              <div className="rounded-lg bg-gray-50 p-4 text-sm flex justify-between items-center">
                <span>
                  {pct > 0
                    ? `Afsláttur ${Math.round(pct * 100)} %`
                    : 'Enginn afsláttur'}
                </span>
                <span className="font-semibold">
                  − {savings.toLocaleString('is-IS')} kr.
                </span>
              </div>

              <div className="flex justify-between font-medium text-lg">
                <span>Samtals</span>
                <span>{total.toLocaleString('is-IS')} kr.</span>
              </div>
            </div>

            <button
              className="bg-cyan-600 text-white py-4 font-medium hover:bg-cyan-700 transition"
              onClick={() =>
                b.products.forEach((p) =>
                  addItem(
                    {
                      id:    p._id,
                      name:  p.title,
                      price: Math.round(p.priceISK * (1 - pct)),
                      image: p.image.asset.url +
                        '?w=160&h=120&fit=crop&auto=format',
                    },
                    1,
                  ),
                )
              }
            >
              Setja allt í körfu
            </button>
          </div>
        );
      })}
    </main>
  );
}
