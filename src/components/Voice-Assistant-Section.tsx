"use client";

import Image from "next/image";

type Assistant = {
  id: string;
  label: string;
  src: string;
  url: string;
};

const assistants: Assistant[] = [
  {
    id: "alexa",
    label: "Alexa",
    src: "/assistants/alexa.png",
    url: "https://www.amazon.com/alexa",
  },
  {
    id: "siri",
    label: "Siri",
    src: "/assistants/siri.png",
    url: "https://www.apple.com/siri/",
  },
  {
    id: "bixby",
    label: "Bixby",
    src: "/assistants/bixby.png",
    url: "https://www.samsung.com/us/apps/bixby/",
  },
];

export default function VoiceAssistantSection() {
  return (
    <section className="py-6 text-center">
      <div className="flex justify-center gap-10">
        {assistants.map((a) => (
          <div
            key={a.id}
            className="h-[100] w-[140] flex items-center justify-center hover:shadow-lg transition"
          >
            <Image
              src={a.src}
              alt={a.label}
              onClick={() => window.open(a.url, "_blank")}
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
