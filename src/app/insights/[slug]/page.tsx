import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FutureFrameworks, LeadershipFrameworks, ServiceFrameworks } from "@/components/insight-frameworks";
import { PageShell } from "@/components/site-chrome";
import { getInsight, publishedInsights } from "@/lib/insights";

export function generateStaticParams() { return publishedInsights.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const insight = getInsight(slug); return insight ? { title: insight.title, description: insight.standfirst, openGraph: { title: insight.title, description: insight.standfirst, type: "article" } } : {}; }

const frameworkBySlug = { "clarity-in-leadership": LeadershipFrameworks, "building-service-culture": ServiceFrameworks, "human-leadership-ai": FutureFrameworks } as const;

export default async function InsightArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const insight = getInsight(slug); if (!insight) notFound(); const Frameworks = frameworkBySlug[slug as keyof typeof frameworkBySlug];
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: insight.title, description: insight.standfirst, author: { "@type": "Person", name: "Luis Yu" }, publisher: { "@type": "Organization", name: "ARETE" } };
  return <PageShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="insight-article"><header className="article-hero"><p className="eyebrow">ARETE Insight · {insight.category}</p><h1>{insight.title}</h1><p>{insight.standfirst}</p><div><span>By Luis Yu</span><span>8 minute read</span></div></header>
      <div className="article-layout"><div className="article-body">{insight.sections.map((section, index) => <section key={section.heading ?? index}>{section.heading && <h2>{section.heading}</h2>}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.quote && <blockquote>{section.quote}</blockquote>}</section>)}</div></div>
      {Frameworks && <Frameworks />}
      <section className="article-closing"><p className="eyebrow light">Closing question</p><blockquote>{insight.closingQuestion}</blockquote><div><span>ARETE Insight</span><p>{insight.areteInsight}</p></div></section>
      <section className="article-related"><p className="eyebrow">Continue thinking</p><div>{publishedInsights.filter(({ slug: relatedSlug }) => relatedSlug !== slug).map((related) => <Link href={`/insights/${related.slug}`} key={related.slug}><span>{related.category}</span><strong>{related.title}</strong><em>Read insight ↗</em></Link>)}</div></section>
      <section className="article-cta"><p className="eyebrow light">Turn insight into action</p><h2>Bring clearer thinking to the work that matters.</h2><p>If your organization is working through a leadership, culture, service, or execution challenge, start a conversation with ARETE.</p><Link className="button light" href="/work-with-arete">Work with ARETE <span>↗</span></Link></section>
    </article></PageShell>;
}
