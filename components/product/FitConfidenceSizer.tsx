"use client";

import { useState } from "react";

// A lightweight height/build heuristic — labeled clearly as a guide, since
// claiming precision here would be a false promise, not a real fit engine.
export function FitConfidenceSizer({ onSuggest }: { onSuggest: (size: string) => void }) {
  const [heightCm, setHeightCm] = useState(175);
  const [build, setBuild] = useState<"slim" | "regular" | "athletic">("regular");

  function suggest() {
    let size = "M";
    if (heightCm < 165) size = "S";
    else if (heightCm > 185) size = "L";
    if (build === "athletic" && size === "M") size = "L";
    if (build === "slim" && size === "M") size = "S";
    onSuggest(size);
  }

  return (
    <div className="border border-valore-surfaceHigh rounded-lg p-4 space-y-3 text-sm">
      <p className="text-valore-fog text-xs uppercase tracking-wider">Fit Guide</p>
      <label className="block text-valore-bone">
        Height: {heightCm}cm
        <input
          type="range"
          min={150}
          max={200}
          value={heightCm}
          onChange={(e) => setHeightCm(Number(e.target.value))}
          className="w-full accent-accent-amber"
        />
      </label>
      <div className="flex gap-2">
        {(["slim", "regular", "athletic"] as const).map((b) => (
          <button
            key={b}
            onClick={() => setBuild(b)}
            className={`px-3 py-1 rounded-full text-xs border ${
              build === b ? "border-accent-amber text-accent-amber" : "border-valore-fog/30 text-valore-fog"
            }`}
          >
            {b}
          </button>
        ))}
      </div>
      <button onClick={suggest} className="text-accent-amber text-xs underline">
        Suggest my size
      </button>
    </div>
  );
}
