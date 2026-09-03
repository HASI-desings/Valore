import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "Valore — Premium, Accessible",
  description: "Aspirational clothing for the Pakistani youth, without the international price tag.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body bg-valore-void text-valore-bone min-h-screen">
        <div className="grain-overlay" />
        <Nav />
        <main className="pt-20">{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}
