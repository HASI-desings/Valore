import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/data/products";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StructuredData, productSchema } from "@/lib/structured-data";

interface Props {
  params: { slug: string };
}

// Pre-render all known product slugs at build time for speed + SEO.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: product.name,
    description: `${product.description} Rs. ${product.priceRs.toLocaleString()} — shop ${product.name} at Valore.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.variants[0].imageUrl],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <>
      <StructuredData data={productSchema(product)} />
      <div className="px-6 md:px-12 pt-12 max-w-5xl mx-auto">
        <Breadcrumbs
          items={[
            { name: "Catalog", path: "/catalog" },
            { name: product.name, path: `/product/${product.slug}` },
          ]}
        />
      </div>
      <ProductPageClient product={product} />
    </>
  );
}
