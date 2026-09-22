import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#101110", color: "#ff4f0b", fontSize: 45, fontWeight: 900, letterSpacing: "-0.08em" }}>A</div>,
    size,
  );
}
