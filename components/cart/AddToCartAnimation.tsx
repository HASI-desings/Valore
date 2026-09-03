"use client";

import { AnimatePresence, motion } from "framer-motion";

interface FlightEvent {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

// The single most important small animation in the site (design.md): the
// garment "folds" into a box and flies to the cart icon. Momentum spring
// (damping ~0.8) since this carries visual momentum, not a static fade.
export function AddToCartAnimation({ flights }: { flights: FlightEvent[] }) {
  return (
    <AnimatePresence>
      {flights.map((f) => (
        <motion.div
          key={f.id}
          initial={{
            position: "fixed",
            left: f.startX,
            top: f.startY,
            width: 56,
            height: 56,
            borderRadius: "6px",
            opacity: 1,
            scale: 1,
          }}
          animate={{
            left: f.endX,
            top: f.endY,
            width: 18,
            height: 18,
            scale: [1, 0.85, 0.4],
            opacity: [1, 1, 0],
          }}
          transition={{ type: "spring", damping: 0.8, stiffness: 200 }} // momentum spring, per design.md
          className="z-[60] bg-accent-amber pointer-events-none shadow-lg"
        />
      ))}
    </AnimatePresence>
  );
}

export type { FlightEvent };
