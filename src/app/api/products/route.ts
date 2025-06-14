import { sanity } from "@/lib/sanity";
export const runtime = "edge"; // run close to the user for faster response

export async function GET() {
    // fetch the minimal fields needed for the product list
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
