import Image from "next/image";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/AddToCartButton";
import { sanity } from "@/lib/sanity";

export const revalidate = 3600; // ISR – refresh once per hour

/** Sanity GROQ fetch wrapped in a helper so the query text is not inlined */
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id, title, priceISK, blurb, image{asset->{url}}
  }`;
  return sanity.fetch(query, { slug });
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  const cartItem = {
    id: product._id,
    name: product.title,
    price: product.priceISK,
    image: `${product.image.asset.url}?w=160&h=120&fit=crop&auto=format`,
    qty: 1,
    cartId: '', // Default cart ID
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:flex md:gap-10">
      <Image
        src={`${product.image.asset.url}?w=800&h=600&fit=crop&auto=format`}
        alt={product.title}
        width={800}
        height={600}
        className="rounded-xl object-cover md:w-1/2"
        priority
      />

      <section className="md:w-1/2 mt-8 md:mt-0 flex flex-col text-center md:text-left">
        <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>

        {product.blurb && (
          <p className="mb-6 text-gray-700 leading-relaxed">{product.blurb}</p>
        )}

        <AddToCartButton item={cartItem} />
      </section>
    </div>
  );
}
