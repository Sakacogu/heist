import {
  Zap,
  Lightbulb,
  Thermometer,
  Wifi,
  Cpu,
  Activity,
  Camera,
  Home,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import FeatureCard from "@/components/FeatureCard";

type Feature = { icon: LucideIcon; label: string };

interface System {
  title: string;
  icon: LucideIcon;
  description: string;
  features: Feature[];
  href: string;
}

export const metadata = { title: "Heist - Uppsetning" };

const systems: System[] = [
  {
    title: "Plejd",
    icon: Zap,
    description:
      "Bluetooth-mesh dimmers & relays sem rafvirkjar treysta fyrir lýsingu, raf­tenglum og stemningu.",
    features: [
      { icon: Lightbulb, label: "Lýsing" },
      { icon: Zap, label: "Mesh dimming" },
    ],
    href: "/products?brand=Plejd",
  },
  {
    title: "Shelly",
    icon: Activity,
    description:
      "Wi-Fi rofar og afl­mælar sem sýna rafmagns­notkun í rauntíma og lækka orkukostnað strax.",
    features: [
      { icon: Thermometer, label: "Aflmæling" },
      { icon: Wifi, label: "Wi-Fi rofar" },
    ],
    href: "/products?brand=Shelly",
  },
  {
    title: "Home Assistant",
    icon: Cpu,
    description:
      "Opinn, staðbundinn hub með 2800+ samþættingum - sameinar Plejd, Shelly, UniFi og raddaðstoð.",
    features: [
      { icon: Cpu, label: "Sjálfvirkni" },
      { icon: Home, label: "2800+ tæki" },
    ],
    href: "/products?brand=HomeAssistant",
  },
  {
    title: "UniFi",
    icon: Wifi,
    description:
      "Enterprise-Wi-Fi 6 og Protect myndavélar - hraðvirk og stöðug nettenging fyrir alla snjalltæki.",
    features: [
      { icon: Wifi, label: "Wi-Fi 6" },
      { icon: Camera, label: "Protect vélar" },
    ],
    href: "/products?brand=UniFi",
  },
];

export default function SetupPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Veldu snjallkerfin þín</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Við notum fjórar lausnir sem passa saman eins og púsl. Hér sérðu hvað
          hver lausn gerir - og hvernig þær mynda eitt heilsteypt
          heimastýringarkerfi.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        {systems.map((s) => (
          <FeatureCard
            key={s.title}
            title={s.title}
            icon={s.icon}
            description={s.description}
            features={s.features}
            href={s.href}
          />
        ))}
      </section>

      {/* Comparison table */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Flýtisamanburður</h2>
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full text-left border-collapse">
            <thead className="bg-cyan-600 text-white">
              <tr>
                {[
                  "Kerfi",
                  "Lýsing / Dimming",
                  "Aflmæling",
                  "Wi-Fi 6",
                  "Sjálfvirkni",
                  "Myndavélar",
                ].map((h) => (
                  <th key={h} className="p-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ["Plejd", "✓", "", "", "✓ (Fyrir reglur)", ""],
                ["Shelly", "✓", "✓", "", "✓", ""],
                [
                  "Home Assistant",
                  "✓ (í gegnum Plejd)",
                  "✓ (í gegnum Shelly)",
                  "",
                  "✓✓✓",
                  "✓ (Protect + ONVIF)",
                ],
                ["UniFi", "", "", "✓", "", "✓✓✓"],
              ].map((row) => (
                <tr key={row[0]} className="hover:bg-gray-50">
                  {row.map((cell, idx) => (
                    <td key={idx} className="p-3">
                      {cell || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-center">
          ✓ = grunnstuðningur · ✓✓✓ = full samþætting
        </p>
      </section>

      <section className="text-center space-y-4">
        <h3 className="text-xl font-semibold">
          Klárt að smíða drauma-heimakerfið?
        </h3>
        <Link
          href="/products"
          className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-lg shadow hover:bg-cyan-700 transition"
        >
          Skoða vörur & pakkar
        </Link>
      </section>
    </main>
  );
}
