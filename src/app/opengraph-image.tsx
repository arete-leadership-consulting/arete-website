import { ImageResponse } from "next/og";

export const alt = "ARETE Leadership & Business Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 76px", background: "#101110", color: "white", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 55, fontWeight: 900, letterSpacing: "0.1em" }}><span style={{ color: "#ff4f0b" }}>A</span>RETÉ</div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ width: 90, height: 9, marginBottom: 30, background: "#ff4f0b" }} /><div style={{ maxWidth: 980, fontSize: 74, lineHeight: 1, fontWeight: 800, letterSpacing: "-0.055em" }}>Lead better. Build stronger. Grow further.</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#c4cbcd", fontSize: 22 }}><span>Leadership &amp; Business Consulting</span><span>aretelead.com</span></div>
    </div>,
    size,
  );
}
