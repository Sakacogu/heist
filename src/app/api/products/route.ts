import { sanity } from '@/lib/sanity';
export const runtime = 'edge';

export async function GET() {
  const data = await sanity.fetch(`*[_type=="product"]{
    _id,
    title,
    "brand": coalesce(brand, ""),
    "functions": functions[] || [],
    slug,
    priceISK
  }`);
  return Response.json(data, { status: 200 });
}
