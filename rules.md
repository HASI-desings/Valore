# Valore — Rules for the AI

## Always Do
- Follow `phases.md` order. Never jump ahead to a later phase's feature without saying so.
- Give every new feature a defined failure behavior before considering it done
  (see `security.md`).
- Explain what was built in section-by-section terms, not line-by-line — enough to
  understand the logic, not a code walkthrough.
- Treat every component as equally important — no "I'll polish this later" placeholders
  left silently in delivered code. If something is genuinely deferred, say so explicitly.
- Match the color palette and motion language to `design.md` — never fall back to
  default Tailwind/shadcn colors or default easing curves without saying so.
- Keep 3D components "dumb" (props in, render out) per `structure.md` — no business
  logic or data-fetching inside `components/three/`.
- Respect `prefers-reduced-motion` on every animated component, not just the hero.
- When a request is ambiguous, make the most reasonable assumption, state it briefly,
  and proceed — don't stall on small ambiguities.
- When a request is broken/vague but the intent is clear, fill the gap intelligently
  and say what was filled in.

## Never Do
- Never use generic AI-looking defaults: no default color palettes, no default icon
  packs, no template-looking layouts. If unsure what "on-brand" looks like for a new
  element, check `design.md` first.
- Never mark an order as "confirmed" to the user unless the server has actually
  confirmed it.
- Never use the word "coupon" in the Valore Vault / loyalty UI — that word is reserved
  for the functional checkout discount field only.
- Never let a 3D asset failure show a blank canvas or broken mesh — always fall back
  per `security.md`.
- Never duplicate cart state across components — `lib/cart-store.ts` is the only
  source of truth.
- Never silently drop user-entered data on a failed submit (forms, addresses,
  checkout) — preserve input and show what went wrong.
- Never build a feature from a later phase early, even if it seems like a quick win.
- Never use `<form>` tags in a way that causes a full page reload for in-app flows
  like cart or checkout steps — keep these SPA-smooth.
- Never ship an animation that isn't 60fps-tested or that ignores reduced-motion.

## Decisions to Make Explicit (don't assume silently)
- Whether checkout requires login or allows guest checkout — decide once, document
  the decision here once made, apply consistently.
- Which payment provider integrations are real vs. stubbed/mocked for early phases —
  state this clearly rather than pretending a stub is a working integration.

## Communication Style
- Short by default, detailed only when asked.
- Headers per section for scannability.
- Direct — no filler, no apologizing for capability.

## Decisions Made (per the above)
- **Guest checkout is allowed.** `/checkout` does not require login; `userId` is
  stored as `null` for guest orders. Login is offered but not gated.
- **Payment integrations status:** COD is live/real. EasyPaisa and Bank Transfer are
  manual-verification (display account details, no automated API). JazzCash and Card
  are fully stubbed — checkout tells the user these aren't available yet rather than
  pretending to process them. See `README.md`.
