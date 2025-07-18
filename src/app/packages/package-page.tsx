"use client";

import { Zap } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { useCart } from "@/app/cart/cart-provider";
import { formatISK } from "@/utils/format";
import { fnIcons, fnLabels } from "@/utils/functionIcons";

type Product = {
    _id: string;
    title: string;
    priceISK: number;
    brand?: string;
    functions?: string[];
    image: { asset: { url: string } };
};

type Bundle = {
    id: number;
    title: string;
    blurb: string;
    ribbon?: boolean;
    products: Product[];
};

/** percentage discount based on item count + unique brands */
const bundleDiscountRate = (qty: number, brandCount: number): number =>
    Math.min(
        (qty >= 8 ? 0.15 : qty >= 5 ? 0.1 : qty >= 3 ? 0.05 : 0) +
        (brandCount >= 3 ? 0.05 : 0),
        0.25,
    );

export default function PackagesPageClient({ bundles }: { bundles: Bundle[] }) {
    const { addItems } = useCart();
    const { t } = useTranslation("packages");

    return (
        <main className="max-w-7xl mx-auto grid xl:grid-cols-4 md:grid-cols-2 gap-8 p-6">
            {bundles.map((bundle) => {
                const qty = bundle.products.length;
                const brandCount = new Set(bundle.products.map((p) => p.brand)).size;
                const pct = bundleDiscountRate(qty, brandCount);

                const subtotal = bundle.products.reduce((s, p) => s + p.priceISK, 0);
                const saving = Math.round(subtotal * pct);
                const totalISK = subtotal - saving;

                const functionSet = new Set(
                    bundle.products.flatMap((p) => p.functions ?? []),
                );

                return (
                    <article
                        key={bundle.id}
                        className="relative flex flex-col mt-10 bg-white rounded-3xl shadow ring-1 ring-gray-200 overflow-hidden"
                    >
                        {bundle.ribbon && (
                            <span className="absolute -top-3 left-6 bg-amber-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                                Mest&nbsp;keypt
                            </span>
                        )}

                        <header className="h-28 bg-gradient-to-r from-cyan-600 to-blue-500 relative flex items-end">
                            <Zap className="absolute right-6 bottom-6 w-20 h-20 text-white/30 -rotate-12" />
                            <h2 className="text-2xl font-semibold text-white drop-shadow pl-6 pb-4">
                                {bundle.title}
                            </h2>
                        </header>

                        <section className="flex-1 flex flex-col p-6 gap-6 max-h-[26rem] overflow-y-auto">
                            <p className="text-gray-700">{bundle.blurb}</p>

                            <div className="flex gap-2">
                                {Array.from(functionSet).map((fn) => {
                                    const Icon = fnIcons[fn];
                                    return Icon ? (
                                        <span
                                            key={fn}
                                            title={fnLabels[fn]}
                                            className="h-8 w-8 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center"
                                        >
                                            <Icon className="w-4 h-4" />
                                        </span>
                                    ) : null;
                                })}
                            </div>

                            <ul className="space-y-3">
                                {bundle.products.map((p) => (
                                    <li key={p._id} className="flex items-center gap-3">
                                        <Image
                                            src={`${p.image.asset.url}?w=60&h=45&fit=crop&auto=format`}
                                            alt={p.title}
                                            width={60}
                                            height={45}
                                            className="rounded object-cover"
                                        />
                                        <span className="flex-1">{p.title}</span>
                                        <span className="text-sm opacity-60">
                                            {formatISK(p.priceISK)} kr.
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div
                                className={`rounded-lg p-4 text-sm flex justify-between
                               ${pct
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-gray-50 text-gray-600"
                                    }`}
                            >
                                <span>
                                    {pct
                                        ? `Afsláttur ${Math.round(pct * 100)} %`
                                        : "Enginn afsláttur"}
                                </span>
                                <span className="font-semibold">− {formatISK(saving)} kr.</span>
                            </div>
                        </section>

                        <div className="flex justify-between font-semibold text-lg px-6 py-4 border-t">
                            <span>{t('total')}</span>
                            <span>{formatISK(totalISK)} kr.</span>
                        </div>

                        <button
                            onClick={() =>
                                addItems(
                                    bundle.products.map((p) => ({
                                        id: p._id,
                                        name: p.title,
                                        price: Math.round(p.priceISK * (1 - pct)),
                                        image: p.image.asset.url,
                                        qty: 1,
                                        cartId: '', // provider will replace with nanoid()
                                    })),
                                )
                            }
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-4 transition"
                        >
                            {t("addAll")}
                        </button>
                    </article>
                );
            })}
        </main>
    );
}