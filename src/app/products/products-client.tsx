"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { formatISK } from "@/utils/format";

type Product = {
  _id: string;
  title: string;
  slug: { current: string };
  brand: string;
  priceISK: number;
  image: { asset: { url: string } };
  functions?: string[];
};

const BRAND_KEYS = ["Plejd", "Shelly", "UniFi", "HomeAssistant"] as const;
const FN_KEYS = [
  "lighting",
  "heating",
  "security",
  "wifi",
  "blinds",
  "control",
] as const;

export default function ProductsClient({
  products,
  brand,
  fn,
}: {
  products: Product[];
  brand?: string;
  fn?: string;
}) {
  const { t } = useTranslation("products");

  const brandLabels: Record<string, string> = {
    Plejd: "Plejd",
    Shelly: "Shelly",
    UniFi: "UniFi",
    HomeAssistant: "Home Assistant",
  };

  const fnLabels: Record<string, string> = {
    lighting: t("lighting"),
    heating: t("heating"),
    security: t("security"),
    wifi: t("wifi"),
    blinds: t("blinds"),
    control: t("control"),
  };

  return (
    <main className="max-w-7xl mx-auto p-16 space-y-6">
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className={`px-4 py-2 rounded-full border text-base font-medium ${
            !brand ? "bg-cyan-600 text-white" : "bg-white"
          }`}
        >
          {t("allBrands")}
        </Link>

        {BRAND_KEYS.map((b) => (
          <Link
            key={b}
            href={`/products?brand=${b}${fn ? `&fn=${fn}` : ""}`}
            className={`px-4 py-2 rounded-full border text-base font-medium ${
              brand === b ? "bg-cyan-600 text-white" : "bg-white"
            }`}
          >
            {brandLabels[b]}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={brand ? `/products?brand=${brand}` : "/products"}
          className={`px-3 py-1 rounded-full border text-sm ${
            !fn ? "bg-cyan-100 text-cyan-800" : "bg-white"
          }`}
        >
          {t("allFunctions")}
        </Link>

        {FN_KEYS.map((k) => (
          <Link
            key={k}
            href={`/products?${brand ? `brand=${brand}&` : ""}fn=${k}`}
            className={`px-3 py-1 rounded-full border text-sm ${
              fn === k ? "bg-cyan-100 text-cyan-800" : "bg-white"
            }`}
          >
            {fnLabels[k]}
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
              src={`${p.image.asset.url}?w=400&h=300&fit=crop&auto=format`}
              alt={p.title}
              width={400}
              height={300}
              className="h-40 w-full object-cover rounded mb-3"
            />

            <span className="font-medium">{p.title}</span>

            <div className="flex gap-1 mt-2 flex-wrap">
              {p.functions?.map((f) => (
                <span
                  key={f}
                  className="px-2 py-0.5 bg-cyan-50 text-xs rounded"
                >
                  {fnLabels[f] ?? f}
                </span>
              ))}
            </div>

            <span className="t-auto text-cyan-600 font-semibold">
              {formatISK(p.priceISK)} kr.
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
