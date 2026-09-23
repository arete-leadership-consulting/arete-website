import Link from "next/link";
import type { ReactNode } from "react";
import { AreteLogo } from "@/components/arete-logo";

const navigation = [
  ["About", "/about"],
  ["Consulting", "/consulting"],
  ["Speaking", "/speaking"],
  ["Insights", "/insights"],
];

export function SiteHeader() {
  return (
    <header className="site-header page-header">
      <Link className="brand" href="/" aria-label="ARETE home">
        <AreteLogo className="brand-logo" />
      </Link>
      <nav aria-label="Primary navigation">
        {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <Link className="header-cta" href="/work-with-arete">Work with ARETE <span>↗</span></Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand"><AreteLogo className="footer-logo" /></div>
      <div><p>Leadership &amp; Business Consulting</p><p>Mindanao, Philippines</p></div>
      <div className="footer-links"><Link href="/work-with-arete">Start a conversation ↗</Link><Link href="/privacy">Privacy</Link><span>© 2026 ARETE</span></div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, intro, index }: { eyebrow: string; title: ReactNode; intro: string; index: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="page-hero-kicker"><p className="eyebrow light">{eyebrow}</p><span>{index}</span></div>
      <h1>{title}</h1>
      <p>{intro}</p>
    </section>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main><SiteHeader />{children}<SiteFooter /></main>;
}

export function ClosingCta({
  heading = "Better organizations don’t happen by accident.",
  description = "They are built deliberately—through better leadership, better service, better systems, and better decisions.",
  href = "/work-with-arete",
  label = "Start a conversation",
}: { heading?: string; description?: string; href?: string; label?: string }) {
  return (
    <section className="closing-cta section">
      <p className="eyebrow light">Work with ARETE</p>
      <h2>{heading}</h2>
      <p>{description}</p>
      <Link className="button button-primary" href={href}>{label} <span>↗</span></Link>
    </section>
  );
}
