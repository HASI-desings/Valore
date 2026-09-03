// Detects low-end devices proactively so 3D can degrade to video/image
// sequence BEFORE a crash, never after (security.md).
export type DeviceTier = "high" | "low";

export function detectDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "high"; // SSR default; client re-checks on mount

  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } };

  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const lowCores = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
  const saveData = nav.connection?.saveData === true;
  const slowConnection = nav.connection?.effectiveType === "2g" || nav.connection?.effectiveType === "slow-2g";
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (saveData || slowConnection || reducedMotion || (lowMemory && lowCores)) {
    return "low";
  }
  return "high";
}
