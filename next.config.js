/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.supabase.co" }],
  },
  // Strip source maps from the production bundle — smaller deploy, and
  // stops shipping readable source to every visitor's browser dev tools.
  productionBrowserSourceMaps: false,
  // Tree-shakes unused exports from these packages more aggressively —
  // meaningfully shrinks the JS bundle for icon/animation-heavy pages.
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

module.exports = nextConfig;
