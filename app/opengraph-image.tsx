import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Auto-served as the default social share image (og:image / twitter:image)
// for any page that doesn't set its own. Branded, code-generated — no
// external design asset needed. Product pages can override this later with
// their own opengraph-image.tsx once real photography exists.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 40%, rgba(201,150,44,0.25) 0%, transparent 60%)",
          }}
        />
        <span
          style={{
            fontSize: 110,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#e8e4dc",
            zIndex: 1,
          }}
        >
          VALORE
        </span>
        <span
          style={{
            fontSize: 26,
            color: "#8a8a8f",
            marginTop: 16,
            zIndex: 1,
          }}
        >
          Built for the ones who don&apos;t blend in
        </span>
      </div>
    ),
    { ...size }
  );
}
