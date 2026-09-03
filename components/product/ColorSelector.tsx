"use client";

interface ColorOption {
  color: string;
  colorHex: string;
}

export function ColorSelector({
  colors,
  selected,
  onSelect,
}: {
  colors: ColorOption[];
  selected: string;
  onSelect: (color: string) => void;
}) {
  return (
    <div className="flex gap-3">
      {colors.map((c) => (
        <button
          key={c.color}
          onClick={() => onSelect(c.color)}
          aria-label={c.color}
          className={`w-8 h-8 rounded-full transition-transform duration-300 ${
            selected === c.color ? "scale-110 ring-2 ring-accent-amber ring-offset-2 ring-offset-valore-void" : ""
          }`}
          style={{ backgroundColor: c.colorHex }}
        />
      ))}
    </div>
  );
}
