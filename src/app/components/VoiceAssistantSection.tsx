'use client';

import React from 'react';

export default function VoiceAssistantSection() {
  const assistants = ['Alexa', 'Siri', 'Bixby'];
  return (
    <section className="py-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Hægt að stjórna með gervigreind</h2>
      <div className="flex justify-center gap-6">
        {assistants.map((a) => (
          <span
            key={a}
            className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium shadow"
          >
            {a}
          </span>
        ))}
      </div>
    </section>
  );
}