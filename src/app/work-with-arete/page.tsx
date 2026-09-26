import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero, PageShell } from "@/components/site-chrome";

export const metadata: Metadata = { title: "Work With ARETE", description: "Start a conversation with ARETE about leadership, service, strategy, speaking, or organizational improvement.", alternates: { canonical: "/work-with-arete" } };

type WorkWithAretePageProps = { searchParams: Promise<{ area?: string; engagement?: string; topic?: string }> };

const areasOfInterest = [
  "Leadership development",
  "Customer experience",
  "Business consulting",
  "Strategic planning",
  "Speaking / keynote",
  "Training / workshop",
  "AI & digital transformation",
];

export default async function WorkWithAretePage({ searchParams }: WorkWithAretePageProps) {
  const { area, engagement, topic } = await searchParams;
  const defaultMessage = topic
    ? `I’m interested in a speaking engagement about “${topic}”.`
    : engagement
      ? `I’m interested in exploring a ${engagement.toLowerCase()}.`
      : area
        ? `I’d like to start a conversation about ${area.toLowerCase()}.`
        : "";

  return <PageShell>
  <PageHero eyebrow="Work with ARETE" index="05" title={<>What are you trying to <em>build?</em></>} intro="Tell us what you are trying to accomplish, what is getting in the way, and where you believe your organization needs to go. We will start there." />
  <section className="conversation section"><div className="conversation-copy"><p className="eyebrow">Start here</p><p className="section-number">01</p><h2>A useful conversation begins with the real challenge.</h2><p>Maybe your organization is growing. Maybe your leaders need development. Maybe your customer experience needs improvement. Maybe your team has lost alignment. Maybe you know something needs to change—but you are not yet certain where to begin.</p><p className="conversation-prompt">That is a good place to start.</p></div><ContactForm defaultMessage={defaultMessage} /></section>
  <section className="contact-options section">
    <p className="eyebrow light">Areas of interest</p>
    <div className="interest-marquee" aria-label="Areas of interest">
      <div className="interest-marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
            {areasOfInterest.map((area) => <li key={area}>{area}</li>)}
          </ul>
        ))}
      </div>
    </div>
  </section>
 </PageShell>;
}
