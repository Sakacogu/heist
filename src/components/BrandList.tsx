'use client';

import { useState } from 'react';

type BrandKey = 'Plejd' | 'Shelby' | 'HomeAssistant' | 'Unify';
interface Brand {
  name: string;
  desc: string;
  logo: string;
  color: string;
}

const BRAND_INFO: Record<BrandKey, Brand> = {
  Plejd: {
    name: 'Plejd',
    desc: 'Plejd offers smart lighting control via Bluetooth and cloud, easy to install and integrate.',
    logo: '/logos/plejd.png',
    color: '#00AEEF',
  },
  Shelby: {
    name: 'Shelby',
    desc: 'Shelby smart home hub connects all your devices and offers advanced automation rules.',
    logo: '/logos/shelby.png',
    color: '#FF5A1F',
  },
  HomeAssistant: {
    name: 'Home Assistant',
    desc: 'Home Assistant is an open-source home automation platform, highly customizable and community-driven.',
    logo: '/logos/homeassistant.png',
    color: '#03A9F4',
  },
  Unify: {
    name: 'Unify',
    desc: 'Unify by Ubiquiti delivers seamless Wi-Fi and smart home integration for prosumers.',
    logo: '/logos/unify.png',
    color: '#FF6C2C',
  },
};

export default function BrandList() {
  const [open, setOpen] = useState<Set<BrandKey>>(new Set());
  const toggle = (k: BrandKey) =>
    setOpen((s) => {
      const copy = new Set(s);
      copy.has(k) ? copy.delete(k) : copy.add(k);
      return copy;
    });

  return (
    <section className="px-10 py-8">
      <div className="flex justify-between">
        {(Object.keys(BRAND_INFO) as BrandKey[]).map((key) => {
          const { name, desc, logo, color } = BRAND_INFO[key];
          const isOpen = open.has(key);

          return (
            <div
              key={key}
              className="flex flex-col items-center"
              style={{ width: '10rem', height: '16rem' }}
            >
              <button
                onClick={() => toggle(key)}
                className="w-24 h-24 rounded-full flex items-center justify-center
                           border-2 transition-colors overflow-hidden"
                style={{
                  backgroundColor: color,
                  borderColor: isOpen ? color : '#ccc',
                }}
              >
                <img
                  src={logo}
                  alt={name}
                  className="max-w-full max-h-full object-contain"
                />
              </button>

              <div
                className={`mt-4 w-full transition-opacity ${
                  isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
              >
                <h4
                  className="mb-1 text-center font-semibold"
                  style={{ color }}
                >
                  {name}
                </h4>
                <p className="text-center text-sm leading-snug">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
