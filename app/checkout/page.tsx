"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentMethodSelect } from "@/components/checkout/PaymentMethodSelect";
import { CouponInput } from "@/components/checkout/CouponInput";
import { Button } from "@/components/ui/Button";
import type { Address } from "@/types/order";
import type { PaymentProvider } from "@/lib/payments/provider";

const EMPTY_ADDRESS: Address = { fullName: "", phone: "", line1: "", city: "" };

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotalRs());
  const clearCart = useCartStore((s) => s.clear);
  const flagOutOfStock = useCartStore((s) => s.flagOutOfStock);

  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  const [paymentMethod, setPaymentMethod] = useState<PaymentProvider["id"]>("cod");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const discountRs = Math.round(subtotal * (discountPercent / 100));
  const total = subtotal - discountRs;

  async function placeOrder() {
    setErrorMsg(null);
    setPlacing(true); // button disables immediately — no double-submit (security.md)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          items: items.map((i) => ({
            productId: i.productId,
            slug: i.slug,
            name: i.name,
            size: i.size,
            color: i.color,
            priceRs: i.priceRs,
            quantity: i.quantity,
          })),
          shippingAddress: address,
          paymentMethod,
          couponDiscountRs: discountRs,
        }),
      });

      // Server unreachable / 5xx — never show confirmation unless the server
      // actually confirmed (security.md).
      if (!res.ok && res.status >= 500) {
        setErrorMsg("We couldn't reach our servers — your order was NOT placed. Cart is safe, please retry.");
        return;
      }

      const data = await res.json();

      if (res.status === 409 && data.error === "duplicate_submission") {
        setErrorMsg("This order is already being processed.");
        return;
      }

      if (res.status === 409 && data.error === "out_of_stock") {
        for (const item of data.items) {
          flagOutOfStock(item.productId, item.size, item.color);
        }
        setErrorMsg("Some items in your bag went out of stock — please review and remove or change them.");
        return;
      }

      if (res.status === 402 && data.error === "payment_failed") {
        setErrorMsg(`${data.message ?? "Payment failed."} You can retry or choose a different method.`);
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.message ?? "Something went wrong. Your order was not placed.");
        return;
      }

      clearCart();
      router.push(`/checkout/confirmation?order=${data.order.id}`);
    } catch {
      setErrorMsg("We couldn't reach our servers — your order was NOT placed. Cart is safe, please retry.");
    } finally {
      setPlacing(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="px-6 py-20 text-center text-valore-fog">
        Your bag is empty — nothing to check out.
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-12 max-w-2xl mx-auto space-y-8">
      <h1 className="font-display text-3xl text-valore-bone">Checkout</h1>

      {errorMsg && (
        <div className="border border-accent-amber/50 rounded-md px-4 py-3 text-accent-amber text-sm">
          {errorMsg}
        </div>
      )}

      <section>
        <h2 className="font-display text-lg text-valore-bone mb-3">Shipping</h2>
        <ShippingForm value={address} onChange={setAddress} />
      </section>

      <section>
        <h2 className="font-display text-lg text-valore-bone mb-3">Payment</h2>
        <PaymentMethodSelect selected={paymentMethod} onSelect={setPaymentMethod} />
      </section>

      <section>
        <h2 className="font-display text-lg text-valore-bone mb-3">Coupon</h2>
        <CouponInput onApplied={setDiscountPercent} onCleared={() => setDiscountPercent(0)} />
      </section>

      <section className="border-t border-valore-surfaceHigh pt-4 space-y-1">
        <div className="flex justify-between text-valore-fog text-sm">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toLocaleString()}</span>
        </div>
        {discountRs > 0 && (
          <div className="flex justify-between text-accent-amber text-sm">
            <span>Discount</span>
            <span>-Rs. {discountRs.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-valore-bone font-display text-lg pt-2">
          <span>Total</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>
      </section>

      <Button className="w-full" onClick={placeOrder} disabled={placing}>
        {placing ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  );
}
