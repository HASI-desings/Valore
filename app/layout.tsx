import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { StructuredData, organizationSchema, localBusinessSchema } from "@/lib/structured-data";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

// metadataBase makes every relative OG/Twitter image URL below resolve to an
// absolute one automatically — required for social platforms to fetch them.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Premium, Accessible`,
    template: `%s — ${SITE_NAME}`, // page titles become "Page Name — Valore"
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — Premium, Accessible`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Premium, Accessible`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusiness = localBusinessSchema();

  return (
    <html lang="en">
      <body className="font-body bg-valore-void text-valore-bone min-h-screen">
        <StructuredData data={organizationSchema()} />
        {localBusiness && <StructuredData data={localBusiness} />}
        <div className="grain-overlay" />
        <Nav />
        <main className="pt-20">{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}
