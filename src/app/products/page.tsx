import Image  from 'next/image';
import Link   from 'next/link';
import { sanity } from '@/lib/sanity';

export const revalidate = 3600;

type Product = {
  _id: string;
  title: string;
  slug: { current: string };
  brand: string;
  priceISK: number;
  image: { asset: { url: string } };
  functions?: string[];
};

const brandLabels: Record<string, string> = {
  Plejd:          'Plejd',
  Shelly:         'Shelly',
  UniFi:          'UniFi',
  HomeAssistant:  'Home Assistant',
};

const fnLabels: Record<string, string> = {
  lighting: 'Lýsing',
  heating:  'Hiti',
  security: 'Öryggi',
  wifi:     'Wi-Fi',
  blinds:   'Gardínur',
};

async function getProducts(brand?: string, fn?: string): Promise<Product[]> {
  const filters: string[] = [];
  if (brand) filters.push('brand==$brand');
  if (fn)    filters.push('$fn in functions');

  const where = filters.length ? ' && ' + filters.join(' && ') : '';
  const query = `*[_type=="product"${where}]{
    _id,title,slug,brand,priceISK,image{asset->{url}},functions
  } | order(title asc)`;

  const params: Record<string, string> = {};
  if (brand) params.brand = brand;
  if (fn)    params.fn    = fn;

  return sanity.fetch(query, params);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { brand?: string; fn?: string };
}) {
  const { brand, fn } = searchParams;
  const products      = await getProducts(brand, fn);

  return (
    <main className="max-w-7xl mx-auto p-16 space-y-6">

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className={`px-4 py-2 rounded-full border text-base font-medium
            ${!brand ? 'bg-cyan-600 text-white' : 'bg-white'}`}
        >
          Öll merki
        </Link>

        {Object.keys(brandLabels).map((b) => (
          <Link
            key={b}
            href={`/products?brand=${b}${fn ? `&fn=${fn}` : ''}`}
            className={`px-4 py-2 rounded-full border text-base font-medium
              ${brand === b ? 'bg-cyan-600 text-white' : 'bg-white'}`}
          >
            {brandLabels[b]}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={brand ? `/products?brand=${brand}` : '/products'}
          className={`px-3 py-1 rounded-full border text-sm
            ${!fn ? 'bg-cyan-100 text-cyan-800' : 'bg-white'}`}
        >
          Allar tegundir
        </Link>

        {Object.keys(fnLabels).map((key) => (
          <Link
            key={key}
            href={`/products?${brand ? `brand=${brand}&` : ''}fn=${key}`}
            className={`px-3 py-1 rounded-full border text-sm
              ${fn === key ? 'bg-cyan-100 text-cyan-800' : 'bg-white'}`}
          >
            {fnLabels[key]}
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p._id}
            href={`/products/${p.slug.current}`}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <Image
              src={p.image.asset.url + '?w=400&h=300&fit=crop&auto=format'}
              alt={p.title}
              width={400}
              height={300}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <span className="font-medium">{p.title}</span>

            <div className="flex gap-1 mt-2 flex-wrap">
              {p.functions?.map((f) => (
                <span key={f} className="px-2 py-0.5 bg-cyan-50 text-xs rounded">
                  {fnLabels[f] ?? f}
                </span>
              ))}
            </div>

            <span className="mt-auto text-cyan-600 font-semibold">
              {p.priceISK.toLocaleString('is-IS')} kr.
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
