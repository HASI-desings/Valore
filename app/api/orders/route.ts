import { NextResponse } from "next/server";

// Order creation happens inside /api/checkout (payment + order must be
// created atomically per security.md). This route is reserved for a future
// admin-only "manual order" path — intentionally not implemented yet rather
// than faking it.
export async function POST() {
  return NextResponse.json(
    { error: "not_implemented", message: "Create orders via /api/checkout." },
    { status: 501 }
  );
}
