import ProductsClient from './productsClient';
import { sanity } from '@/lib/sanity';

export const revalidate = 3600; 

export default async function ProductsPage({
  searchParams,
}: { searchParams: { brand?: string; fn?: string } }) {
  const { brand, fn } = searchParams;

  const query = `*[_type=="product"]{ _id,title,priceISK,slug,brand,functions,
                    image{asset->{url}} }`;
  const products = await sanity.fetch(query, { brand, fn });

  return <ProductsClient products={products} brand={brand} fn={fn} />;
}
