import Image from "next/image";
import Link from "next/link";
import { AreteLogo } from "@/components/arete-logo";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const services = [
  { number: "01", label: "Lead", title: "Leadership & organizational development", description: "Build leaders who communicate clearly, align teams, shape culture, and lead through change with confidence.", topics: ["Leadership development", "Team alignment", "Culture & communication"] },
  { number: "02", label: "Serve", title: "Customer & client experience", description: "Turn service into a shared discipline through better journeys, stronger relationships, and capable frontline teams.", topics: ["Experience strategy", "Service culture", "Frontline development"] },
  { number: "03", label: "Grow", title: "Business & strategy", description: "Create the clarity, systems, and practical plans needed to move from ambition to consistent execution.", topics: ["Business strategy", "Operational improvement", "AI-enabled workflows"] },
];

const statistics = [["20+", "Years of leadership experience"], ["500+", "People led"], ["60,000+", "Clients served"], ["2.4M+", "Creative assets delivered"]];
const talks = ["Leadership Beyond the Title", "The Culture of Excellence", "Customer Service is Everyone’s Business", "Leading Through Change", "Human Leadership in the Age of AI", "From Vision to Execution"];
const insights = [
  { category: "Leadership", title: "Why clarity is one of a leader’s most generous acts", slug: "clarity-in-leadership", image: "/brand/insights/leadership-clarity.png", alt: "Business leader reviewing a strategic plan" },
  { category: "Customer experience", title: "Service culture is built long before the customer arrives", slug: "building-service-culture", image: "/brand/insights/service-culture.png", alt: "Service team preparing together before opening" },
  { category: "Future of work", title: "Human leadership in an age of intelligent tools", slug: "human-leadership-ai", image: "/brand/insights/human-leadership-ai.png", alt: "Two leaders discussing work alongside intelligent technology" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ARETE home">
          <AreteLogo className="brand-logo" />
        </a>
        <nav aria-label="Primary navigation"><Link href="/about">About</Link><Link href="/consulting">Consulting</Link><Link href="/speaking">Speaking</Link><Link href="/insights">Insights</Link></nav>
        <Link className="header-cta" href="/work-with-arete">Work with ARETE <span>↗</span></Link>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-stage">
          <Image className="hero-image" src="/brand/luis-yu-hero.png" alt="Luis Yu speaking onstage" fill sizes="100vw" preload />
          <div className="hero-copy">
            <h1>
              <span className="hero-line"><strong>Lead</strong><small> better.</small></span>
              <span className="hero-line"><strong>Build</strong><small> stronger.</small></span>
              <span className="hero-line"><strong>Grow</strong><small> further.</small></span>
            </h1>
            <p className="hero-intro">Leadership and business consulting for people ready to move forward.</p>
            <div className="button-row"><Link className="button button-primary" href="/work-with-arete">Work with ARETE <span>↗</span></Link><Link className="button button-quiet" href="/speaking">Book Luis to speak <span>↗</span></Link></div>
          </div>
          <div className="portrait-tag"><span>Founder &amp; principal consultant</span><strong>Luis Yu</strong></div>
        </div>
        <div className="hero-strip"><span>People.</span><span>Purpose.</span><span>Performance.</span><p>ARETE works where the three meet.</p></div>
      </section>

      <section className="manifesto section" id="about">
        <div><p className="eyebrow">Why ARETE</p><p className="section-number">01</p></div>
        <div className="manifesto-copy"><h2>Excellence is more than a standard. <em>It is a way of becoming.</em></h2><div className="two-column-copy"><p>Aretē is an ancient Greek idea associated with excellence or virtue—the pursuit of fulfilling one’s potential. That is the idea behind ARETE.</p><p>We help organizations identify what they can become—and build the leadership, people, systems, and strategies necessary to get there.</p></div><p className="pull-quote">Not perfection. Progress toward excellence.</p></div>
      </section>

      <section className="services section" id="consulting">
        <div className="section-heading"><div><p className="eyebrow">How we help</p><p className="section-number">02</p></div><h2>Three disciplines.<br /><em>One standard.</em></h2><p>Practical support where leadership, service, and strategy meet.</p></div>
        <div className="service-list">{services.map((service) => <article className="service" key={service.label}><div className="service-title"><span>{service.number}</span><p>{service.label}</p></div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></article>)}</div>
      </section>

      <section className="founder section">
        <div className="founder-panel">
          <Image className="founder-image" src="/brand/luis-yu-portrait.png" alt="Portrait of Luis Yu" fill sizes="(max-width: 720px) 100vw, 50vw" />
          <div className="founder-image-shade" aria-hidden="true" />
          <p className="eyebrow light">Founder &amp; principal consultant</p>
          <p className="founder-caption">Experience across business, creative, organizational, and community leadership.</p>
        </div>
        <div className="founder-copy"><p className="section-number">03</p><h2>Meet<br /><em>Luis Yu.</em></h2><p className="founder-lead">Entrepreneur, business leader, creative strategist, consultant, and speaker.</p><p>His experience spans frontline service, management, entrepreneurship, executive leadership, organizational development, and community building.</p><Link className="text-link" href="/about">Meet Luis <span>↗</span></Link></div>
      </section>

      <section className="numbers section" aria-label="Experience by the numbers">
        <div className="numbers-intro"><p className="eyebrow light">Experience by the numbers</p><h2>Built in the work.<br /><em>Not in theory.</em></h2></div>
        <div className="stats-grid">{statistics.map(([value, label]) => <div className="stat" key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
        <p className="evidence-note">These figures reflect Luis Yu’s leadership and business experience.</p>
      </section>

      <section className="consulting section">
        <div className="consulting-question"><p className="eyebrow">Consulting</p><p className="section-number">04</p><h2>What is keeping your organization from its <em>next level?</em></h2></div>
        <div className="consulting-answer"><p className="short-lines">Sometimes the problem isn’t effort.<br />It’s clarity.<br />Leadership.<br />Culture.<br />Systems.<br />Execution.</p><p>ARETE works alongside leaders to understand what is happening, identify what matters most, and develop practical ways forward.</p><div className="process" aria-label="Consulting process">{['Discover', 'Diagnose', 'Design', 'Develop', 'Deliver'].map((step, index) => <div key={step}><span>0{index + 1}</span>{step}</div>)}</div></div>
      </section>

      <section className="speaking section" id="speaking">
        <div className="section-heading"><div><p className="eyebrow light">Speaking &amp; training</p><p className="section-number">05</p></div><h2>Ideas that move people.<br /><em>Tools that move work.</em></h2><p>Storytelling grounded in business experience, organizational leadership, and practical frameworks.</p></div>
        <ol className="talk-list">{talks.map((talk, index) => <li key={talk}><span>0{index + 1}</span><p>{talk}</p><b aria-hidden="true">↗</b></li>)}</ol>
        <Link className="button button-primary" href="/speaking">Explore speaking topics <span>↗</span></Link>
      </section>

      <section className="framework section">
        <p className="eyebrow">A central idea</p><p className="section-number">06</p>
        <div className="framework-words" aria-label="People, purpose, performance"><span>People.</span><span>Purpose.</span><span>Performance.</span></div>
        <div className="framework-copy"><h2>Great organizations need all three.</h2><div><p>Performance without people is unsustainable.</p><p>People without purpose lose direction.</p><p>Purpose without execution remains an idea.</p></div><strong>ARETE works where the three meet.</strong></div>
      </section>

      <section className="insights section" id="insights">
        <div className="section-heading"><div><p className="eyebrow">ARETE Insights</p><p className="section-number">07</p></div><h2>Thinking for the<br /><em>work ahead.</em></h2><p>Notes on leadership, service, culture, business, and the future of work.</p></div>
        <div className="insight-grid">{insights.map((insight, index) => <article key={insight.slug}><div className="insight-art"><Image src={insight.image} alt={insight.alt} fill sizes="(max-width: 900px) 100vw, 33vw" /><span>0{index + 1}</span></div><p>{insight.category}</p><h3>{insight.title}</h3><Link className="read-more" href={`/insights/${insight.slug}`}>Read insight <span>↗</span></Link></article>)}</div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-copy"><p className="eyebrow light">Start a conversation</p><p className="section-number">08</p><h2>What are you trying<br />to <em>build?</em></h2><p>Whether you’re developing leaders, strengthening your team, improving customer experience, or figuring out your organization’s next move—let’s talk.</p></div>
        <ContactForm />
      </section>

      <footer><div className="footer-brand"><AreteLogo className="footer-logo" /></div><div><p>Leadership &amp; Business Consulting</p><p>Mindanao, Philippines</p></div><div className="footer-links"><Link href="/work-with-arete">Start a conversation ↗</Link><Link href="/privacy">Privacy</Link><span>© 2026 ARETE</span></div></footer>
    </main>
  );
}
