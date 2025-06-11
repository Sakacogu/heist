import { sanity } from "@/lib/sanity";
import ProductsClient from "./products-client";

export const revalidate = 3600;

async function getProducts(brand?: string, fn?: string) {
  const filters: string[] = [];
  const params: Record<string, string> = {};

  if (brand) {
    filters.push("brand == $brand");
    params.brand = brand;
  }
  if (fn) {
    filters.push("$fn in functions");
    params.fn = fn;
  }

  const where = filters.length ? ` && ${filters.join(" && ")}` : "";
  const query = `*[_type == "product"${where}]{
      _id,title,slug,brand,priceISK,functions,
      image{asset->{url}}
    } | order(title asc)`;

  return sanity.fetch(query, params);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { brand?: string; fn?: string };
}) {
  let { brand, fn } = searchParams;
  if (brand === "undefined") brand = undefined;
  if (fn === "undefined") fn = undefined;

  const products = await getProducts(brand, fn);

  return <ProductsClient products={products} brand={brand} fn={fn} />;
}
