# Valore

Premium e-commerce site for a Pakistani apparel brand. Next.js App Router + Tailwind + Framer Motion + Zustand.

## Setup

```bash
npm install
cp .env.local.example .env.local   # fill in Supabase keys
npm run dev
```

Deploy: push to GitHub, import into Vercel, add the same env vars in
Vercel's dashboard (Project Settings → Environment Variables).

## What's real vs. stubbed right now

**Fully working:**
- All pages and navigation (landing, catalog, product, cart, checkout, deals, account, login)
- Cart (add/remove/update, persists across reload via localStorage)
- Checkout flow: stock re-check, idempotent order creation, coupon validation, every failure case from `security.md` (payment fail, server unreachable, out-of-stock, duplicate submit, invalid coupon)
- Cash on Delivery payment (needs no external account)
- EasyPaisa / Bank Transfer — shown to the customer as **manual verification**: they see your EasyPaisa number (0312-7563557, Muhammad Hamid) or bank details and pay manually; the order sits as "placed" until you confirm it by hand. This is honest, not automated — there's no EasyPaisa/bank merchant API wired in.
- Motion system: springs (not CSS transitions) for buttons, cart drawer, drag gestures, per `design.md`'s Apple fluid-interface spec
- Design tokens: dark/warm palette, film grain, glassmorphism, per-variant glow color

**Stubbed / needs your input before going live:**
- **Supabase**: no project connected yet. Orders currently live in an in-memory store (`lib/data/orders-store.ts`) that resets on server restart — fine for demoing the flow, not for real orders. Create a Supabase project, add the schema from `phases.md` Phase 1, and swap that file for real queries.
- **JazzCash / Card payments**: no merchant accounts — checkout clearly tells the customer these aren't available yet rather than pretending to process them.
- **3D**: no `.glb` models or Three.js pipeline. `components/three/*` are working placeholders (real glow/motion/layout, static image or box instead of a rotating garment) — wired so a real `@react-three/fiber` scene can drop in later without touching surrounding code.
- **Auth**: Supabase Auth calls are wired in `AuthModal.tsx` but need a live Supabase project to actually authenticate.
- **Product images**: point at `/placeholders/*.jpg` paths that don't exist yet — add real photos there or swap the URLs in `lib/data/products.ts`.

## Structure

See `structure.md` for the intended layout — the actual repo matches it.
