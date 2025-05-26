import Image from 'next/image';
import Link  from 'next/link';
import { sanity } from '@/lib/sanity';

export const revalidate = 3600;

type Product = {
  _id: string;
  title: string;
  slug: { current: string };
  brand: string;
  priceISK: number;
  image: { asset: { url: string } };
};

async function getProducts(brand?: string): Promise<Product[]> {
  const query = `*[_type=="product"${brand ? ' && brand==$brand' : ''}]{
    _id,title,slug,brand,priceISK,image{asset->{url}}
  } | order(title asc)`;

  const params = brand ? { brand } : {};

  return sanity.fetch(query, params);
}

export default async function ProductsPage({
  searchParams,
}: { searchParams: { brand?: string } }) {
  const products = await getProducts(searchParams.brand);

  return (
    <main className="max-w-7xl mx-auto p-10 text-center">
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {['all','UniFi','Plejd','Shelly','HomeAssistant'].map((b) => (
          <Link
            key={b}
            href={b==='all' ? '/products' : `/products?brand=${b}`}
            className={`px-4 py-1 rounded-full border
              ${searchParams.brand===b ? 'bg-cyan-600 text-white' : 'bg-white'}`}
          >
            {b}
          </Link>
        ))}
      </div>

      {/* Product cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p._id}
            href={`/products/${p.slug.current}`}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <Image
              src={p.image.asset.url+'?w=400&h=300&fit=crop&auto=format'}
              alt={p.title}
              width={400} height={300}
              className="rounded mb-3 h-40 w-full object-cover"
            />
            <span className="font-medium">{p.title}</span>
            <span className="mt-auto text-cyan-600 font-semibold">
              {p.priceISK.toLocaleString('is-IS')} kr.
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
