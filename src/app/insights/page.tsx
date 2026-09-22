import type { Metadata } from "next";
import { ClosingCta, PageHero, PageShell } from "@/components/site-chrome";

export const metadata: Metadata = { title: "Insights", description: "Practical thinking on leadership, service, culture, business, technology, and the changing world of work." };
const insights = [
  ["Leadership", "Why Clarity Is One of a Leader’s Most Generous Acts", "People cannot execute what they do not understand. Clarity is not merely good communication. It is one of leadership’s fundamental responsibilities."],
  ["Customer Experience", "Service Culture Is Built Long Before the Customer Arrives", "Customer experience begins before anyone answers the phone, opens the door, replies to an email, or speaks to a customer. It begins with culture."],
  ["Future of Work", "Human Leadership in an Age of Intelligent Tools", "As machines become better at producing answers, leaders will be responsible for asking better questions, exercising judgment, creating meaning, and building human connection."],
  ["Business", "Growth Creates Problems—and That Can Be a Good Thing", "The systems that helped an organization reach its current level may not be the systems capable of taking it to the next one."],
  ["Leadership", "You Don’t Build Culture With Posters", "Values become culture only when they influence decisions, behaviors, standards, conversations, and consequences."],
  ["Execution", "Strategy Means Choosing What Matters", "A long list of priorities is usually evidence that priorities have not actually been chosen. Strategy creates focus. Execution turns that focus into movement."],
];

export default function InsightsPage() { return <PageShell>
  <PageHero eyebrow="ARETE Insights" index="04" title={<>Thinking for the <em>work ahead.</em></>} intro="Ideas, observations, frameworks, and practical lessons for leaders who want to think more clearly about how people and organizations can become better." />
  <section className="insights-library section"><div className="section-heading"><div><p className="eyebrow">The library</p><p className="section-number">01</p></div><h2>Leadership. Service. Culture. Business. Technology.</h2><p>A growing collection of field notes from the work of leading, building, and serving.</p></div><div className="insights-list">{insights.map(([category, title, summary], index) => <article key={title}><div className={`insight-mark mark-${(index % 3) + 1}`}><span>0{index + 1}</span></div><div><p>{category}</p><h3>{title}</h3><p>{summary}</p></div><span className="insight-status">Essay in development</span></article>)}</div></section>
  <section className="insight-note section"><p className="eyebrow light">A living practice</p><h2>Better questions create better decisions.</h2><p>ARETE Insights will grow with essays and practical frameworks drawn from leadership, business, customer experience, technology, and organizational life.</p></section>
  <ClosingCta heading="Bring clearer thinking to the work that matters." />
 </PageShell>; }
