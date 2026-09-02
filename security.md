# Valore — Failure & Rejection Handling

Every situation below must have a defined, user-visible behavior. "Fail silently" or
"just show a generic error" is never acceptable — the user should always know what
happened and what to do next.

## Order & Checkout Failures

**Payment fails (card/EasyPaisa/JazzCash/Bank Transfer declined or times out)**
- Do not clear the cart.
- Show a clear message naming the payment step that failed, not a generic error.
- Offer retry with the same method, or switch to a different payment method
  (including COD) without re-entering shipping details.

**Server is down / API unreachable during checkout**
- Detect the failed request (timeout or 5xx) before telling the user "order placed."
- Never show an order confirmation unless the server has actually confirmed the order.
- Show a "we couldn't reach our servers, your order was NOT placed" message with a
  retry button. Cart contents stay intact.

**Item goes out of stock between add-to-cart and checkout**
- Check stock again at checkout, not just at add-to-cart.
- If unavailable: flag that specific item in the cart, let the user remove it or pick
  a different size/color, without losing the rest of the cart.

**Invalid or expired coupon code**
- Inline validation message ("this code has expired" / "code not recognized") —
  never let an invalid code silently apply 0% or block checkout entirely.
- Checkout can proceed without a coupon if the user clears the field.

**Duplicate order submission (user double-clicks "Place Order")**
- Disable the button after first click; show a loading state.
- Server-side idempotency check so a double-click can never create two orders.

**Order number generation fails**
- Order should not be marked "confirmed" to the user until an order number exists.
- If generation fails after payment succeeded, log it for manual resolution and show
  the user a message that their payment succeeded and support will confirm shortly —
  never leave them thinking the order silently vanished.

## Account & Auth Failures

**Login fails (wrong password, account doesn't exist)**
- Clear, specific-enough message without confirming/denying whether an email exists
  (standard security practice — say "invalid email or password," not "no account found").

**Signup with an already-registered email**
- Tell the user the account exists and offer a login link — don't create a duplicate
  or fail silently.

**Session expires mid-checkout**
- Don't lose cart contents. Prompt re-login, then return the user to checkout with
  their cart and entered shipping info intact if possible.

## Data & Sync Failures

**3D model/asset fails to load**
- Never show a blank space or broken-mesh error.
- Fall back to the branded pulsing loader, then to a static product image if the
  asset genuinely fails after retry.

**Low-end device can't handle 3D at all**
- Detected proactively (see `lib/device-tier.ts` in structure.md), not after a crash.
- Automatically serve the video/image-sequence fallback — user should never see a
  frozen or broken 3D canvas.

**Address save fails**
- Don't silently drop the address. Show the error and keep the form filled in so the
  user doesn't retype everything.

## Tracking Failures

**Order tracking code not found / typo**
- Clear "we couldn't find an order with that number" message, suggest checking order
  history if logged in.

**Order status stuck / not updating**
- This is a backend/ops issue, not something the UI should hide. Show the last known
  status with a timestamp rather than a spinner that never resolves.

## General Rule for the AI
For any new feature added later that isn't covered above: before marking it "done,"
explicitly write down what happens when it fails (network failure, invalid input,
server error) and add it to this file. A feature without a defined failure behavior
is not considered complete.
