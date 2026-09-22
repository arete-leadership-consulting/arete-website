import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta, PageHero, PageShell } from "@/components/site-chrome";

export const metadata: Metadata = { title: "Speaking & Training", description: "Keynotes, workshops, and practical leadership learning experiences with Luis Yu." };

const topics = [
  ["Leadership Beyond the Title", "Leadership begins long before someone receives a position. A practical exploration of influence, responsibility, communication, ownership, and the everyday behaviors that create trust.", "Managers, supervisors, emerging leaders, and leadership teams"],
  ["The Culture of Excellence", "Excellence is created by standards, behaviors, decisions, and habits repeated consistently throughout an organization.", "Organizations undergoing growth, culture-building, or transformation"],
  ["Customer Service Is Everyone’s Business", "Customers do not experience departments. They experience one organization. This session reframes service as an organization-wide responsibility.", "Frontline teams, managers, service organizations, and company-wide programs"],
  ["Leading Through Change", "Change creates uncertainty. Leadership creates direction. Explore how leaders communicate, align people, maintain trust, and move teams forward.", "Organizations navigating restructuring, transformation, rapid growth, or technological change"],
  ["Human Leadership in the Age of AI", "As technology becomes more capable, distinctly human leadership becomes more important: judgment, creativity, communication, meaning, and connection.", "Leadership teams, entrepreneurs, professionals, and organizations adopting AI"],
  ["From Vision to Execution", "Move from ambition to priorities, systems, accountability, and consistent action.", "Founders, entrepreneurs, executives, managers, and leadership teams"],
];

export default function SpeakingPage() { return <PageShell>
  <PageHero eyebrow="Speaking & Training" index="03" title={<>Ideas that move people. <em>Tools that move work.</em></>} intro="Luis Yu combines storytelling, practical business experience, leadership lessons, organizational insight, and actionable frameworks." />
  <section className="speaking-intro section"><div><p className="eyebrow">The experience</p><p className="section-number">01</p></div><div className="long-copy"><h2>A good talk can inspire people for an hour. A great learning experience changes what they do afterward.</h2><p>Sessions are designed to connect with people while giving them something useful to take back to their work.</p><div className="format-row"><span>Keynotes</span><span>Workshops</span><span>Leadership sessions</span><span>Facilitated conversations</span><span>Custom programs</span></div></div></section>
  <section className="topic-section section"><div className="section-heading"><div><p className="eyebrow light">Signature topics</p><p className="section-number">02</p></div><h2>Relevant ideas. <em>Practical application.</em></h2><p>For corporate events, conferences, management meetings, kickoffs, associations, and schools.</p></div><div className="topic-list">{topics.map(([title, copy, audience], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p><Link className="topic-inquiry" href={`/work-with-arete?topic=${encodeURIComponent(title)}`}>Interested in this session? <span>↗</span></Link></div><p><strong>Ideal for</strong>{audience}</p></article>)}</div></section>
  <section className="custom-program section"><p className="eyebrow">Custom programs</p><p className="section-number">03</p><h2>Your organization has its own challenges. <em>Your learning program should reflect them.</em></h2><p>Before a major engagement, ARETE can work with your leadership team to understand what your people need—not simply what topic should appear on the event program.</p></section>
  <ClosingCta heading="Give people an idea they can use on Monday." description="Build a keynote, workshop, or learning experience around the challenges your people are actually facing." href="/work-with-arete?area=Speaking%20%2F%20keynote" />
 </PageShell>; }
