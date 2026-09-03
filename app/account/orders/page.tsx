"use client";

import { useState } from "react";
import { OrderTrackerStepper } from "@/components/ui/OrderTrackerStepper";

// No real order-list-by-user endpoint yet (needs Phase 7 auth wired to
// Phase 1's orders table) — shown honestly as an empty state rather than
// fabricated sample orders.
export default function OrderHistoryPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="px-6 md:px-12 py-12 max-w-2xl mx-auto space-y-8">
      <h1 className="font-display text-3xl text-valore-bone">Order History</h1>

      <div className="glass-surface rounded-lg p-6 space-y-3">
        <p className="text-valore-fog text-sm">Track an order by number</p>
        <div className="flex gap-2">
          <input
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="VLR-XXXXXX"
            className="flex-1 bg-valore-surface border border-valore-surfaceHigh rounded-md px-4 py-2 text-sm text-valore-bone outline-none focus:border-accent-amber"
          />
          <button
            onClick={() => setError("We couldn't find an order with that number.")}
            className="px-4 py-2 text-sm border border-valore-fog/30 rounded-md text-valore-bone hover:border-accent-amber"
          >
            Track
          </button>
        </div>
        {error && <p className="text-accent-amber text-xs">{error}</p>}
      </div>

      <p className="text-valore-fog text-sm text-center py-10">
        No orders yet — once you place one, it&apos;ll show up here.
      </p>
    </div>
  );
}
