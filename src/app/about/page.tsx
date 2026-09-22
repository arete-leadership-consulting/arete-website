import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta, PageHero, PageShell } from "@/components/site-chrome";

export const metadata: Metadata = { title: "About", description: "Meet Luis Yu and discover the people, purpose, and performance philosophy behind ARETE.", alternates: { canonical: "/about" } };

const principles = [
  ["People", "Organizations move through people. We develop leaders and teams who communicate clearly, take ownership, collaborate effectively, and understand the impact of their work."],
  ["Purpose", "People perform differently when they understand why their work matters. We help organizations create clarity around direction, priorities, culture, and the experience they want to create."],
  ["Performance", "Good intentions are not enough. ARETE translates ideas into practical systems, behaviors, processes, and measurable action."],
];

const statistics = [["20+", "Years of leadership experience"], ["500+", "People led"], ["60,000+", "Clients served"], ["2.4M+", "Creative assets delivered"]];

export default function AboutPage() {
  return <PageShell>
    <PageHero eyebrow="About ARETE" index="01" title={<>Excellence is not a destination. <em>It is a way of leading.</em></>} intro="ARETE is a leadership and business consultancy built around a simple belief: organizations become better when their people become better at leading, serving, and executing." />
    <section className="page-intro section">
      <div><p className="eyebrow">The name</p><p className="section-number">01</p></div>
      <div className="long-copy"><h2>The pursuit of fulfilling one’s potential.</h2><p>The name comes from the ancient Greek idea of <i>aretē</i>—excellence, virtue, and the pursuit of fulfilling one’s potential.</p><p>For ARETE, excellence is not about perfection. It is about becoming better at what matters: better leaders, stronger teams, better customer experiences, clearer systems, and more purposeful organizations.</p><strong>Not perfection. Progress toward excellence.</strong></div>
    </section>
    <section className="principles section">
      <div className="section-heading"><div><p className="eyebrow">Our philosophy</p><p className="section-number">02</p></div><h2>People. Purpose. <em>Performance.</em></h2><p>Great organizations need all three. ARETE works where the three meet.</p></div>
      <div className="principle-grid">{principles.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="profile section">
      <div className="profile-image"><Image src="/brand/luis-yu-portrait.png" alt="Portrait of Luis Yu" fill sizes="(max-width: 720px) 100vw, 42vw" /></div>
      <div className="profile-copy"><p className="eyebrow">Meet Luis Yu</p><p className="section-number">03</p><h2>Built in the work. <em>Not only in theory.</em></h2><p className="lead">Entrepreneur, organizational leader, creative strategist, consultant, and speaker.</p><p>Luis’s experience spans frontline customer service, operations, entrepreneurship, executive leadership, organizational development, technology, and community leadership.</p><p>His journey has placed him on different sides of an organization—from serving customers directly to managing teams, building businesses, developing systems, leading hundreds of people, and helping organizations navigate change.</p><p>As founder of LCY Peak Business Solutions, he built and led a creative services organization that has served tens of thousands of clients and delivered millions of creative assets. Alongside his business experience, he has spent more than two decades developing leaders and communities.</p><blockquote>How do we help people and organizations become better at what matters most?</blockquote></div>
    </section>
    <section className="numbers section"><div className="numbers-intro"><p className="eyebrow light">Experience</p><h2>Years of leading, building, serving, and solving.</h2></div><div className="stats-grid">{statistics.map(([value, label]) => <div className="stat" key={value}><strong>{value}</strong><span>{label}</span></div>)}</div><p className="evidence-note">These figures reflect Luis Yu’s leadership and business experience.</p></section>
    <ClosingCta />
  </PageShell>;
}
