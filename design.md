# Valore — Design Guide (Plain Language)

This explains what the site should feel and look like, in simple terms, so the build
matches the vision exactly.

## The Overall Feeling
Expensive, quiet, and alive. Not loud or flashy — more like walking into a dim,
well-designed boutique than a bright mall store. Every screen should feel like it was
touched by a person with taste, not generated from a template.

## Colors
- Base: dark, neutral tones — think charcoal, deep black, warm greys. Not pure flat
  black (#000) — give it depth, like fabric or concrete, not a screen.
- Accent color(s): should come from the brand's mood, not a default purple/blue.
  Pick one accent that feels premium and warm (candidates: a deep amber/gold, a muted
  bronze, or a rich off-white) and use it sparingly — for glowing buttons, highlights,
  and the ambient lighting shift on signup.
- Never use a default Tailwind/shadcn palette straight out of the box. If a color
  choice needs to be made and isn't specified here, pick something that fits "dark,
  tactile, restrained, a little warm" — not neon, not pastel, not corporate blue.

## Texture & Surface
- Subtle film-grain overlay across the site — barely visible, but it should make flat
  digital surfaces feel slightly tactile, like paper or fabric grain, not a sterile
  screen.
- Avoid pure flat colors with no texture anywhere large (backgrounds, cards).

## Typography
- Kinetic — text should move with intention (fade/slide/scale in as it appears),
  never just "pop" into place with no motion.
- Headlines: bold, confident, a little tight in spacing — should feel snappy to read,
  not soft or rounded.
- Body text: quiet and legible — it should get out of the way of the visuals.

## Motion Philosophy
- Nothing should feel instant or robotic. Every state change (hover, add to cart,
  page transition, signup success) has a small, deliberate animation.
- Motion should use spring/easing curves that feel weighted and physical — not linear,
  not bouncy-cartoonish. Think "expensive product photography," not "kids app."
- Background reactions (catalog hover, product previews) should shift slowly and
  smoothly — never jarring or sudden, even though they're reacting instantly to input.

## The 3D Model
- Should look like a real mannequin/figure, not a cartoon or low-poly placeholder.
- Lighting on the model should feel soft and directional — like a studio photoshoot,
  not flat/ambient lighting with no shadows.
- When garments swap (scroll on hero, hover on catalog), the transition should feel
  like the garment is being placed/worn, not just texture-swapped instantly.

## Signature Moments (must feel special, not functional)
- **Signup success:** warm light shift across the UI + "Welcome to the Family" text
  animation + a small celebratory movement from the 3D model. This should feel like a
  reward, not a confirmation toast.
- **Add to cart:** the garment folds into a gift box and flies to the cart icon. This
  is the single most important small animation in the site — it should feel
  satisfying every single time, not just the first time.
- **Cart drawer opening:** items "drive in" like they're arriving, not just appearing.

## What "Cheap" Looks Like (avoid at all costs)
- Default color palettes straight from a UI library
- Generic icon sets that look the same as every other site
- Static state changes with no animation (a button that just changes color instantly)
- A 3D hero that takes visibly long to load with no branded loading state
- Layouts that feel like they were assembled from a component library without any
  custom arrangement

## Buttons, Transitions & Gesture Motion (Apple fluid-interface model)
Applies to every interactive element — buttons, cart drawer, sheets, hover states,
drag interactions. Reference: Apple's "Designing Fluid Interfaces" model, adapted for
Framer Motion.

- **Respond on press, not release.** Every button/tappable element gives instant
  visual feedback the moment it's pressed (e.g. `scale(0.97)` in ~100ms) — never wait
  for click/touch-up to show something happened.
- **Use springs, not fixed-duration CSS transitions, for anything touchable or
  draggable** (cart drawer, sheets, product image drag, add-to-cart flight path).
  Springs can be grabbed and reversed mid-motion; CSS keyframes can't.
- **Default spring = critically damped:** `damping 1.0`, `response 0.3–0.4s`. Use this
  for most UI — menus, fades, standard state changes. No bounce, graceful settle.
- **Momentum spring = slight bounce, only when the gesture carried momentum:**
  `damping ~0.8`, `response 0.3–0.4s`. Use this for the add-to-cart box flight, a
  flicked/dragged drawer, or the cart icon's landing bounce — never for a static menu
  fade-in.
- **Never lock out input mid-transition.** If the user taps the cart while the
  add-to-cart animation is still flying, or grabs the drawer while it's closing, the
  interface must respond immediately — animate from the current on-screen position,
  not the target.
- **Drag interactions (cart drawer swipe-to-close, product image drag) must track
  1:1 with the pointer** the entire gesture, not just animate at the end.
- **Boundaries rubber-band, never hard-stop** — e.g. over-scrolling the catalog or
  dragging a sheet past its limit should resist progressively, not snap dead.
- **Translucent surfaces** (nav bar over the 3D hero, cart drawer background) use a
  blurred/frosted material (`backdrop-filter: blur`) with a subtle bright top edge,
  not a flat semi-transparent color.
- **Typography motion:** large headline text uses tight leading and slightly negative
  letter-spacing as it scales up; body text stays near default spacing. Kinetic
  entrance animations (fade/slide) should respect this — don't animate letter-spacing
  independently of size.
- **Reduced motion:** every spring/slide/parallax above has a defined fallback —
  short opacity cross-fade, no overshoot, no elastic. This is not optional per
  element; it's required per element.

## Creative-Director Addendum (variant-reactive glow system)
- Ambient glow behind the hero/catalog asset retints per active product variant —
  not a static accent, a lighting system (radial gradient + blurred glow blob).
- Layout stays spatial/borderless where possible — hairline dividers over hard cards,
  asymmetric grids over rigid symmetric ones.
- Display headline type sits in z-space near/behind the hero asset, not beside it,
  where layout allows.
- Feature callouts (when added): thin animated pointer lines to 3–5 word taglines,
  never paragraphs. Below tablet width, convert to a stacked accordion.
- Loading state for the 3D asset: branded shimmer/pulse, never a blank canvas
  (ties directly to `security.md`'s 3D-load-failure rule).

## When Unsure
If a new UI element needs a design decision not covered here, default to: dark,
tactile, warm-accented, motion-first, and quiet — then briefly state the choice made
so it can be corrected if wrong. Never default to a library's out-of-the-box look.
