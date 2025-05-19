'use client';

import { useState } from 'react';

const BRAND_INFO: Record<string, { name: string; desc: string }> = {
  Plejd: {
    name: 'Plejd',
    desc: 'Plejd offers smart lighting control via Bluetooth and cloud, easy to install and integrate.',
  },
  Shelby: {
    name: 'Shelby',
    desc: 'Shelby smart home hub connects all your devices and offers advanced automation rules.',
  },
  HomeAssistant: {
    name: 'Home Assistant',
    desc: 'Home Assistant is an open-source home automation platform, highly customizable and community-driven.',
  },
  Unify: {
    name: 'Unify',
    desc: 'Unify by Ubiquiti delivers seamless Wi-Fi and smart home integration for prosumers.',
  },
};

export default function BrandList() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section className="py-6 px-4">
      <div className="flex justify-between">
        {Object.keys(BRAND_INFO).map((key) => (
          <div key={key} className="flex flex-col items-center">
            <button
              onClick={() => toggle(key)}
              className={`
                w-24 h-24 rounded-full flex items-center justify-center
                border-2 transition-colors mb-2
                ${open.has(key) ? 'border-cyan-600 bg-cyan-50' : 'border-gray-300 bg-white'}
              `}
            >
              <span className="text-center text-sm font-semibold">
                {BRAND_INFO[key].name}
              </span>
            </button>

            {open.has(key) && (
              <div className="w-40 p-3 bg-white border rounded-lg shadow text-sm text-center text-gray-700">
                {BRAND_INFO[key].desc}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
