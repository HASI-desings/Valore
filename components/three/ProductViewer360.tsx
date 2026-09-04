"use client";

import { useState } from "react";

// Placeholder 360 viewer: drag to "rotate" cycles through a single image for
// now. Swap `frames` for real turntable renders (per requirements.md's
// fallback-asset guidance) or a real 3D model later — the drag interaction
// contract (1:1 pointer tracking, per design.md) is already correct.
//
// Fills its parent container (h-full w-full) rather than setting its own
// aspect ratio, so it composes correctly inside HudFrame/SpecPointer's
// percentage-based overlay on the product page.
export function ProductViewer360({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  const [rotation, setRotation] = useState(0);

  return (
    <div
      className="relative w-full h-full bg-valore-surface overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerMove={(e) => {
        if (e.buttons !== 1) return;
        setRotation((r) => r + e.movementX * 0.5);
      }}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ transform: `rotateY(${rotation % 360}deg)` }}
        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
      />
      <p className="absolute bottom-3 inset-x-0 text-center text-[10px] uppercase tracking-widest text-valore-fog">
        Drag to rotate
      </p>
    </div>
  );
}
