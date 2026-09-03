"use client";

// Decorative HUD chrome from the reference video: corner tick-mark rulers and
// a bottom scrubber bar. Pure decoration — no real video/timeline is wired
// underneath, and it should never imply a control that does nothing when
// tapped, so it's non-interactive (pointer-events-none) by design.
export function HudFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full">
      {/* Left ruler */}
      <div className="absolute left-2 top-8 bottom-14 w-px bg-valore-fog/20 pointer-events-none hidden md:block">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="absolute left-0 w-2 h-px bg-valore-fog/40" style={{ top: `${(i / 5) * 100}%` }} />
        ))}
      </div>
      {/* Right ruler */}
      <div className="absolute right-2 top-8 bottom-14 w-px bg-valore-fog/20 pointer-events-none hidden md:block">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="absolute right-0 w-2 h-px bg-valore-fog/40" style={{ top: `${(i / 5) * 100}%` }} />
        ))}
      </div>

      {children}

      {/* Bottom scrubber bar */}
      <div className="absolute bottom-3 inset-x-4 md:inset-x-8 flex items-center gap-3 pointer-events-none">
        <span className="text-[9px] text-valore-fog/60 font-mono">00:00</span>
        <div className="flex-1 h-px bg-valore-fog/20 relative">
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-valore-bone" />
        </div>
        <span className="text-[9px] text-valore-fog/60 font-mono">VALORE</span>
      </div>
    </div>
  );
}
