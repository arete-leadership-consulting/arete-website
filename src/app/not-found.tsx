import Link from "next/link";
import { PageShell } from "@/components/site-chrome";

export default function NotFound() {
  return <PageShell>
    <section className="not-found-page section">
      <p className="eyebrow light">404 · Page not found</p>
      <h1>This path does not lead where you expected.</h1>
      <p>The page may have moved, or the address may be incomplete. Return to ARETE and continue from there.</p>
      <Link className="button button-primary" href="/">Return home <span>↗</span></Link>
    </section>
  </PageShell>;
}
