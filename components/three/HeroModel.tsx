"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { detectDeviceTier } from "@/lib/device-tier";
import { ReactiveBackground } from "./ReactiveBackground";

// NOT a real 3D model yet — no .glb assets or 3D pipeline exist in this
// project (explicitly deferred by the user). This component is wired to be
// a drop-in slot: swap the placeholder <motion.div> below for an
// @react-three/fiber <Canvas> once assets arrive, and the device-tier
// fallback logic (security.md) already routes low-end devices away from it.
export function HeroModel({ glowHex = "#c9962c" }: { glowHex?: string }) {
  const [tier, setTier] = useState<"high" | "low" | null>(null);

  useEffect(() => {
    setTier(detectDeviceTier());
  }, []);

  if (tier === null) {
    return <div className="h-full w-full" />; // avoid layout shift before client check resolves
  }

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <ReactiveBackground glowHex={glowHex} />
      {tier === "low" ? (
        // Fallback path per phases.md Phase 3 / security.md — video/image
        // sequence for low-end devices. No file exists yet, so this shows
        // the branded static placeholder instead of a broken <video> tag.
        <div className="relative z-10 w-64 h-80 rounded-xl bg-valore-surface border border-valore-surfaceHigh flex items-center justify-center">
          <p className="text-valore-fog text-xs uppercase tracking-widest px-6 text-center">
            Lightweight preview — full 3D on this device is disabled
          </p>
        </div>
      ) : (
        <motion.div
          className="relative z-10 w-64 h-80 rounded-xl bg-valore-surface border border-valore-surfaceHigh"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-valore-fog text-xs uppercase tracking-widest text-center pt-36 px-6">
            3D hero slot — connect a .glb model + @react-three/fiber here
          </p>
        </motion.div>
      )}
    </div>
  );
}
