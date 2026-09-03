import type { Product, Bundle } from "@/types/product";

// Seed data per phases.md Phase 1 ("at least 6 sample products with real
// image/model placeholders"). Swap imageUrl/modelUrl for real assets later —
// nothing else in the app needs to change.
export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "obsidian-hoodie",
    name: "Obsidian Hoodie",
    category: "hoodie",
    priceRs: 6500,
    description: "Heavyweight fleece, boxy fit, minimal branding.",
    specPoints: [
      { id: "chest", x: 50, y: 22, labelX: 78, labelY: 14, label: "BRUSHED FLEECE", side: "right" },
      { id: "sleeve", x: 22, y: 40, labelX: 4, labelY: 34, label: "AERODYNAMIC CUT", side: "left" },
      { id: "pocket", x: 48, y: 62, labelX: 4, labelY: 70, label: "REINFORCED SEAM", side: "left" },
      { id: "hem", x: 62, y: 82, labelX: 82, labelY: 88, label: "TECH-KNIT HEM", side: "right" },
    ],
    variants: [
      {
        color: "Charcoal",
        colorHex: "#2a2a2e",
        glowHex: "#c9962c",
        sizes: [
          { size: "S", stockCount: 8 },
          { size: "M", stockCount: 12 },
          { size: "L", stockCount: 5 },
          { size: "XL", stockCount: 0 },
        ],
        imageUrl: "/placeholders/obsidian-hoodie-charcoal.jpg",
      },
      {
        color: "Bone",
        colorHex: "#e8e4dc",
        glowHex: "#8a6a4a",
        sizes: [
          { size: "S", stockCount: 4 },
          { size: "M", stockCount: 6 },
          { size: "L", stockCount: 9 },
        ],
        imageUrl: "/placeholders/obsidian-hoodie-bone.jpg",
      },
    ],
  },
  {
    id: "p2",
    slug: "monolith-tee",
    name: "Monolith Tee",
    category: "tee",
    priceRs: 2800,
    description: "220gsm combed cotton, garment-dyed for depth.",
    variants: [
      {
        color: "Void Black",
        colorHex: "#0a0a0b",
        glowHex: "#a13d3d",
        sizes: [
          { size: "S", stockCount: 15 },
          { size: "M", stockCount: 20 },
          { size: "L", stockCount: 10 },
        ],
        imageUrl: "/placeholders/monolith-tee-black.jpg",
      },
    ],
  },
  {
    id: "p3",
    slug: "drift-track-jacket",
    name: "Drift Track Jacket",
    category: "sportswear",
    priceRs: 8900,
    description: "Water-resistant shell, articulated sleeves for movement.",
    variants: [
      {
        color: "Slate",
        colorHex: "#3d5a75",
        glowHex: "#3d5a75",
        sizes: [
          { size: "M", stockCount: 7 },
          { size: "L", stockCount: 3 },
          { size: "XL", stockCount: 6 },
        ],
        imageUrl: "/placeholders/drift-track-jacket-slate.jpg",
      },
    ],
  },
  {
    id: "p4",
    slug: "atelier-two-piece-suit",
    name: "Atelier Two-Piece Suit",
    category: "suit",
    priceRs: 24500,
    description: "Structured shoulder, tapered leg, half-canvas construction.",
    variants: [
      {
        color: "Deep Charcoal",
        colorHex: "#232326",
        glowHex: "#8a6a4a",
        sizes: [
          { size: "38", stockCount: 2 },
          { size: "40", stockCount: 4 },
          { size: "42", stockCount: 3 },
        ],
        imageUrl: "/placeholders/atelier-suit-charcoal.jpg",
      },
    ],
  },
  {
    id: "p5",
    slug: "field-utility-set",
    name: "Field Utility Set",
    category: "casualwear",
    priceRs: 7200,
    description: "Overshirt + cargo pant, washed cotton twill.",
    variants: [
      {
        color: "Olive",
        colorHex: "#3d6a52",
        glowHex: "#3d6a52",
        sizes: [
          { size: "S", stockCount: 5 },
          { size: "M", stockCount: 9 },
          { size: "L", stockCount: 4 },
        ],
        imageUrl: "/placeholders/field-utility-olive.jpg",
      },
    ],
  },
  {
    id: "p6",
    slug: "form-wrap-dress",
    name: "Form Wrap Dress",
    category: "womenswear",
    priceRs: 9400,
    description: "Bias-cut, matte crepe, adjustable wrap tie.",
    variants: [
      {
        color: "Bronze",
        colorHex: "#8a6a4a",
        glowHex: "#c9962c",
        sizes: [
          { size: "XS", stockCount: 3 },
          { size: "S", stockCount: 6 },
          { size: "M", stockCount: 5 },
        ],
        imageUrl: "/placeholders/form-wrap-dress-bronze.jpg",
      },
    ],
  },
];

export const BUNDLES: Bundle[] = [
  {
    id: "b1",
    slug: "everyday-essentials",
    name: "Everyday Essentials — 2 Tees + 1 Hoodie",
    productSlugs: ["monolith-tee", "monolith-tee", "obsidian-hoodie"],
    bundlePriceRs: 10900,
    regularPriceRs: 12100,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
