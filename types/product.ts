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
}

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  productSlugs: string[];
  bundlePriceRs: number;
  regularPriceRs: number;
}
