import type { MetadataRoute } from "next";
import { isProductionSite, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (isProductionSite) {
    return {
      rules: { userAgent: "*", allow: "/", disallow: "/api/" },
      sitemap: new URL("/sitemap.xml", siteUrl).toString(),
      host: siteUrl.toString(),
    };
  }

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
