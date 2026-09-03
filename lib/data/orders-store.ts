import type { Order } from "@/types/order";

// TEMPORARY in-memory store. This is NOT the real data layer — it exists so
// checkout/order-tracking logic and API contracts can be built and tested
// end-to-end before the Supabase `orders` table (phases.md Phase 1) is
// actually migrated and connected. Swap this file's internals for real
// Supabase queries; every route that imports it keeps the same function
// signatures, so nothing else changes.
//
// Known limitation (state this honestly, don't hide it): this resets on
// every server restart/redeploy and isn't shared across serverless
// instances. Do not use this in production — connect Supabase first.

const orders = new Map<string, Order>();
const idempotencyKeys = new Set<string>();

export function saveOrder(order: Order) {
  orders.set(order.id, order);
}

export function getOrder(id: string): Order | undefined {
  return orders.get(id);
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  const order = orders.get(id);
  if (order) orders.set(id, { ...order, status });
}

// Server-side idempotency check per security.md — a double-click on
// "Place Order" can never create two orders.
export function claimIdempotencyKey(key: string): boolean {
  if (idempotencyKeys.has(key)) return false;
  idempotencyKeys.add(key);
  return true;
}
