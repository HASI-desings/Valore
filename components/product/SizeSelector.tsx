"use client";

interface SizeOption {
  size: string;
  stockCount: number;
}

export function SizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: SizeOption[];
  selected: string | null;
  onSelect: (size: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {sizes.map((s) => {
        const disabled = s.stockCount === 0;
        return (
          <button
            key={s.size}
            disabled={disabled}
            onClick={() => onSelect(s.size)}
            className={`w-11 h-11 rounded-full border text-sm font-body transition-colors duration-200 ${
              disabled
                ? "border-valore-surfaceHigh text-valore-fog/40 line-through cursor-not-allowed"
                : selected === s.size
                ? "border-accent-amber text-accent-amber"
                : "border-valore-fog/30 text-valore-bone hover:border-accent-amber/60"
            }`}
          >
            {s.size}
          </button>
        );
      })}
    </div>
  );
}
