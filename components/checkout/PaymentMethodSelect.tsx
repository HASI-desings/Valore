"use client";

import { paymentProviders, type PaymentProvider } from "@/lib/payments";

const LABELS: Record<PaymentProvider["id"], string> = {
  cod: "Cash on Delivery",
  bank_transfer: "Bank Transfer",
  easypaisa: "EasyPaisa",
  jazzcash: "JazzCash",
  card: "Card",
};

export function PaymentMethodSelect({
  selected,
  onSelect,
}: {
  selected: PaymentProvider["id"];
  onSelect: (id: PaymentProvider["id"]) => void;
}) {
  return (
    <div className="space-y-2">
      {(Object.keys(paymentProviders) as PaymentProvider["id"][]).map((id) => {
        const provider = paymentProviders[id];
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`w-full flex justify-between items-center px-4 py-3 rounded-md border text-sm transition-colors ${
              selected === id ? "border-accent-amber text-valore-bone" : "border-valore-surfaceHigh text-valore-fog"
            }`}
          >
            <span>{LABELS[id]}</span>
            {!provider.isLive && (
              <span className="text-[10px] uppercase tracking-wider text-valore-fog/70 border border-valore-surfaceHigh rounded-full px-2 py-0.5">
                Manual verification
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
