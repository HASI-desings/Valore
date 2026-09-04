"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";

// Kept deliberately simple: the icon itself never distorts or bounces —
// only the count badge fades/scales in when it changes. A calm, small
// motion instead of the icon visibly flinching on every cart update.
export function CartIcon() {
  const items = useCartStore((s) => s.items);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <button
      onClick={openDrawer}
      aria-label="Open cart"
      className="relative w-10 h-10 rounded-full flex items-center justify-center border border-valore-fog/20 text-valore-bone transition-colors hover:border-accent-amber/50"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6h2l2.4 12.4a2 2 0 002 1.6h8.2a2 2 0 002-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="21" r="1" />
        <circle cx="18" cy="21" r="1" />
      </svg>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", damping: 1.0, stiffness: 300 }}
            className="absolute -top-1 -right-1 bg-accent-amber text-valore-void text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
