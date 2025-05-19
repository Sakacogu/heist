'use client';

import React from 'react';

export default function VoiceAssistantSection() {
  const assistants = ['Alexa', 'Siri', 'Bixby'];
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-semibold mb-8 ml-35 mr-35 p-3 rounded-full">Hægt að stjórna með gervigreind!</h2>
      <div className="flex justify-center gap-6">
        {assistants.map((a) => (
          <span
            key={a}
            className="px-4 py-2 bg-cyan-100 rounded-full text-xl font-medium shadow"
          >
            {a}
          </span>
        ))}
      </div>
    </section>
  );
}