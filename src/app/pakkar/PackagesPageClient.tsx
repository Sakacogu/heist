'use client';

import Image from 'next/image';
import { useCart, type CartItem } from '@/app/lib/cart-provider';
import { useTranslation } from 'react-i18next';

/* -------- types coming from the server component -------- */
type Bundle = {
  id: number;
  tKey: string; // translation key for the bundle title
  products: {
    _id: string;
    title: string;
    priceISK: number;
    image: { asset: { url: string } };
  }[];
};

export default function PackagesPageClient({ bundles }: { bundles: Bundle[] }) {
  const { addItem } = useCart();
  const { t } = useTranslation();           // ✅ hook inside component

  return (
    <main className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-6">
      {bundles.map((b) => {
        const total = b.products.reduce((sum, p) => sum + p.priceISK, 0);

        return (
          <div key={b.id} className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">{t(b.tKey)}</h2>

            <ul className="flex-1 space-y-3 mb-6">
              {b.products.map((p) => (
                <li key={p._id} className="flex items-center gap-2 text-sm">
                  <Image
                    src={`${p.image.asset.url}?w=40&h=40&fit=crop&auto=format`}
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
              onClick={() =>
                b.products.forEach((p) =>
                  addItem({
                    id: p._id,
                    name: p.title,
                    price: p.priceISK,
                    image: `${p.image.asset.url}?w=160&h=120&fit=crop&auto=format`,
                  } as CartItem),
                )
              }
              className="bg-cyan-600 text-white w-full py-3 rounded-lg font-medium hover:bg-cyan-700"
            >
              {t('addToCart')} – {total.toLocaleString('is-IS')} kr.
            </button>
          </div>
        );
      })}
    </main>
  );
}
