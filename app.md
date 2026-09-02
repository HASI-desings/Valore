# Valore — App Overview

## What This Is
Valore is a premium, interactive e-commerce website for a clothing brand. It sells
aspirational, high-quality clothing (hoodies, tees, casualwear, sportswear, suits,
womenswear) at a price accessible to the Pakistani middle class, with plans to expand
internationally later. The brand feels premium the moment someone lands on the site —
not through price, but through craft: 3D visuals, motion, and a dark/neutral tactile
aesthetic with film-grain texture.

## Who It's For
- Primary: Pakistani youth/young adults who want to look and feel premium without
  paying international-brand prices.
- Payment behavior: comfortable with Cash on Delivery, EasyPaisa/JazzCash, bank
  transfer — not just cards.
- Device reality: many will be on mid/low-end phones, so the "wow" 3D experience must
  degrade gracefully without feeling broken or cheap.

## The Core Experience (in order)
1. **Landing** — 3D hero, model wearing a garment, camera locked, garment morphs as
   user scrolls. This is the hook.
2. **Catalog** — grid of all designs. Hover or tap a design and the 3D mannequin
   instantly swaps to wear it, with a reactive background (color/light shifts to match
   the garment). Browsing should feel alive, not like a spreadsheet of photos.
3. **Product Detail** — 360° view, fabric zoom, size guide with fit-confidence, live
   color/size selection that updates the 3D model in real time.
4. **Add to Cart / Buy Now** — signature animation: garment folds into a gift box, box
   flies to the cart icon, cart bounces. This is a moment, not just a state change.
5. **Cart & Checkout** — persistent drawer, shipping details, payment method choice
   (Card / EasyPaisa / JazzCash / Bank Transfer / COD), optional coupon code, order
   confirmation with a trackable order number.
6. **Deals & Combos** — a separate page for bundles (e.g. 2 tees + 1 hoodie) using the
   same reactive preview pattern as the catalog.
7. **Account** — order history with tracking, saved addresses, "Valore Vault"
   (gift cards / future loyalty tiers — never called "coupons" here).
8. **Auth** — signup/login feels like an invitation, not a form. Reward on signup is
   an emotional "Welcome to the Family" moment, not a discount code.

## What Makes It "Valore" and Not a Generic Store
- No stock templates, no default color palettes, no default icon sets.
- Every interaction (hover, add-to-cart, checkout) has an intentional animation —
  nothing is instant/flat.
- Color and motion choices are tied to the brand's mood (dark, tactile, restrained) —
  not decoration for its own sake.
- Performance is treated as part of the design, not an afterthought: a stunning 3D
  hero that takes 8 seconds to load is a failure, not a feature.

## Non-Goals (for this build)
- No multi-vendor/marketplace features.
- No AI-generated recommendations engine (future phase, not v1).
- No native mobile app — this is a responsive web app only.

## Source of Truth
The full feature prompt (hero, catalog, product detail, cart animation, checkout,
deals, tracking, dashboard, auth, technical constraints) lives in the final build
prompt at the bottom of this doc set. `structure.md`, `phases.md`, `security.md`,
`rules.md`, and `design.md` all expand on pieces of that prompt — if any of them ever
seem to conflict, this file and the original feature list win.
