"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotalRs());

  return (
    <div className="px-6 md:px-12 py-12 max-w-2xl mx-auto">
      <h1 className="font-display text-3xl text-valore-bone mb-10">Your Bag</h1>
      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-valore-fog mb-4">Your bag is empty.</p>
          <Link href="/catalog">
            <Button>Browse the Collection</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex justify-between items-center border-b border-valore-surfaceHigh pb-4"
            >
              <div>
                <p className="text-valore-bone text-sm">{item.name}</p>
                <p className="text-valore-fog text-xs">
                  {item.color} · {item.size} · Qty {item.quantity}
                </p>
              </div>
              <p className="text-valore-bone text-sm">Rs. {(item.priceRs * item.quantity).toLocaleString()}</p>
            </div>
          ))}
          <div className="flex justify-between pt-4">
            <span className="text-valore-bone font-display">Subtotal</span>
            <span className="text-valore-bone font-display">Rs. {subtotal.toLocaleString()}</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full mt-4">Checkout</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
