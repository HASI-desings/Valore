# Valore — What the AI Needs to Build This

## 1. Supabase (Backend)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- A Supabase project (free tier is enough to start)
- Auth providers enabled: Email/Password at minimum

## 2. Payment Providers
- **EasyPaisa**: 0312-7563557, Muhammad Hamid — currently manual/display-only, no merchant API yet
- **JazzCash**: not set up — stubbed
- **Bank Transfer**: displayed to user, not an API integration — fill in `BANK_*` env vars when ready
- **Card**: no gateway chosen yet — stubbed
- **Cash on Delivery**: fully functional, no external requirement

## 3. 3D Assets
- `.glb`/`.gltf` model files for mannequin + garments — not yet provided
- Fallback video/image sequence per garment for low-end devices — not yet provided

## 4. Domain & Hosting
- Vercel for hosting (free tier fine for early phases)
- Env vars set in Vercel dashboard, never committed to git

## 5. Environment File
See `.env.local.example` in the repo root.

## What's Deferred (per the user)
- Real payment merchant accounts beyond what's listed above
- Final 3D models
- Domain purchase
