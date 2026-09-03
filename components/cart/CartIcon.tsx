"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";

export function CartIcon() {
  const items = useCartStore((s) => s.items);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <motion.button
      onClick={openDrawer}
      aria-label="Open cart"
      animate={bump ? { scale: [1, 1.25, 1] } : {}}
      // Momentum spring — slight bounce, per design.md, since this reacts to
      // a gesture (item just landed), not a static menu state.
      transition={{ type: "spring", damping: 0.8, stiffness: 260 }}
      className="relative w-10 h-10 rounded-full flex items-center justify-center border border-valore-fog/20 text-valore-bone"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6h2l2.4 12.4a2 2 0 002 1.6h8.2a2 2 0 002-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="21" r="1" />
        <circle cx="18" cy="21" r="1" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent-amber text-valore-void text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </motion.button>
  );
}
