import type { MetadataRoute } from "next";
import { PRODUCTS, BUNDLES } from "@/lib/data/products";
import { SITE_URL } from "@/lib/seo";

// Next.js metadata route — auto-served at /sitemap.xml, no manual XML needed.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/catalog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/deals`, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/login`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Bundles don't have their own page yet (deals page lists them inline) —
  // no route to add until /deals/[slug] exists.
  void BUNDLES;

  return [...staticRoutes, ...productRoutes];
}
