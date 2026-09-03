"use client";

import { motion } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

// Respond on press, not release: scale(0.97) fires on tap-down (whileTap),
// not on click resolution. Critically-damped spring, no bounce, per
// design.md's "Buttons, Transitions & Gesture Motion" section.
export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const base =
    "px-8 py-3 rounded-full font-display font-medium tracking-tight transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-accent-amber text-valore-void hover:bg-accent-amberSoft"
      : "border border-valore-fog/30 text-valore-bone hover:border-accent-amber/60";

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", damping: 1.0, stiffness: 210 }} // response ~0.3-0.4s, no bounce
      className={`${base} ${styles} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
