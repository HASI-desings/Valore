"use client";

import { useState, useRef } from "react";
import { ProductViewer360 } from "@/components/three/ProductViewer360";
import { ColorSelector } from "@/components/product/ColorSelector";
import { SizeSelector } from "@/components/product/SizeSelector";
import { FitConfidenceSizer } from "@/components/product/FitConfidenceSizer";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/cart-store";
import { AddToCartAnimation, type FlightEvent } from "@/components/cart/AddToCartAnimation";
import type { Product } from "@/types/product";

// Plain product page — no HUD chrome or spec-pointer overlay here. That
// interface is intentionally exclusive to the landing page hero.
export function ProductPageClient({ product }: { product: Product }) {
  const [colorName, setColorName] = useState(product.variants[0].color);
  const [size, setSize] = useState<string | null>(null);
  const [flights, setFlights] = useState<FlightEvent[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);

  const variant = product.variants.find((v) => v.color === colorName) ?? product.variants[0];

  function handleAddToCart() {
    if (!size) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      size,
      color: variant.color,
      priceRs: product.priceRs,
      quantity: 1,
      imageUrl: variant.imageUrl,
    });

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setFlights((f) => [
        ...f,
        {
          id: Date.now(),
          startX: rect.left + rect.width / 2 - 28,
          startY: rect.top,
          endX: window.innerWidth - 60,
          endY: 24,
        },
      ]);
    }
  }

  return (
    <div className="px-6 md:px-12 py-12 max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
      <AddToCartAnimation flights={flights} />

      <div className="relative rounded-lg overflow-hidden bg-valore-surface aspect-square">
        <ProductViewer360 imageUrl={variant.imageUrl} alt={`${product.name} in ${variant.color} — 360 degree view`} />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl text-valore-bone">{product.name}</h1>
          <p className="text-valore-fog text-sm mt-1">{product.description}</p>
          <p className="text-accent-amber text-lg mt-3">Rs. {product.priceRs.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-valore-fog text-xs uppercase tracking-wider mb-2">Color — {variant.color}</p>
          <ColorSelector
            colors={product.variants.map((v) => ({ color: v.color, colorHex: v.colorHex }))}
            selected={colorName}
            onSelect={(c) => {
              setColorName(c);
              setSize(null);
            }}
          />
        </div>

        <div>
          <p className="text-valore-fog text-xs uppercase tracking-wider mb-2">Size</p>
          <SizeSelector sizes={variant.sizes} selected={size} onSelect={setSize} />
        </div>

        <FitConfidenceSizer onSuggest={setSize} />

        <div ref={buttonRef}>
          <Button className="w-full" onClick={handleAddToCart} disabled={!size}>
            {size ? "Add to Bag" : "Select a size"}
          </Button>
        </div>
      </div>
    </div>
  );
}
