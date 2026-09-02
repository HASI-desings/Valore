# Valore — Project Structure

Flat where possible, grouped by feature where it reduces confusion. Next.js App Router.

```
valore/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Landing — 3D hero scroll
│   ├── globals.css
│   │
│   ├── catalog/
│   │   └── page.tsx                # Grid + hover-reactive 3D preview
│   │
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx            # Product detail, 360°, sizing, add-to-cart
│   │
│   ├── deals/
│   │   └── page.tsx                # Bundles/combos page
│   │
│   ├── cart/
│   │   └── page.tsx                # Full cart view (drawer is a component, this is fallback page)
│   │
│   ├── checkout/
│   │   ├── page.tsx                # Shipping + payment + coupon
│   │   └── confirmation/
│   │       └── page.tsx            # Order number + tracking code
│   │
│   ├── account/
│   │   ├── page.tsx                # Dashboard home
│   │   ├── orders/
│   │   │   └── page.tsx            # Order history + tracking stepper
│   │   ├── addresses/
│   │   │   └── page.tsx
│   │   └── vault/
│   │       └── page.tsx            # Gift cards / loyalty
│   │
│   ├── login/
│   │   └── page.tsx                # Invitation-style auth modal route
│   │
│   └── api/
│       ├── orders/
│       │   ├── route.ts            # create order
│       │   └── [id]/route.ts       # get order status
│       ├── checkout/
│       │   └── route.ts            # process payment intent
│       ├── coupons/
│       │   └── validate/route.ts
│       └── auth/
│           └── [...auth]/route.ts
│
├── components/
│   ├── three/
│   │   ├── HeroModel.tsx           # locked-camera scroll model
│   │   ├── CatalogMannequin.tsx    # hover-reactive model
│   │   ├── ProductViewer360.tsx
│   │   └── ReactiveBackground.tsx  # particle/gradient-mesh per hover
│   │
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartIcon.tsx            # bounce animation on add
│   │   └── AddToCartAnimation.tsx  # box-fold-and-fly sequence
│   │
│   ├── checkout/
│   │   ├── ShippingForm.tsx
│   │   ├── PaymentMethodSelect.tsx
│   │   └── CouponInput.tsx
│   │
│   ├── product/
│   │   ├── SizeSelector.tsx
│   │   ├── ColorSelector.tsx
│   │   └── FitConfidenceSizer.tsx
│   │
│   ├── auth/
│   │   ├── AuthModal.tsx
│   │   └── WelcomeAnimation.tsx
│   │
│   ├── loaders/
│   │   └── BrandedLoader.tsx       # pulsing suspense fallback
│   │
│   └── ui/
│       ├── Nav.tsx
│       ├── Button.tsx
│       └── OrderTrackerStepper.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── cart-store.ts               # cart state (zustand or similar)
│   ├── payments/
│   │   ├── easypaisa.ts
│   │   ├── jazzcash.ts
│   │   ├── bank-transfer.ts
│   │   └── cod.ts
│   ├── coupons.ts
│   ├── order-tracking.ts
│   └── device-tier.ts              # detects low-end device → triggers degraded 3D
│
├── models/                         # .glb/.gltf assets, lazy-loaded
│   └── garments/
│
├── types/
│   ├── product.ts
│   ├── order.ts
│   └── user.ts
│
├── public/
│   ├── fallback-video/             # degraded hero for low-end devices
│   └── textures/
│
├── app.md
├── structure.md
├── phases.md
├── security.md
├── rules.md
├── design.md
└── package.json
```

## Notes for the AI building this
- Keep `components/three/` isolated from business logic — 3D components should only
  receive props (which garment, which color) and never fetch data themselves.
- `lib/cart-store.ts` is the single source of truth for cart state — no component
  keeps its own copy of cart contents.
- Payment provider files in `lib/payments/` should share one common interface
  (`initiatePayment`, `confirmPayment`, `failPayment`) so checkout logic doesn't
  branch per provider.
