import Link from "next/link";

// Real user session data wires in once Phase 7 auth is connected — this
// dashboard shell and its links are functional today.
export default function AccountPage() {
  const links = [
    { href: "/account/orders", label: "Order History" },
    { href: "/account/addresses", label: "Saved Addresses" },
    { href: "/account/vault", label: "Valore Vault" },
  ];

  return (
    <div className="px-6 md:px-12 py-12 max-w-2xl mx-auto">
      <h1 className="font-display text-3xl text-valore-bone mb-10">Account</h1>
      <div className="space-y-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block glass-surface rounded-lg px-6 py-4 text-valore-bone hover:border-accent-amber/40 border border-transparent transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
