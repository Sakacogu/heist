// src/components/VoiceAssistantSection.tsx
'use client';

import Image from 'next/image';

type Assistant = {
  id: string;
  label: string;
  src: string;
};

const assistants: Assistant[] = [
  { id: 'alexa', label: 'Alexa', src: '/assistants/alexa.png' },
  { id: 'siri',  label: 'Siri',  src: '/assistants/siri.png'  },
  { id: 'bixby', label: 'Bixby', src: '/assistants/bixby.png' },
];

export default function VoiceAssistantSection() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-semibold mb-8">
        Hægt að stjórna með gervigreind!
      </h2>

      <div className="flex justify-center gap-10">
        {assistants.map((a) => (
          <div
            key={a.id}
            className="h-[100] w-[140] flex items-center justify-center hover:shadow-lg transition"
          >
            <Image
              src={a.src}
              alt={a.label}
              width={140}
              height={100}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
