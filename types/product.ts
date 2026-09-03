export interface ProductSpecPoint {
  id: string;
  x: number; // percentage 0-100, position of the dot on the garment image
  y: number; // percentage 0-100
  labelX: number; // percentage 0-100, where the label sits
  labelY: number; // percentage 0-100
  label: string; // 3-5 word tagline max, per design spec
  side: "left" | "right";
}

export interface ProductVariant {
  color: string;
  colorHex: string;
  glowHex: string; // ambient glow tint when this variant is active
  sizes: { size: string; stockCount: number }[];
  imageUrl: string;
  modelUrl?: string; // .glb, added in Phase 3 once assets exist
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "hoodie" | "tee" | "casualwear" | "sportswear" | "suit" | "womenswear";
  priceRs: number;
  description: string;
  variants: ProductVariant[];
  specPoints?: ProductSpecPoint[]; // HUD callout tags, per creative-director spec
}

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  productSlugs: string[];
  bundlePriceRs: number;
  regularPriceRs: number;
}
