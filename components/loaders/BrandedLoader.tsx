"use client";

import { motion } from "framer-motion";

// Never a blank canvas while a 3D asset streams in (security.md).
export function BrandedLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      <motion.div
        className="w-10 h-10 rounded-full border-2 border-accent-amber/30 border-t-accent-amber"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="text-xs tracking-[0.2em] uppercase text-valore-fog font-body"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {label}
      </motion.p>
    </div>
  );
}
