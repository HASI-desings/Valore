"use client";

import { useState } from "react";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { Button } from "@/components/ui/Button";
import type { Address } from "@/types/order";

const EMPTY: Address = { fullName: "", phone: "", line1: "", city: "" };

// Real persistence needs the `addresses` table (Phase 1) + auth (Phase 7).
// Local state here proves the form/validation contract; swapping in a
// Supabase write won't change this component's shape.
export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [draft, setDraft] = useState<Address>(EMPTY);
  const [error, setError] = useState<string | null>(null);

  function save() {
    if (!draft.fullName || !draft.phone || !draft.line1 || !draft.city) {
      // Don't silently drop input on failed submit (rules.md) — form stays filled.
      setError("Please fill in name, phone, address, and city.");
      return;
    }
    setAddresses((a) => [...a, draft]);
    setDraft(EMPTY);
    setError(null);
  }

  return (
    <div className="px-6 md:px-12 py-12 max-w-lg mx-auto space-y-8">
      <h1 className="font-display text-3xl text-valore-bone">Saved Addresses</h1>

      {addresses.map((a, i) => (
        <div key={i} className="glass-surface rounded-lg p-4 text-sm text-valore-bone">
          {a.fullName} · {a.phone} · {a.line1}, {a.city}
        </div>
      ))}

      <div className="space-y-3">
        <h2 className="font-display text-lg text-valore-bone">Add New Address</h2>
        <ShippingForm value={draft} onChange={setDraft} error={error} />
        <Button onClick={save}>Save Address</Button>
      </div>
    </div>
  );
}
