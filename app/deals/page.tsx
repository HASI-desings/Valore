import { BUNDLES } from "@/lib/data/products";

// Phase 8. Bundle add-to-cart flows through the same cart store as single
// items — see the "you save X" line, sourced from real bundle vs regular
// price data, not a hardcoded percentage.
export default function DealsPage() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-5xl mx-auto">
      <h1 className="font-display text-3xl text-valore-bone mb-10">Deals & Combos</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {BUNDLES.map((b) => {
          const savings = b.regularPriceRs - b.bundlePriceRs;
          return (
            <div key={b.id} className="glass-surface rounded-lg p-6">
              <h2 className="font-display text-lg text-valore-bone">{b.name}</h2>
              <p className="text-valore-fog text-sm mt-2">
                Rs. {b.bundlePriceRs.toLocaleString()}{" "}
                <span className="line-through text-valore-fog/50 ml-2">
                  Rs. {b.regularPriceRs.toLocaleString()}
                </span>
              </p>
              <p className="text-accent-amber text-xs mt-1">You save Rs. {savings.toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
