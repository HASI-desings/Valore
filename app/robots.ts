import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Auto-served at /robots.txt. Blocks API routes and checkout/account pages
// from indexing (no SEO value, and checkout/account are session-specific).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout", "/cart", "/account/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
