import Link from "next/link";
import { HeroModel } from "@/components/three/HeroModel";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/lib/data/products";

// Phase 0/3: landing page. 3D hero is a wired placeholder (see HeroModel.tsx)
// until real .glb assets exist — everything around it (layout, copy,
// motion, glow system) is real and final.
export default function LandingPage() {
  const featured = PRODUCTS[0];

  return (
    <div>
      <section className="relative h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        <HeroModel glowHex={featured.variants[0].glowHex} />
        <div className="relative z-10 text-center mt-8 space-y-4 px-6">
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
