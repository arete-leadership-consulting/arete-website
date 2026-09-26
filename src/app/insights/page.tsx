import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClosingCta, PageHero, PageShell } from "@/components/site-chrome";
import { publishedInsights } from "@/lib/insights";

export const metadata: Metadata = { title: "Insights", description: "Practical thinking on leadership, service, culture, business, technology, and the changing world of work.", alternates: { canonical: "/insights" } };

export default function InsightsPage() { return <PageShell>
  <PageHero eyebrow="ARETE Insights" index="04" title={<>Thinking for the <em>work ahead.</em></>} intro="Ideas, observations, frameworks, and practical lessons for leaders who want to think more clearly about how people and organizations can become better." />
  <section className="insights-library section"><div className="section-heading"><div><p className="eyebrow">The library</p><p className="section-number">01</p></div><h2>Leadership. Service. Culture. Business. Technology.</h2><p>A growing collection of field notes from the work of leading, building, and serving.</p></div><div className="insights-list">{publishedInsights.map((insight, index) => <article key={insight.slug}><div className="insight-mark"><Image src={insight.image.src} alt={insight.image.alt} fill sizes="180px" /><span>0{index + 1}</span></div><div><p>{insight.category}</p><h3>{insight.title}</h3><p>{insight.excerpt}</p><Link className="read-insight" href={`/insights/${insight.slug}`}>Read insight <span>↗</span></Link></div><span className="insight-status published">Published</span></article>)}</div></section>
  <section className="insight-note section"><p className="eyebrow light">A living practice</p><h2>Better questions create better decisions.</h2><p>ARETE Insights will grow with essays and practical frameworks drawn from leadership, business, customer experience, technology, and organizational life.</p></section>
  <ClosingCta heading="Bring clearer thinking to the work that matters." description="Explore the challenge further—or start a conversation about applying these ideas inside your organization." />
 </PageShell>; }
