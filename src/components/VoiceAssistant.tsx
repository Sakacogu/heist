"use client";

import Image from "next/image";

interface AssistantBrand {
  id: string;
  label: string;
  logo: string;
  url: string;
}

const ASSISTANT_BRANDS: AssistantBrand[] = [
  {
    id: "alexa",
    label: "Alexa",
    logo: "/assistants/alexa.png",
    url: "https://www.amazon.com/alexa",
  },
  {
    id: "siri",
    label: "Siri",
    logo: "/assistants/siri.png",
    url: "https://www.apple.com/siri/",
  },
  {
    id: "bixby",
    label: "Bixby",
    logo: "/assistants/bixby.png",
    url: "https://www.samsung.com/us/apps/bixby/",
  },
];

export default function VoiceAssistantSection() {
  return (
    <section className="py-6 text-center">
      <div className="flex justify-center gap-10">
        {ASSISTANT_BRANDS.map(({ id, label, logo, url }) => (
          <button
            // open link in new tab & keep semantic focus ring
            key={id}
            onClick={() => window.open(url, "_blank")}
            className="h-[100px] w-[140px] rounded-lg transition hover:shadow-lg focus-visible:outline focus-visible:outline-cyan-600"
            aria-label={label}
          >
            <Image
              src={logo}
              alt={label}
              width={140}
              height={100}
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
