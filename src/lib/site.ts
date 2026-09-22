const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = new URL(configuredUrl || "https://arete-preview.lcypeakcreatives.com");
export const isProductionSite = siteUrl.hostname === "aretelead.com" || siteUrl.hostname === "www.aretelead.com";
export const siteName = "ARETE Leadership & Business Consulting";

