"use client";

import Link from "next/link";
import { HeroModel } from "@/components/three/HeroModel";
import { GlitchWordmark } from "@/components/three/GlitchWordmark";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/lib/data/products";

// Phase 0/3: landing page. Hero garment-dissolve uses GarmentDissolve (canvas
// particle effect over real photos) instead of a 3D/.glb pipeline — see
// components/three/HeroModel.tsx and GarmentDissolve.tsx. Swap the image
// paths below for real product photography whenever it's ready; the effect
// itself doesn't change.
export default function LandingPage() {
  const featured = PRODUCTS[0];
  // Cycle across this product's variant photos for the dissolve sequence.
  // With only one photo per variant today it will just cross-fade; add more
  // angles/garments to the array once real photography exists for a fuller
  // "reforms as a different piece" effect like the reference video.
  const heroSequence = featured.variants.map((v) => v.imageUrl);

  return (
    <div>
      <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Oversized wordmark in z-space behind the model, per creative-director spec */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <GlitchWordmark text="VALORE" />
        </div>

        <div className="relative z-10 h-full w-full flex items-center justify-center">
          <HeroModel glowHex={featured.variants[0].glowHex} imageSequence={heroSequence} />
        </div>

        <div className="relative z-20 text-center mt-4 space-y-4 px-6">
          <h1 className="font-display text-hero text-valore-bone">
            Built for the ones<br />who don&apos;t blend in
          </h1>
          <p className="text-valore-fog text-sm max-w-md mx-auto">
            Premium fits, honest prices. Valore is for Pakistan first — the world next.
          </p>
          <Link href="/catalog">
            <Button className="mt-4">Explore the Collection</Button>
          </Link>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <h2 className="font-display text-2xl text-valore-bone mb-8">New This Season</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 3).map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="group">
              <div className="aspect-[3/4] rounded-lg bg-valore-surface mb-3 overflow-hidden">
                <img
                  src={p.variants[0].imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                />
              </div>
              <p className="text-valore-bone text-sm">{p.name}</p>
              <p className="text-valore-fog text-xs">Rs. {p.priceRs.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
