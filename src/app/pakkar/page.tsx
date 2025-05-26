import { sanity } from '@/lib/sanity';
import PackagesPageClient from './PackagesPageClient';

export const revalidate = 3600;

const bundleDefs = [
  {
    id: 1,
    title: 'Starter ljós',
    slugList: ['plejd-dimmer-2', 'plejd-led-driver', 'shelly-plus1'],
  },
  {
    id: 2,
    title: 'Öryggispakki',
    slugList: ['unifi-door-sensor', 'shelly-motion', 'unifi-g4-doorbell'],
  },
  {
    id: 3,
    title: 'Mix & Match',
    slugList: ['plejd-dimmer-2', 'shelly-plus1', 'unifi-ap6-lite', 'ha-blue'],
  },
];

async function buildBundles() {
  const query = `*[_type=="product" && slug.current in $slugs]{
      _id,title,priceISK,slug,
      image{asset->{url}}
    }`;
  return Promise.all(
    bundleDefs.map(async (b) => {
      const products = await sanity.fetch(query, { slugs: b.slugList });
      return { ...b, products };
    }),
  );
}

export default async function PackagesPage() {
  const bundles = await buildBundles();
  console.log(JSON.stringify(bundles, null, 2));
}
