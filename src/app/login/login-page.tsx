"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/lib/AuthContext";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginEmailPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailPattern.test(email)) return;

    login(email);
    router.push("/profile");
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow"
      >
        <h1 className="text-center text-2xl font-semibold">{t("login")}</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("enterEmail")}
          required
          className="w-full rounded border px-4 py-3"
        />

        <button
          type="submit"
          disabled={!emailPattern.test(email)}
          className="w-full rounded-lg bg-cyan-600 py-3 font-medium text-white
                     hover:bg-cyan-700 disabled:opacity-50"
        >
          {t("continue")}
        </button>
      </form>
    </main>
  );
}
