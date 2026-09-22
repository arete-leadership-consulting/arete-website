import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClosingCta, PageHero, PageShell } from "@/components/site-chrome";
import { publishedInsights } from "@/lib/insights";

export const metadata: Metadata = { title: "Insights", description: "Practical thinking on leadership, service, culture, business, technology, and the changing world of work.", alternates: { canonical: "/insights" } };
const futureInsights = [
  ["Business", "Growth Creates Problems—and That Can Be a Good Thing", "The systems that helped an organization reach its current level may not be the systems capable of taking it to the next one."],
  ["Leadership", "You Don’t Build Culture With Posters", "Values become culture only when they influence decisions, behaviors, standards, conversations, and consequences."],
  ["Execution", "Strategy Means Choosing What Matters", "A long list of priorities is usually evidence that priorities have not actually been chosen. Strategy creates focus. Execution turns that focus into movement."],
];
const insightImages: Record<string, { src: string; alt: string }> = {
  "clarity-in-leadership": { src: "/brand/insights/leadership-clarity.png", alt: "Business leader reviewing a strategic plan" },
  "building-service-culture": { src: "/brand/insights/service-culture.png", alt: "Service team preparing together before opening" },
  "human-leadership-ai": { src: "/brand/insights/human-leadership-ai.png", alt: "Two leaders discussing work alongside intelligent technology" },
};

export default function InsightsPage() { return <PageShell>
  <PageHero eyebrow="ARETE Insights" index="04" title={<>Thinking for the <em>work ahead.</em></>} intro="Ideas, observations, frameworks, and practical lessons for leaders who want to think more clearly about how people and organizations can become better." />
  <section className="insights-library section"><div className="section-heading"><div><p className="eyebrow">The library</p><p className="section-number">01</p></div><h2>Leadership. Service. Culture. Business. Technology.</h2><p>A growing collection of field notes from the work of leading, building, and serving.</p></div><div className="insights-list">{publishedInsights.map((insight, index) => { const image = insightImages[insight.slug]; return <article key={insight.slug}><div className="insight-mark"><Image src={image.src} alt={image.alt} fill sizes="180px" /><span>0{index + 1}</span></div><div><p>{insight.category}</p><h3>{insight.title}</h3><p>{insight.excerpt}</p><Link className="read-insight" href={`/insights/${insight.slug}`}>Read insight <span>↗</span></Link></div><span className="insight-status published">Published</span></article>; })}{futureInsights.map(([category, title, summary], index) => <article key={title}><div className={`insight-mark mark-${(index % 3) + 1}`}><span>0{index + 4}</span></div><div><p>{category}</p><h3>{title}</h3><p>{summary}</p></div><span className="insight-status">Upcoming insight</span></article>)}</div></section>
  <section className="insight-note section"><p className="eyebrow light">A living practice</p><h2>Better questions create better decisions.</h2><p>ARETE Insights will grow with essays and practical frameworks drawn from leadership, business, customer experience, technology, and organizational life.</p></section>
  <ClosingCta heading="Bring clearer thinking to the work that matters." description="Explore the challenge further—or start a conversation about applying these ideas inside your organization." />
 </PageShell>; }
