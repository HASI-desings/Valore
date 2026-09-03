"use client";

import Link from "next/link";
import { CartIcon } from "@/components/cart/CartIcon";

export function Nav() {
  return (
    <nav className="glass-surface fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4">
      <Link href="/" className="font-display text-xl tracking-tight text-valore-bone">
        VALORE
      </Link>
      <div className="hidden md:flex gap-8 text-sm text-valore-fog font-body">
        <Link href="/catalog" className="hover:text-valore-bone transition-colors">Catalog</Link>
        <Link href="/deals" className="hover:text-valore-bone transition-colors">Deals</Link>
        <Link href="/account" className="hover:text-valore-bone transition-colors">Account</Link>
      </div>
      <CartIcon />
    </nav>
  );
}
