"use client";

import { motion } from "framer-motion";

// The oversized wordmark that sits behind the model with a brief RGB-split
// "glitch" flicker on entrance, matching the reference video. Pure CSS
// text-shadow channel split — no video/canvas needed.
export function GlitchWordmark({ text = "VALORE" }: { text?: string }) {
  return (
    <motion.h2
      className="glitch-text font-display font-bold text-[18vw] md:text-[12vw] leading-none tracking-tight text-valore-bone/90 select-none"
      data-text={text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.h2>
  );
}
