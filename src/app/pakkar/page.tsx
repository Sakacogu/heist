import { sanity } from '@/lib/sanity';
import PackagesPageClient from './PackagesPageClient';

export const revalidate = 3600;

const bundleDefs = [
  {
    id: 1,
    tier: 'Starter',
    title: 'Starter ljós',
    blurb: 'Plug-and-play dimming in any room.',
    ribbon: false,
    slugList: ['plejd-dimmer-2', 'plejd-led-driver', 'shelly-plus1'],
  },
  {
    id: 2,
    tier: 'Comfort',
    title: 'Comfort heimili',
    blurb: 'Lights + climate control + basic automations.',
    ribbon: true,
    slugList: [
      'plejd-dimmer-2',
      'shelly-plus1',
      'shelly-temp-sensor',
      'ha-blue',
    ],
  },
  {
    id: 3,
    tier: 'Pro',
    title: 'Öryggispakki',
    blurb: 'Motion, entry sensors & AI doorbell video.',
    ribbon: false,
    slugList: ['unifi-door-sensor', 'shelly-motion', 'unifi-g4-doorbell'],
  },
  {
    id: 4,
    tier: 'Ultimate',
    title: 'Mix & Match',
    blurb: 'Everything above + Wi-Fi 6 backbone.',
    ribbon: false,
    slugList: [
      'plejd-dimmer-2',
      'shelly-plus1',
      'unifi-ap6-lite',
      'ha-blue',
      'unifi-g4-doorbell',
    ],
  },
];

async function buildBundles() {
  const query = `*[_type=="product" && slug.current in $slugs]{
      _id,title,priceISK,slug,brand,
      image{asset->{url}}
  }`;
  return Promise.all(
    bundleDefs.map(async (b) => ({
      ...b,
      products: await sanity.fetch(query, { slugs: b.slugList }),
    })),
  );
}

export default async function PackagesPage() {
  const bundles = await buildBundles();
  return <PackagesPageClient bundles={bundles} />;
}
