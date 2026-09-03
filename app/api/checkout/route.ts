import { NextResponse } from "next/server";
import { paymentProviders } from "@/lib/payments";
import { getProductBySlug } from "@/lib/data/products";
import { generateOrderNumber } from "@/lib/order-tracking";
import { saveOrder, claimIdempotencyKey } from "@/lib/data/orders-store";
import type { Order, OrderLineItem } from "@/types/order";
import type { PaymentProvider } from "@/lib/payments/provider";

interface CheckoutBody {
  idempotencyKey: string;
  items: OrderLineItem[];
  shippingAddress: Order["shippingAddress"];
  paymentMethod: PaymentProvider["id"];
  couponDiscountRs?: number;
}

// Phase 5. Every branch here maps to a named case in security.md.
export async function POST(req: Request) {
  const body: CheckoutBody = await req.json();

  // 1. Idempotency — a double-click can never create two orders.
  if (!claimIdempotencyKey(body.idempotencyKey)) {
    return NextResponse.json(
      { error: "duplicate_submission", message: "This order is already being processed." },
      { status: 409 }
    );
  }

  // 2. Stock re-check at checkout, not just at add-to-cart.
  const outOfStock: OrderLineItem[] = [];
  for (const item of body.items) {
    const product = getProductBySlug(item.slug);
    const variant = product?.variants.find((v) => v.color === item.color);
    const sizeEntry = variant?.sizes.find((s) => s.size === item.size);
    if (!product || !variant || !sizeEntry || sizeEntry.stockCount < item.quantity) {
      outOfStock.push(item);
    }
  }
  if (outOfStock.length > 0) {
    return NextResponse.json(
      { error: "out_of_stock", items: outOfStock },
      { status: 409 }
    );
  }

  // 3. Compute totals server-side (never trust client-sent totals).
  const subtotalRs = body.items.reduce((sum, i) => sum + i.priceRs * i.quantity, 0);
  const discountRs = body.couponDiscountRs ?? 0;
  const totalRs = Math.max(0, subtotalRs - discountRs);

  // 4. Dispatch to the chosen provider via the shared interface — no
  //    per-provider branching here (structure.md).
  const provider = paymentProviders[body.paymentMethod];
  const orderId = crypto.randomUUID();
  const paymentResult = await provider.initiatePayment(orderId, totalRs);

  if (!paymentResult.success) {
    // Payment fails: don't clear cart (client keeps its own state), name the
    // step that failed, let them retry or switch method (security.md).
    return NextResponse.json(
      { error: "payment_failed", step: body.paymentMethod, message: paymentResult.error },
      { status: 402 }
    );
  }

  // 5. Order number must exist before anything is called "confirmed."
  const orderNumber = generateOrderNumber();
  if (!orderNumber) {
    return NextResponse.json(
      {
        error: "order_number_failed",
        message: "Your payment succeeded and our team will confirm your order shortly.",
      },
      { status: 500 }
    );
  }

  const order: Order = {
    id: orderId,
    orderNumber,
    userId: null, // guest checkout supported; wire real auth user id once Phase 7 auth lands
    items: body.items,
    subtotalRs,
    discountRs,
    totalRs,
    paymentMethod: body.paymentMethod,
    paymentReference: paymentResult.reference,
    status: "placed",
    shippingAddress: body.shippingAddress,
    createdAt: new Date().toISOString(),
  };

  saveOrder(order);

  return NextResponse.json({
    order,
    displayInstructions: paymentResult.displayInstructions,
  });
}
