"use client";

// Dumb component: props in, render out — no data-fetching (structure.md).
// This is the CSS-based ambient glow layer from design.md/creative-director
// spec. It works today with zero 3D assets; once real garment renders exist,
// CatalogMannequin/HeroModel sit on top of this same glow layer unchanged.
export function ReactiveBackground({ glowHex }: { glowHex: string }) {
  return (
    <div
      className="ambient-glow animate-idleFloat"
      style={{ ["--glow-color" as any]: glowHex }}
    />
  );
}
