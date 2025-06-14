"use client";

import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/lib/AuthContext";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MagicLinkLoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!emailPattern.test(email)) return;

    setPhase("sending");
    await new Promise((r) => setTimeout(r, 1200)); // sim API
    login(email);
    setPhase("done");
    setTimeout(() => router.push("/profile"), 1200);
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center
                 bg-gradient-to-br from-cyan-50 to-indigo-50 p-6"
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md overflow-hidden rounded-3xl
                   bg-white/80 px-10 py-12 shadow-lg backdrop-blur"
      >
        {/* decorative blobs */}
        <span className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 animate-blob rounded-full bg-cyan-300/20" />
        <span className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 animate-blob rounded-full bg-indigo-300/20 animation-delay-2000" />

        <h1 className="relative z-10 mb-8 text-center text-3xl font-semibold">
          {phase === "done" ? t("checkInbox") : t("login")}
        </h1>

        <div className="relative z-10 space-y-6">
          {phase !== "done" && (
            <>
              <label className="block">
                <span className="sr-only">{t("Email")}</span>
                <div className="flex items-center gap-3 rounded-lg border px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-600">
                  <Mail className="h-5 w-5 opacity-50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("Email")}
                    className="flex-1 bg-transparent outline-none placeholder-gray-400"
                    required
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={!emailPattern.test(email) || phase === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-lg
                           bg-cyan-600 py-3 font-medium text-white transition
                           hover:bg-cyan-700 disabled:opacity-50"
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
        Made with <span className="animate-pulse">❤️</span> by Heist
      </p>
    </main>
  );
}
