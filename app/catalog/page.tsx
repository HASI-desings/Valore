import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse Valore's full collection — hoodies, tees, sportswear, suits, and womenswear, priced for Pakistan's youth.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
      <Breadcrumbs items={[{ name: "Catalog", path: "/catalog" }]} />
      <h1 className="font-display text-3xl text-valore-bone mb-10">Catalog</h1>
      <CatalogGrid />
    </div>
  );
}
