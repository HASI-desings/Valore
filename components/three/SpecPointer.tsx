"use client";

import { motion } from "framer-motion";

export interface SpecPoint {
  id: string;
  x: number; // percentage 0-100, position of the dot on the garment
  y: number; // percentage 0-100
  labelX: number; // percentage 0-100, where the label sits
  labelY: number; // percentage 0-100
  label: string; // 3-5 word tagline max, per design spec
  side: "left" | "right"; // which side the label text aligns to
}

// Recreates the reference video's spatial pointer-line callouts: a dot on
// the garment, a thin animated line, a short all-caps tag. No paragraphs —
// 3-5 words max, per the creative-director spec.
export function SpecPointer({ points }: { points: SpecPoint[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {points.map((p, i) => (
          <motion.line
            key={p.id}
            x1={p.x}
            y1={p.y}
            x2={p.labelX}
            y2={p.labelY}
            stroke="rgba(232,228,220,0.5)"
            strokeWidth="0.15"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>

      {points.map((p, i) => (
        <div key={p.id}>
          {/* Dot marker on the garment */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-valore-bone ring-4 ring-valore-bone/20"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.15, type: "spring", damping: 0.8, stiffness: 260 }}
          />
          {/* Tagline label */}
          <motion.p
            className={`absolute text-[10px] uppercase tracking-[0.15em] text-valore-bone whitespace-nowrap ${
              p.side === "left" ? "text-right -translate-x-full pr-2" : "pl-2"
            }`}
            style={{ left: `${p.labelX}%`, top: `${p.labelY}%`, transform: `translateY(-50%) ${p.side === "left" ? "translateX(-100%)" : ""}` }}
            initial={{ opacity: 0, x: p.side === "left" ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
          >
            {p.label}
          </motion.p>
        </div>
      ))}
    </div>
  );
}
