"use client";

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data/products";
import { CatalogMannequin } from "@/components/three/CatalogMannequin";

export default function CatalogPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
      <h1 className="font-display text-3xl text-valore-bone mb-10">Catalog</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {PRODUCTS.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <CatalogMannequin
              imageUrl={p.variants[0].imageUrl}
              glowHex={p.variants[0].glowHex}
              active={hovered === p.id}
            />
            <div className="mt-3">
              <p className="text-valore-bone text-sm">{p.name}</p>
              <p className="text-valore-fog text-xs">Rs. {p.priceRs.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
