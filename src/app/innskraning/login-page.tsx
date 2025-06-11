"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContexts";
import { useRouter } from "next/navigation";

export default function LoginPageClient() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) return;

    login(email);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow max-w-md w-full space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center">{t("login")}</h1>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("enterEmail")}
          className="w-full border rounded px-4 py-3"
        />

        <button
          type="submit"
          disabled={!isValidEmail}
          className="w-full bg-cyan-600 text-white py-3 rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50"
        >
          {t("continue")}
        </button>
      </form>
    </div>
  );
}
