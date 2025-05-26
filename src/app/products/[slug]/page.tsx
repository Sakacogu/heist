import Image from 'next/image';
import { notFound } from 'next/navigation';
import { sanity } from '@/lib/sanity';
import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 3600; // ISR cache

export default async function ProductDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await sanity.fetch(
    `*[_type=="product" && slug.current==$slug][0]{
      _id,title,priceISK,brand,blurb,
      image{asset->{url}}
    }`,
    { slug }
  );

  if (!product) return notFound();

  const cartItem = {
    id:    product._id,
    name:  product.title,
    price: product.priceISK,
    image: product.image.asset.url + '?w=160&h=120&fit=crop&auto=format',
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 md:flex md:gap-10 text-center">
      <Image
        src={product.image.asset.url + '?w=800&h=600&fit=crop&auto=format'}
        alt={product.title}
        width={800}
        height={600}
        className="rounded-xl object-cover md:w-1/2"
      />

      <section className="md:w-1/2 justify-center flex flex-col mt-6 md:mt-0">
        <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
        <p className="mb-6 text-gray-700">{product.blurb}</p>

        <AddToCartButton item={cartItem} />
      </section>
    </main>
  );
}
