import Link from "next/link";
import { StructuredData, breadcrumbSchema } from "@/lib/structured-data";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

// Visible breadcrumb trail + matching BreadcrumbList structured data, so the
// same trail that helps users navigate also earns the rich-snippet breadcrumb
// in search results.
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <StructuredData data={breadcrumbSchema(allItems)} />
      <nav aria-label="Breadcrumb" className="text-xs text-valore-fog mb-6">
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1">
              {i > 0 && <span className="text-valore-fog/40">/</span>}
              {i === allItems.length - 1 ? (
                <span className="text-valore-bone">{item.name}</span>
              ) : (
                <Link href={item.path} className="hover:text-valore-bone transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
