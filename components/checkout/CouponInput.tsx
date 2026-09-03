"use client";

import { useState } from "react";

export function CouponInput({
  onApplied,
  onCleared,
}: {
  onApplied: (percentOff: number) => void;
  onCleared: () => void;
}) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [checking, setChecking] = useState(false);

  async function apply() {
    if (!code.trim()) {
      onCleared();
      setMessage(null);
      return;
    }
    setChecking(true);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.valid) {
        onApplied(data.percentOff);
        setMessage({ text: `${data.percentOff}% off applied`, ok: true });
      } else {
        onCleared();
        setMessage({
          text: data.reason === "expired" ? "This code has expired." : "Code not recognized.",
          ok: false,
        });
      }
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code"
          className="flex-1 bg-valore-surface border border-valore-surfaceHigh rounded-md px-4 py-2 text-sm text-valore-bone outline-none focus:border-accent-amber"
        />
        <button
          onClick={apply}
          disabled={checking}
          className="px-4 py-2 text-sm border border-valore-fog/30 rounded-md text-valore-bone hover:border-accent-amber"
        >
          {checking ? "..." : "Apply"}
        </button>
      </div>
      {message && (
        <p className={`text-xs ${message.ok ? "text-accent-amber" : "text-valore-fog"}`}>{message.text}</p>
      )}
    </div>
  );
}
