import type { MetadataRoute } from "next";
import { publishedInsights } from "@/lib/insights";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date("2026-09-22");
  const routes = ["", "/about", "/consulting", "/speaking", "/insights", "/work-with-arete", "/privacy"];

  return [
    ...routes.map((route) => ({
      url: new URL(route || "/", siteUrl).toString(),
      lastModified: updatedAt,
      changeFrequency: route === "" ? "monthly" as const : "yearly" as const,
      priority: route === "" ? 1 : route === "/insights" ? 0.8 : 0.7,
    })),
    ...publishedInsights.map(({ slug }) => ({
      url: new URL(`/insights/${slug}`, siteUrl).toString(),
      lastModified: updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
