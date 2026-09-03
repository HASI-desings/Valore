// Static/manual balance for v1, per phases.md Phase 6 done-when. Real balance
// comes from the user profile table once auth (Phase 7) is connected.
// NEVER use the word "coupon" here (rules.md) — this is a loyalty/gift-card space.
export default function VaultPage() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-lg mx-auto text-center space-y-4">
      <h1 className="font-display text-3xl text-valore-bone">Valore Vault</h1>
      <div className="glass-surface rounded-xl p-10">
        <p className="text-valore-fog text-xs uppercase tracking-wider mb-2">Balance</p>
        <p className="text-accent-amber text-4xl font-display">Rs. 0</p>
      </div>
      <p className="text-valore-fog text-xs">
        Gift cards and loyalty rewards will appear here once earned.
      </p>
    </div>
  );
}
