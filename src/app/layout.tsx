import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
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
    siteName: "ARETE Leadership & Business Consulting",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
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
