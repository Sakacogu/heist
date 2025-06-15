"use client";

import {
  Activity,
  AlignVerticalJustifyCenter,
  Bluetooth,
  Camera,
  Cpu,
  Lightbulb,
  Shield,
  Thermometer,
  Wifi,
  Zap,
} from "lucide-react";
import Image from "next/image";

type Feature = { icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string };

type Brand = {
  name: string;
  logo: string;
  color: string;
  url: string;
  description: string;
  features: readonly Feature[];
};

const BRANDS: readonly Brand[] = [
  {
    name: "Plejd",
    logo: "/logos/plejd.png",
    color: "#00bbcf",
    url: "https://plejd.com/",
    description:
      "Bluetooth-mesh dimmers & relays for lighting, heating loops and motorised window coverings.",
    features: [
      { icon: Lightbulb, label: "Lights" },
      { icon: Thermometer, label: "Heat" },
      { icon: AlignVerticalJustifyCenter, label: "Blinds" },
      { icon: Bluetooth, label: "BT-Mesh" },
    ],
  },
  {
    name: "Shelly",
    logo: "/logos/shelly.png",
    color: "#0076bf",
    url: "https://shelly.com/",
    description:
      "Wi-Fi relays with power metering, roller-shutter control and upcoming Z-Wave LR sensors.",
    features: [
      { icon: Lightbulb, label: "Lights" },
      { icon: Thermometer, label: "Heat" },
      { icon: AlignVerticalJustifyCenter, label: "Blinds" },
      { icon: Activity, label: "kWh Meter" },
      { icon: Zap, label: "Relays" },
    ],
  },
  {
    name: "Home Assistant",
    logo: "/logos/homeassistant.png",
    color: "#03A9F4",
    url: "https://www.home-assistant.io/",
    description:
      "Open-source hub with 2800 + integrations, advanced automations and local voice.",
    features: [
      { icon: Cpu, label: "Automation" },
      { icon: Wifi, label: "Matter / Zigbee" },
      { icon: Lightbulb, label: "Lights" },
      { icon: Thermometer, label: "Climate" },
      { icon: Camera, label: "Cams" },
    ],
  },
  {
    name: "UniFi",
    logo: "/logos/unify.png",
    color: "#2984cf",
    url: "https://ui.com/",
    description:
      "Enterprise-grade Wi-Fi 6, PoE switching and Protect AI cameras for a rock-solid backbone.",
    features: [
      { icon: Wifi, label: "Wi-Fi 6" },
      { icon: Camera, label: "Protect Cam" },
      { icon: Shield, label: "Door Access" },
    ],
  },
];

export default function BrandList() {
  return (
    /* one column on mobile */
    <ul className="flex flex-col items-center gap-16">
      {BRANDS.map((brand) => (
        <li
          key={brand.name}
          className="flex w-72 flex-col items-center text-center"
        >
          <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={64}
              height={64}
              priority
            />
          </div>

          {/* external link to vendor site, colour-coded by brand */}
          <a
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-1 font-semibold text-lg hover:underline"
            style={{ color: brand.color }}
          >
            {brand.name}
          </a>

          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            {brand.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {brand.features.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex flex-col items-center text-xs text-gray-600 hover:text-cyan-600 transition"
              >
                <Icon className="w-5 h-5" />
                <span className="mt-0.5">{label}</span>
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
