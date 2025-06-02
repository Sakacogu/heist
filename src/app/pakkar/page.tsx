
import { sanity }            from '@/lib/sanity';
import PackagesPageClient    from './PackagesPageClient';

const TIERS = ['Starter', 'Comfort', 'Pro', 'Ultimate'] as const;

export const revalidate = 3600;

const query = `*[_type=="product" && defined(bundleTier)]{
    _id,title,priceISK,slug,brand,functions,image{asset->{url}},bundleTier
}`;
type Row = {
  _id:string;title:string;priceISK:number;slug:{current:string};
  brand?:string;functions?:string[];image:{asset:{url:string}};
  bundleTier:(typeof TIERS)[number];
};

async function getGrouped() {
  const rows: Row[] = await sanity.fetch(query);
  return rows.reduce<Record<string, Row[]>>((acc, r) => {
    acc[r.bundleTier] = acc[r.bundleTier] ? [...acc[r.bundleTier], r] : [r];
    return acc;
  }, {});
}

function buildBundles(groups: Record<string, Row[]>) {
  return TIERS.map((t, i) => ({
    id     : i + 1,
    title  : t === 'Starter' ? 'Starter ljós'
           : t === 'Comfort' ? 'Comfort heimili'
           : t === 'Pro'     ? 'Öryggispakki'
           :                   'Mix & Match',
    blurb  : t === 'Starter' ? 'Plug-and-play dimming in any room.'
           : t === 'Comfort' ? 'Lights + climate control + basic automations.'
           : t === 'Pro'     ? 'Motion, entry sensors & AI doorbell video.'
           :                   'Everything above + Wi-Fi 6 backbone.',
    ribbon : t === 'Comfort',
    products: groups[t] ?? [],
  }));
}

export default async function PackagesPage() {
  const groups  = await getGrouped();
  const bundles = buildBundles(groups);
  return <PackagesPageClient bundles={bundles} />;
}
