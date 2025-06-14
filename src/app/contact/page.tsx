"use client";

import { Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

import BookingForm from "@/components/BookingForm";

export default function ContactPage() {
  const { t } = useTranslation("contact");

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-12">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">{t("heading")}</h1>
        <p className="text-gray-700">{t("subtitle")}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="flex items-center gap-4 rounded-xl bg-white p-6 shadow">
          <Phone className="h-8 w-8 text-cyan-600" />
          <div>
            <p className="font-semibold">{t("phone")}</p>
            <a
              href="tel:+3545551234"
              className="text-cyan-700 hover:underline"
            >
              555-1234
            </a>
          </div>
        </article>

        <article className="flex items-center gap-4 rounded-xl bg-white p-6 shadow">
          <Mail className="h-8 w-8 text-cyan-600" />
          <div>
            <p className="font-semibold">{t("email")}</p>
            <a
              href="mailto:sales@heist.is"
              className="text-cyan-700 hover:underline"
            >
              sales@heist.is
            </a>
          </div>
        </article>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">{t("book")}</h2>
        <BookingForm />
      </section>
    </main>
  );
}
