"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrderTrackerStepper } from "@/components/ui/OrderTrackerStepper";
import { Button } from "@/components/ui/Button";
import type { Order } from "@/types/order";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setOrder(data.order))
      .catch(() => setNotFound(true));
  }, [orderId]);

  if (notFound) {
    return (
      <div className="px-6 py-20 text-center">
        <p className="text-valore-fog">We couldn&apos;t find an order with that number.</p>
        <Link href="/account/orders" className="text-accent-amber text-sm underline mt-2 inline-block">
          Check your order history
        </Link>
      </div>
    );
  }

  if (!order) {
    return <div className="px-6 py-20 text-center text-valore-fog">Loading your order...</div>;
  }

  return (
    <div className="px-6 md:px-12 py-16 max-w-lg mx-auto text-center space-y-6">
      <h1 className="font-display text-3xl text-valore-bone">Order Placed</h1>
      <p className="text-valore-fog text-sm">
        Order <span className="text-accent-amber">{order.orderNumber}</span>
      </p>
      <div className="pt-4">
        <OrderTrackerStepper status={order.status} />
      </div>
      <p className="text-valore-fog text-xs">
        Total paid: Rs. {order.totalRs.toLocaleString()} via {order.paymentMethod.replace("_", " ")}
      </p>
      <Link href="/catalog">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="px-6 py-20 text-center text-valore-fog">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
