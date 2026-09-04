"use client";

import { useEffect, useState } from "react";
import { GarmentDissolve } from "./GarmentDissolve";
import { ReactiveBackground } from "./ReactiveBackground";
import { detectDeviceTier } from "@/lib/device-tier";

// Recreates the reference video's hero: a model shot on a dark set, garment
// dissolving into particles and reforming as the next piece. Built with
// GarmentDissolve (canvas tile-particle effect over real photos) instead of
// a 3D/.glb pipeline — swap `imageSequence` for real photography whenever
// it's ready; nothing else about this component needs to change.
export function HeroModel({
  glowHex = "#c9962c",
  imageSequence,
  alt,
}: {
  glowHex?: string;
  imageSequence: string[];
  alt: string; // descriptive text for the low-end static fallback image
}) {
  const [tier, setTier] = useState<"high" | "low" | null>(null);

  useEffect(() => {
    setTier(detectDeviceTier());
  }, []);

  if (tier === null) {
    return <div className="h-full w-full" />; // avoid layout shift before client check resolves
  }

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <ReactiveBackground glowHex={glowHex} />
      {tier === "low" ? (
        // Low-end fallback: static first frame only, no dissolve animation
        // (security.md: never a broken/heavy canvas on a device that can't handle it).
        <div className="relative z-10 w-72 h-[28rem] rounded-xl overflow-hidden bg-valore-surface border border-valore-surfaceHigh">
          <img
            src={imageSequence[0]}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        </div>
      ) : (
        // Canvas-rendered dissolve effect is decorative motion over real
        // photos — canvas has no native alt, so a visually-hidden text
        // alternative carries the description for screen readers.
        <div className="relative z-10 w-72 h-[28rem] md:w-80 md:h-[32rem]">
          <span className="sr-only">{alt}</span>
          <div aria-hidden="true" className="w-full h-full">
            <GarmentDissolve images={imageSequence} intervalMs={3200} />
          </div>
        </div>
      )}
    </div>
  );
}
