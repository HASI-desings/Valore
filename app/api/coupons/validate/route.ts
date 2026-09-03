import { NextResponse } from "next/server";
import { validateCoupon } from "@/lib/coupons";

// Phase 5. Inline validation states per security.md — never silently apply 0%.
export async function POST(req: Request) {
  const { code } = await req.json();
  if (!code || typeof code !== "string") {
    return NextResponse.json({ valid: false, reason: "not_found" }, { status: 400 });
  }

  const result = validateCoupon(code);
  return NextResponse.json(result);
}
