import type { Metadata } from "next";
import type { ReactNode } from "react";
import { isProductionSite, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "ARETE | Leadership & Business Consulting",
    template: "%s | ARETE",
  },
  description:
    "Practical leadership development, customer experience, business strategy, corporate training, and speaking for organizations across Mindanao.",
  keywords: [
    "leadership development Mindanao",
    "business consulting Philippines",
    "customer experience consulting",
    "corporate training Mindanao",
    "Luis Yu speaker",
  ],
  openGraph: {
    title: "ARETE | Build Better Leaders, Teams, and Businesses",
    description:
      "Leadership. Service. Strategy. Practical support for people, teams, and organizations pursuing excellence.",
    type: "website",
    locale: "en_PH",
    siteName,
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ARETE Leadership & Business Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARETE | Build Better Leaders, Teams, and Businesses",
    description: "Leadership. Service. Strategy. Practical support for people, teams, and organizations pursuing excellence.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: isProductionSite,
    follow: isProductionSite,
    nocache: !isProductionSite,
    googleBot: {
      index: isProductionSite,
      follow: isProductionSite,
      noimageindex: !isProductionSite,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
