"use client";

import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import FeaturedCarousel, { FeaturedItem } from "@/components/FeaturedCarousel";
import BrandList from "@/components/BrandList";
import VoiceAssistantSection from "@/components/VoiceAssistant";
import VideoList from "@/components/VideoList";

import goodnight from "@/lotties/goodnight.json";
import energy from "@/lotties/energy.json";
import security from "@/lotties/security.json";
import morning from "@/lotties/morning.json";
import unified from "@/lotties/unified.json";
import savings from "@/lotties/savings.json";

export default function Home() {
  const { t } = useTranslation("home");
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 600], [0, 120]);

  const slides: FeaturedItem[] = [
    {
      id: "goodnight",
      name: "Goodnight",
      lottie: goodnight,
      description: t("goodnightDesc"),
      link: "/products",
    },
    {
      id: "energy",
      name: "Energy Saver",
      lottie: energy,
      description: t("energyDesc"),
      link: "/products",
    },
    {
      id: "security",
      name: "Security",
      lottie: security,
      description: t("securityDesc"),
      link: "/products",
    },
    {
      id: "morning",
      name: "Morning Routine",
      lottie: morning,
      description: t("morningDesc"),
      link: "/products",
    },
    {
      id: "unified",
      name: "One App",
      lottie: unified,
      description: t("unifiedDesc"),
      link: "/products",
    },
    {
      id: "savings",
      name: "Bill Savings",
      lottie: savings,
      description: t("savingsDesc"),
      link: "/products",
    },
  ];

  return (
    <div className="overflow-x-clip bg-surface-50">
      <section className="relative isolate overflow-hidden pb-24">
        <motion.div
          style={{ y: blobY }}
          className="pointer-events-none absolute -top-[28rem] left-1/2 -translate-x-1/2
                     h-[48rem] w-[48rem] rounded-full opacity-30 blur-[180px]
                     bg-gradient-to-tr from-brand via-sky-400 to-indigo-500"
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-32 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900"
          >
            {t("heroTitle")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-lg md:text-2xl text-gray-600"
          >
            {t("heroTag")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10"
          >
            <Link
              href="/products"
              className="inline-flex gap-2 items-center rounded-full bg-brand px-8 py-3
                         text-gray-800 font-medium shadow-lg shadow-brand/40
                         hover:shadow-xl hover:-translate-y-[2px] active:shadow transition"
            >
              🛒 {t("viewProductsBtn")}
            </Link>
          </motion.div>
        </div>
      </section>

      <FeaturedCarousel items={slides} />

      <section
        className="
          mx-auto w-full max-w-7xl px-4
          grid gap-y-24 gap-x-16
          lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
          place-items-center
        "
      >
        <div className="w-full max-w-[36rem]">
          <SectionHeading>{t("mainBrands")}</SectionHeading>
          <BrandList />
        </div>

        <div className="w-full max-w-[36rem]">
          <SectionHeading>{t("videoList")}</SectionHeading>
          <VideoList />
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 mt-24">
        <SectionHeading>{t("voiceAI")}</SectionHeading>
        <VoiceAssistantSection />
      </div>
    </div>
  );
}

function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`my-10 rounded-3xl bg-brand py-4 text-center text-3xl font-semibold text-grey-50 ${className}`}
    >
      {children}
    </h2>
  );
}
