import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, BUSINESS_INFO, absoluteUrl } from "@/lib/seo";
import type { Product } from "@/types/product";

// Renders a <script type="application/ld+json"> tag. Used in layout/page
// files via <StructuredData data={...} /> — keeps JSON-LD construction out
// of JSX and in one auditable place.
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: absoluteUrl("/icon.png"),
  };
}

// LocalBusiness schema — only emit this once BUSINESS_INFO has real values.
// Placeholder/empty fields (see lib/seo.ts) are intentionally left out
// rather than shipped as fake business data.
export function localBusinessSchema() {
  if (!BUSINESS_INFO.telephone || !BUSINESS_INFO.streetAddress) {
    return null;
  }
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: BUSINESS_INFO.name,
    telephone: BUSINESS_INFO.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.streetAddress,
      addressLocality: BUSINESS_INFO.addressLocality,
      addressRegion: BUSINESS_INFO.addressRegion,
      postalCode: BUSINESS_INFO.postalCode,
      addressCountry: BUSINESS_INFO.addressCountry,
    },
    openingHours: BUSINESS_INFO.openingHours,
    url: SITE_URL,
  };
}

export function productSchema(product: Product) {
  const variant = product.variants[0];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(variant.imageUrl),
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.priceRs,
      availability: variant.sizes.some((s) => s.stockCount > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: absoluteUrl(`/product/${product.slug}`),
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
