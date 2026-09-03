"use client";

import { motion } from "framer-motion";
import { ReactiveBackground } from "./ReactiveBackground";

// Placeholder for the hover-reactive mannequin (Phase 3). Dumb component —
// receives which garment/color is active, renders accordingly, fetches
// nothing (structure.md).
export function CatalogMannequin({
  imageUrl,
  glowHex,
  active,
}: {
  imageUrl: string;
  glowHex: string;
  active: boolean;
}) {
  return (
    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-valore-surface">
      <ReactiveBackground glowHex={glowHex} />
      <motion.div
        animate={{ scale: active ? 1.03 : 1 }}
        transition={{ type: "spring", damping: 1.0, stiffness: 200 }}
        className="relative z-10 h-full w-full flex items-center justify-center"
      >
        {/* Real garment image today; swaps for a texture-mapped 3D mannequin
            once assets exist — imageUrl prop stays the same shape either way. */}
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover opacity-90"
          onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
        />
      </motion.div>
    </div>
  );
}
