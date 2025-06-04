'use client';

import Image from 'next/image';
import { Zap } from 'lucide-react';
import { fnIcons, fnLabels } from '@/utils/functionIcons';
import { useCart } from '@/app/karfa/lib/CartProvider';
import { formatISK } from '@/utils/format';
import { useTranslation } from 'react-i18next';

type Product = {
  _id: string;
  title: string;
  priceISK: number;
  slug: { current: string };
  brand?: string;
  functions?: string[];
  image: { asset: { url: string } };
};

type Bundle = {
  id: number;
  title: string;
  blurb: string;
  ribbon?: boolean;
  products: Product[];
};

function discountRate(totalQty: number, distinctBrands: number) {
  let pct = 0;
  if (totalQty >= 3) pct = 0.05;
  if (totalQty >= 5) pct = 0.1;
  if (totalQty >= 8) pct = 0.15;
  if (distinctBrands >= 3) pct += 0.05;
  return Math.min(pct, 0.25);
}

export default function PackagesPageClient({ bundles }: { bundles: Bundle[] }) {
  const { addItem } = useCart();
  const { t } = useTranslation('packages');

  return (
    <main className="max-w-7xl mx-auto grid xl:grid-cols-4 md:grid-cols-2 gap-8 p-6">
      {bundles.map((b) => {
        const qty = b.products.length;
        const brands = new Set(b.products.map((p) => p.brand)).size;
        const pct = discountRate(qty, brands);
        const sub = b.products.reduce((s, p) => s + p.priceISK, 0);
        const saving = Math.round(sub * pct);
        const total = sub - saving;
        const fnSet = new Set(b.products.flatMap((p) => p.functions ?? []));

        return (
          <article
            key={b.id}
            className="relative flex flex-col mt-10 bg-white rounded-3xl shadow ring-1 ring-gray-200 overflow-hidden"
          >
            <header className="h-28 bg-gradient-to-r from-cyan-600 to-blue-500 relative flex items-end">
              <Zap className="absolute right-6 bottom-6 w-20 h-20 text-white/30 -rotate-12" />
              <h2 className="text-2xl font-semibold text-white drop-shadow pl-6 pb-4">
                {b.title}
              </h2>
            </header>

            <section className="flex-1 flex flex-col p-6 gap-6">
              <p className="text-gray-700">{b.blurb}</p>

              <div className="flex gap-2">
                {Array.from(fnSet).map((fn) => {
                  const Icon = fnIcons[fn];
                  if (!Icon) return null;
                  return (
                    <span
                      key={fn}
                      title={fnLabels[fn]}
                      className="h-8 w-8 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                  );
                })}
              </div>

              <ul className="space-y-3 max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                {b.products.map((p) => (
                  <li key={p._id} className="flex items-center gap-3">
                    <Image
                      src={`${p.image.asset.url}?w=60&h=45&fit=crop&auto=format`}
                      alt={p.title}
                      width={60}
                      height={45}
                      className="rounded object-cover"
                    />
                    <span className="flex-1">{p.title}</span>
                    <span className="text-sm opacity-60">
                      {formatISK(p.priceISK)} kr.
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className={`rounded-lg p-4 text-sm flex justify-between ${
                  pct ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-600'
                }`}
              >
                <span>
                  {pct
                    ? `Afsláttur ${Math.round(pct * 100)} %`
                    : 'Enginn afsláttur'}
                </span>
                <span className="font-semibold">
                  - {formatISK(saving)} kr.
                </span>
              </div>

              <div className="mt-auto pt-4 border-t flex justify-between font-semibold text-lg">
                <span>{t('total') ?? 'Samtals'}</span>
                <span>{formatISK(total)} kr.</span>
              </div>
            </section>

            <button
              onClick={() =>
                b.products.forEach((p) =>
                  addItem({
                    id: p._id,
                    name: p.title,
                    price: Math.round(p.priceISK * (1 - pct)),
                  }),
                )
              }
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-4 transition"
            >
              {t('addAll') ?? 'Setja allt í körfu'}
            </button>
          </article>
        );
      })}
    </main>
  );
}

