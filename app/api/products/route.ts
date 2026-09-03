import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data/products";

// Phase 1: read-only. Swap PRODUCTS for a Supabase query once the schema is
// migrated — response shape stays identical so no caller needs to change.
export async function GET() {
  return NextResponse.json({ products: PRODUCTS });
}
