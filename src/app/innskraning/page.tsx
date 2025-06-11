"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContexts";

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "done">("idle");

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setPhase("sending");
    await new Promise((r) => setTimeout(r, 1200));

    login(email);
    setPhase("done");

    setTimeout(() => router.push("/profile"), 1200);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center
                    bg-gradient-to-br from-cyan-50 to-indigo-50 p-6"
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md px-10 py-12 bg-white/80 backdrop-blur
                   rounded-3xl shadow-lg overflow-hidden"
      >
        <span
          className="pointer-events-none absolute -top-20 -left-20 w-72 h-72
                         bg-cyan-300/20 animate-blob rounded-full"
        />
        <span
          className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72
                         bg-indigo-300/20 animate-blob animation-delay-2000 rounded-full"
        />

        <h1 className="relative z-10 text-3xl font-semibold text-center mb-8">
          {phase === "done" ? t("checkInbox") : t("login")}
        </h1>

        <div className="relative z-10 space-y-6">
          {phase !== "done" && (
            <>
              <label className="block">
                <span className="sr-only">{t("Email")}</span>
                <div
                  className="flex items-center gap-3 border rounded-lg px-4 py-3
                                focus-within:ring-2 focus-within:ring-cyan-600"
                >
                  <Mail className="w-5 h-5 opacity-50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("Email")}
                    className="flex-1 outline-none placeholder-gray-400 bg-transparent"
                    required
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={!isValid || phase === "sending"}
                className="w-full flex items-center justify-center gap-2
                           bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50
                           text-white font-medium py-3 rounded-lg transition"
              >
                {phase === "sending" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("continue")}
                  </>
                ) : (
                  t("continue")
                )}
              </button>
            </>
          )}

          {phase === "done" && (
            <div className="flex flex-col items-center text-cyan-700 gap-4">
              <CheckCircle className="w-16 h-16 animate-in fade-in zoom-in" />
              <p className="text-center">{t("checkInbox")}</p>
            </div>
          )}
        </div>
      </form>

      <p className="mt-10 text-xs text-gray-500">
        Made with&nbsp;<span className="animate-pulse">❤️</span>&nbsp;by Heist
      </p>
    </div>
  );
}
