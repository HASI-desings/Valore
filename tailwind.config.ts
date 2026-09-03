import type { Config } from "tailwindcss";

// Design tokens sourced from design.md (dark/tactile/warm-accent brand)
// + the variant-reactive glow system from the creative-director spec.
// No default Tailwind palette is used anywhere in the project.

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base — deep charcoal/near-black, never pure #000 (design.md)
        valore: {
          void: "#0a0a0b",
          charcoal: "#121214",
          surface: "#1a1a1d",
          surfaceHigh: "#232326",
          grain: "#2a2a2e",
          fog: "#8a8a8f", // quiet body text
          bone: "#e8e4dc", // off-white, not pure white
        },
        // Accent — warm, premium. Amber/gold primary, bronze secondary.
        accent: {
          amber: "#c9962c",
          amberSoft: "#e0b45c",
          bronze: "#8a6a4a",
        },
        // Per-variant ambient glow palette (creative-director spec, sec. 2)
        // Extend per real product variant at build time.
        glow: {
          amber: "#c9962c",
          crimson: "#a13d3d",
          forest: "#3d6a52",
          slate: "#3d5a75",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"], // condensed/variable-weight
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3.5rem, 10vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      backdropBlur: {
        glass: "18px",
      },
      transitionTimingFunction: {
        // Weighted/physical curve, not linear or cartoon-bouncy (design.md)
        expensive: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-1%,-2%)" },
          "30%": { transform: "translate(2%,1%)" },
          "50%": { transform: "translate(-1%,2%)" },
          "70%": { transform: "translate(1%,-1%)" },
          "90%": { transform: "translate(-2%,1%)" },
        },
        idleFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        idleFloat: "idleFloat 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
