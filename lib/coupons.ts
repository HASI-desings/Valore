// Real coupon storage belongs in Supabase (Phase 1 schema). Until that table
// is wired up this is an in-memory stub with the SAME validation contract the
// real API route will use, so swapping the data source later doesn't change
// call sites. Never let an invalid code silently apply 0% (security.md).

interface Coupon {
  code: string;
  percentOff: number;
  expiresAt: string; // ISO date
}

const STUB_COUPONS: Coupon[] = [
  { code: "WELCOME10", percentOff: 10, expiresAt: "2099-01-01" },
];

export type CouponValidationResult =
  | { valid: true; percentOff: number }
  | { valid: false; reason: "not_found" | "expired" };

export function validateCoupon(code: string): CouponValidationResult {
  const found = STUB_COUPONS.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
  if (!found) return { valid: false, reason: "not_found" };
  if (new Date(found.expiresAt) < new Date()) return { valid: false, reason: "expired" };
  return { valid: true, percentOff: found.percentOff };
}
