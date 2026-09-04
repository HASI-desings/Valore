import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Next.js metadata route — auto-served as the site favicon. Generates a
// simple branded "V" mark in code so there's a real, on-brand icon instead
// of the framework default, with no external design tool needed.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#c9962c",
            fontFamily: "sans-serif",
          }}
        >
          V
        </span>
      </div>
    ),
    { ...size }
  );
}
