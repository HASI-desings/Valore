import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Page Not Found — Valore",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-4">
      <p className="text-accent-amber text-sm uppercase tracking-widest">404</p>
      <h1 className="font-display text-3xl md:text-4xl text-valore-bone">
        This page doesn&apos;t exist
      </h1>
      <p className="text-valore-fog text-sm max-w-sm">
        The page you&apos;re looking for was moved, renamed, or never existed.
      </p>
      <div className="flex gap-3 pt-2">
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
        <Link href="/catalog">
          <Button variant="ghost">Browse Catalog</Button>
        </Link>
      </div>
    </div>
  );
}
