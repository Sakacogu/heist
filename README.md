# 💡 Heist — Smart-Home Commerce & Control

Modern full-stack demo that combines:

| Layer | Tech |
| :--- | :--- |
| Front-end | **Next .js 15 (App Router)** · **TypeScript** · **Tailwind CSS** |
| State / Auth | React Context (client) · Edge cookies (server cart) |
| Content & CMS | **Sanity v3** Studio + GROQ queries |
| Payments | Stripe Elements (test-mode stub) |
| Search | Fuse.js in-browser fuzzy search |
| Deployment | Vercel compatible (Edge runtime for API routes) |

The result: a bilingual (🇮🇸/🇬🇧) e-commerce experience for smart-home devices, complete with product bundles, discounts, bookings, and a lightweight profile dashboard.

---

## ✨ Features

- **Product catalogue** sourced from Sanity
- Bundle-aware **tiered discounts** and free-gift threshold
- **Edge cart API** (`src/app/api/cart`) – cookie-based, zero DB
- **Profile dashboard** with order history & meeting bookings
- **Locale switcher** powered by `react-i18next`
- **Mobile-first UI**: responsive navbar + off-canvas menu
- ESLint (flat-config) + Prettier + `clean.sh` script for one-shot lint → format → type-check
- **CI-friendly** (`npm run clean` fails on any lint/TS error)

---

## 🗂 Project structure

src/
│
├── app/ # Next.js app router
│ ├── api/ # Edge functions (cart, book, products)
│ ├── cart/ # Cart provider & page
│ ├── products/ # Product list & detail routes
│ ├── packages/ # Bundle builder
│ ├── profile/ # Dashboard (client component)
│ ├── studio/ # Embedded Sanity Studio v3
│ └── … # login, setup, contact …
│
├── components/ # Presentational React components
├── lib/ # Client-only libs (AuthContext, i18n, sanityClient)
├── sanity/ # Studio config, schemas & helper libs
└── utils/ # Pure utility helpers

---

## 🚀 Quick start

```bash
# 1. Clone & install
git clone https://github.com/YOUR-GH-USER/heist.git
cd heist
npm install

# 2. Environment
cp .env.example .env.local
# → Fill in:
#   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
#   SANITY_PROJECT_ID, SANITY_DATASET, SANITY_READ_TOKEN (optional)

# 3. Sanity Studio (runs on port 3333)
npm run studio   # = sanity dev

# 4. Next.js dev (port 3000)
npm run dev

---

🧪 Quality scripts

Command	What it does
npm run clean	Type-check → ESLint (auto-fix) → Prettier → ts-prune → audit
npm run lint	ESLint only
npm run build	Production build (next build)
npm run studio	Launch Sanity Studio v3 locally

---

🔒 Security & audits
npm audit fix --force is not used in CI to avoid unwanted major bumps.

If you accidentally ran it, simply git restore package*.json && rm -rf node_modules && npm install (see “Undoing audit fix” in the wiki).

---

🤝 Contributing
Fork, clone, create a branch.

Follow the ESLint/Prettier rules (npm run clean before pushing).

Submit a PR; the repo runs lint + type-check in GitHub Actions.