"use client";

import { Mail, Phone, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        {/* brand blurb */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Heist</h3>
          <p className="text-sm leading-relaxed">
            Smarthome lausnir sem virka saman — lýsing, hitastýring, öryggi og
            Wi-Fi, allt í einni appi.
          </p>
        </div>

        {/* quick links */}
        <div>
          <h4 className="font-medium text-white mb-3">Flýtileiðir</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/products", label: "Vörur" },
              { href: "/packages", label: "Pakkar" },
              { href: "/setup", label: "Uppsetning" },
              { href: "/contact", label: "Hafa samband" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contacts */}
        <div>
          <h4 className="font-medium text-white mb-3">Tengiliðir</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:sales@heist.is" className="hover:underline">
                sales@heist.is
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+3545551234" className="hover:underline">
                +354&nbsp;555&nbsp;1234
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Facebook className="w-4 h-4" />
              <a
                href="https://facebook.com/heist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                facebook.com/heist
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <a
                href="https://linkedin.com/company/heist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} Heist ehf. Öll réttindi áskilin.
      </div>
    </footer>
  );
}
