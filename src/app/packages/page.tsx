import { sanity } from "../../lib/sanityClient";

import PackagesPageClient from "./package-page";

/* The four tiers stored in Sanity */
const TIERS = ["Starter", "Comfort", "Pro", "Ultimate"] as const;

export const revalidate = 3600;

const query = `*[_type=="product" && defined(bundleTier)]{
    _id,title,priceISK,slug,brand,functions,image{asset->{url}},bundleTier
}`;

type Row = {
  _id: string;
  title: string;
  priceISK: number;
  brand?: string;
  functions?: string[];
  image: { asset: { url: string } };
  bundleTier: (typeof TIERS)[number];
};

async function getProductsGroupedByTier() {
  const rows: Row[] = await sanity.fetch(query);

  return rows.reduce<Record<string, Row[]>>((acc, row) => {
    (acc[row.bundleTier] ??= []).push(row);
    return acc;
  }, {});
}

function buildBundles(groups: Record<string, Row[]>) {
  const COPY: Record<(typeof TIERS)[number], { title: string; blurb: string }> =
  {
    Starter: {
      title: 'Starter ljós',
      blurb: 'Plug-and-play dimming in any room.',
    },
    Comfort: {
      title: 'Comfort heimili',
      blurb: 'Lights + climate control + basic automations.',
    },
    Pro: {
      title: 'Öryggispakki',
      blurb: 'Motion, entry sensors & AI doorbell video.',
    },
    Ultimate: {
      title: 'Mix & Match',
      blurb: 'Everything above + Wi-Fi 6 backbone.',
    },
  };

  return TIERS.map((tier, idx) => ({
    id: idx + 1,
    title: COPY[tier].title,
    blurb: COPY[tier].blurb,
    ribbon: tier === 'Comfort',
    products: groups[tier] ?? [],
  }));
}

export default async function PackagesPage() {
  const grouped = await getProductsGroupedByTier();
  const bundles = buildBundles(grouped);

  return <PackagesPageClient bundles={bundles} />;
}