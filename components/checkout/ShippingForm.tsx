"use client";

import type { Address } from "@/types/order";

export function ShippingForm({
  value,
  onChange,
  error,
}: {
  value: Address;
  onChange: (address: Address) => void;
  error?: string | null;
}) {
  function set<K extends keyof Address>(key: K, val: Address[K]) {
    onChange({ ...value, [key]: val });
  }

  const inputClass =
    "w-full bg-valore-surface border border-valore-surfaceHigh rounded-md px-4 py-3 text-valore-bone text-sm focus:border-accent-amber outline-none transition-colors";

  return (
    <div className="space-y-3">
      {error && <p className="text-accent-amber text-xs">{error}</p>}
      <input
        className={inputClass}
        placeholder="Full name"
        value={value.fullName}
        onChange={(e) => set("fullName", e.target.value)}
      />
      <input
        className={inputClass}
        placeholder="Phone number"
        value={value.phone}
        onChange={(e) => set("phone", e.target.value)}
      />
      <input
        className={inputClass}
        placeholder="Address line 1"
        value={value.line1}
        onChange={(e) => set("line1", e.target.value)}
      />
      <input
        className={inputClass}
        placeholder="Address line 2 (optional)"
        value={value.line2 ?? ""}
        onChange={(e) => set("line2", e.target.value)}
      />
      <div className="flex gap-3">
        <input
          className={inputClass}
          placeholder="City"
          value={value.city}
          onChange={(e) => set("city", e.target.value)}
        />
        <input
          className={inputClass}
          placeholder="Postal code (optional)"
          value={value.postalCode ?? ""}
          onChange={(e) => set("postalCode", e.target.value)}
        />
      </div>
    </div>
  );
}
