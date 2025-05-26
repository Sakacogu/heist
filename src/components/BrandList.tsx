'use client';

import Image from 'next/image';
import {
  Lightbulb,
  Thermometer,
  AlignVerticalJustifyCenter,
  Activity,
  Zap,
  Wifi,
  Camera,
  Shield,
  Cpu,
  Bluetooth,
} from 'lucide-react';

const BRANDS = [
  {
    name: 'Plejd',
    logo: '/logos/plejd.png',
    color: '#00bbcf',
    url:  'https://plejd.com/',
    description:
      'Bluetooth-mesh dimmers & relays for lighting, heating loops and motorised window coverings.',
    features: [
      { icon: Lightbulb, label: 'Lights' },
      { icon: Thermometer, label: 'Heat' },
      { icon: AlignVerticalJustifyCenter, label: 'Blinds' },
      { icon: Bluetooth, label: 'BT-Mesh' },
    ],
  },
  {
    name: 'Shelly',
    logo: '/logos/shelly.png',
    color: '#0076bf',
    url:  'https://shelly.com/',
    description:
      'Wi-Fi relays with power metering, roller-shutter control and upcoming Z-Wave LR sensors.',
    features: [
      { icon: Lightbulb, label: 'Lights' },
      { icon: Thermometer, label: 'Heat' },
      { icon: AlignVerticalJustifyCenter, label: 'Blinds' },
      { icon: Activity, label: 'kWh Meter' },
      { icon: Zap, label: 'Relays' },
    ],
  },
  {
    name: 'Home Assistant',
    logo: '/logos/homeassistant.png',
    color: '#03A9F4',
    url:  'https://www.home-assistant.io/',
    description:
      'Open-source hub with 2800 + integrations, advanced automations and local voice.',
    features: [
      { icon: Cpu, label: 'Automation' },
      { icon: Wifi, label: 'Matter / Zigbee' },
      { icon: Lightbulb, label: 'Lights' },
      { icon: Thermometer, label: 'Climate' },
      { icon: Camera, label: 'Cams' },
    ],
  },
  {
    name: 'UniFi',
    logo: '/logos/unify.png',
    color: '#2984cf',
    url:  'https://ui.com/',
    description:
      'Enterprise-grade Wi-Fi 6, PoE switching and Protect AI cameras for a rock-solid backbone.',
    features: [
      { icon: Wifi, label: 'Wi-Fi 6' },
      { icon: Camera, label: 'Protect Cam' },
      { icon: Shield, label: 'Door Access' },
    ],
  },
] as const;

export default function BrandList() {
  return (
    <section className="flex flex-wrap justify-between px-22 gap-8">
      {BRANDS.map((b) => (
        <div key={b.name} className="flex flex-col items-center w-64 text-center">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center mb-4 shadow"
            style={{ backgroundColor: 'white' }}
          >
            <Image
              src={b.logo}
              alt={b.name}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          <a
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-lg mb-1 hover:underline"
            style={{ color: b.color }}
          >
            {b.name}
          </a>

          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            {b.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {b.features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-gray-600 hover:text-cyan-600 transition text-xs"
                title={label}
              >
                <Icon className="w-5 h-5" />
                <span className="mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
