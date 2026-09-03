export type OrderStatus = "placed" | "confirmed" | "shipped" | "delivered";

export const ORDER_STEPS: { key: OrderStatus; label: string }[] = [
  { key: "placed", label: "Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export function stepIndex(status: OrderStatus): number {
  return ORDER_STEPS.findIndex((s) => s.key === status);
}

// Generates a human-shareable tracking code. Real persistence happens in the
// orders table (Phase 1) — this is the pure formatting/generation logic.
export function generateOrderNumber(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  const date = new Date();
  const y = date.getFullYear().toString().slice(2);
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  return `VLR-${y}${m}-${rand}`;
}
