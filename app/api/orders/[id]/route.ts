import { NextResponse } from "next/server";
import { getOrder } from "@/lib/data/orders-store";

// Phase 6. "Order not found" is a defined case, not a generic error (security.md).
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const order = getOrder(params.id);
  if (!order) {
    return NextResponse.json(
      { error: "not_found", message: "We couldn't find an order with that number." },
      { status: 404 }
    );
  }
  return NextResponse.json({ order });
}
