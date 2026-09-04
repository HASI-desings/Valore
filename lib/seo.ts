// Central place for site-wide SEO constants. Update SITE_URL once the real
// domain is connected in Vercel — every file that builds absolute URLs
// (sitemap, robots, structured data, OG tags) reads from here.
export const SITE_URL = "https://valore.pk"; // TODO: replace with real domain
export const SITE_NAME = "Valore";
export const SITE_DESCRIPTION =
  "Premium, aspirational clothing for Pakistan's youth — hoodies, tees, sportswear, and suits at a price that doesn't require an international budget.";

// Local Business structured data — placeholder values. Real address, phone,
// hours, and coordinates are needed before this should go live; shipping
// fake business info would misrepresent the business to Google and to
// customers, so every field below is clearly marked as a placeholder.
export const BUSINESS_INFO = {
  name: "Valore",
  telephone: "", // TODO: add real business phone number
  streetAddress: "", // TODO: add real street address
  addressLocality: "Lahore",
  addressRegion: "Punjab",
  postalCode: "",
  addressCountry: "PK",
  openingHours: "Mo-Su 10:00-22:00", // TODO: confirm real hours
};

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
