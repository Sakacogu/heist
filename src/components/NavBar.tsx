"use client";

import { Menu, X, Search, ShoppingCart, User2 } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useCart } from "@/app/cart/cart-provider";
import { useAuth } from "@/lib/AuthContext";
import i18next from "@/lib/i18n";

const navLinks = [
  { href: "/packages", i18n: "packages" },
  { href: "/setup", i18n: "setup" },
  { href: "/products", i18n: "products" },
  { href: "/contact", i18n: "contact" },
] as const;

const MobileSearchSheet = dynamic(() => import("./SearchSheet"), {
  ssr: false,
});

export default function NavBar() {
  const { items } = useCart();
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  // cart badge
  const totalQty = items.reduce((s, r) => s + r.qty, 0);

  const toggleLanguage = () =>
    i18next.changeLanguage(i18next.language === "is" ? "en" : "is");

  // profile route depends on auth
  const profileHref = user ? "/profile" : "/login";

  // helper so every mobile-link also closes the drawer
  const NavItem = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      onClick={() => setOpenMenu(false)}
      className="
        block px-3 py-2 rounded-lg text-gray-900 hover:bg-cyan-100
        md:inline-block md:font-medium
      "
    >
      {label}
    </Link>
  );

  return (
    <header className="fixed top-0 inset-x-0 h-22 bg-gray-50 shadow-sm z-50">
      <div className="mx-auto max-w-7xl h-full px-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-cyan-600"
        >
          <span className="text-5xl">💡</span>
          <span className="text-4xl">HEIST</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-xl">
          {navLinks.map((l) => (
            <NavItem key={l.href} href={l.href} label={t(l.i18n)} />
          ))}
        </nav>

        <div className="flex items-center gap-4 text-gray-900">
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 text-sm rounded-full hover:bg-cyan-200"
          >
            {i18next.language === "is" ? "EN" : "IS"}
          </button>

          <button
            className="p-2 rounded-lg hover:bg-gray-200"
            onClick={() => setOpenSearch(true)}
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            href={profileHref}
            title={user ? user.email : t("login")}
            className="p-2 rounded-lg hover:bg-cyan-200"
          >
            <User2 className="w-5 h-5" />
          </Link>

          <Link
            href="/cart"
            className="relative rounded-lg p-2 hover:bg-cyan-200"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalQty > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center 
                           justify-center rounded-full bg-cyan-600 text-xs text-white"
              >
                {totalQty}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpenMenu(true)}
            className="rounded-lg p-2 hover:bg-gray-200 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {openMenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpenMenu(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <aside
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg
                       animate-slide-in-right"
          >
            <div className="flex items-center justify-between px-4 py-4 text-gray-900">
              <Link
                href="/"
                onClick={() => setOpenMenu(false)}
                className="text-lg font-semibold text-cyan-600 flex items-center gap-1"
              >
                <span className="text-2xl">💡</span> HEIST
              </Link>

              <button
                onClick={() => setOpenMenu(false)}
                aria-label="Close menu"
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col border-t py-4 text-gray-900">
              {navLinks.map((link) => (
                <NavItem
                  key={link.href}
                  href={link.href}
                  label={t(link.i18n)}
                />
              ))}
            </nav>
          </aside>
        </div>
      )}

      {openSearch && <MobileSearchSheet onClose={() => setOpenSearch(false)} />}
    </header>
  );
}
