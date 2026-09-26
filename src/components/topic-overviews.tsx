"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const topics = [
  {
    title: "Leadership Beyond the Title",
    overview: "Leadership begins long before a position is given. This session helps people lead through influence, ownership, clear communication, and the everyday behaviors that build trust.",
    takeaway: "Participants leave with practical ways to create clarity, earn trust, and take responsibility from any seat in the organization.",
    audience: "Managers, supervisors, emerging leaders, and leadership teams",
  },
  {
    title: "The Culture of Excellence",
    overview: "Excellence is built through the standards, decisions, and habits a team repeats every day. This session turns culture from an abstract idea into a shared way of working.",
    takeaway: "Teams learn how expectations, accountability, and consistent leadership behavior shape a culture that performs and keeps improving.",
    audience: "Organizations undergoing growth, culture-building, or transformation",
  },
  {
    title: "Customer Service Is Everyone’s Business",
    overview: "Customers do not experience departments—they experience one organization. This session reframes service as a shared responsibility across every role and every handoff.",
    takeaway: "Participants see how their decisions affect the customer journey and gain practical habits for creating more consistent, human experiences.",
    audience: "Frontline teams, managers, service organizations, and company-wide programs",
  },
  {
    title: "Leading Through Change",
    overview: "Change creates uncertainty. Leadership creates direction. This session explores how leaders communicate honestly, align people, and maintain momentum when the path is still taking shape.",
    takeaway: "Leaders gain a practical approach to reducing confusion, strengthening trust, and helping teams move forward together.",
    audience: "Organizations navigating restructuring, transformation, rapid growth, or technological change",
  },
  {
    title: "Human Leadership in the Age of AI",
    overview: "As technology becomes more capable, distinctly human leadership matters more. This session looks at the judgment, creativity, communication, meaning, and connection that machines cannot replace.",
    takeaway: "Participants learn where AI can amplify their work and where human discernment and relationships must continue to lead.",
    audience: "Leadership teams, entrepreneurs, professionals, and organizations adopting AI",
  },
  {
    title: "From Vision to Execution",
    overview: "A compelling vision only matters when people can act on it. This session connects ambition to clear priorities, useful systems, visible accountability, and consistent action.",
    takeaway: "Teams leave with a clearer way to translate direction into decisions, ownership, and measurable progress.",
    audience: "Founders, entrepreneurs, executives, managers, and leadership teams",
  },
] as const;

type Topic = (typeof topics)[number];

export function TopicOverviews() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selectedTopic) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTopic(null);
      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>("button, a[href]"));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [selectedTopic]);

  const openTopic = (topic: Topic, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedTopic(topic);
  };

  return (
    <>
      <ol className="talk-list">
        {topics.map((topic, index) => (
          <li key={topic.title}>
            <button className="talk-trigger" type="button" onClick={(event) => openTopic(topic, event.currentTarget)} aria-haspopup="dialog">
              <span>0{index + 1}</span>
              <span className="talk-title">{topic.title}</span>
              <span className="talk-action"><span>View overview</span><b aria-hidden="true">↗</b></span>
            </button>
          </li>
        ))}
      </ol>

      {selectedTopic ? (
        <div className="topic-modal" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedTopic(null);
        }}>
          <section ref={modalRef} className="topic-modal-card" role="dialog" aria-modal="true" aria-labelledby="topic-modal-title" aria-describedby="topic-modal-overview">
            <div className="topic-modal-accent" aria-hidden="true" />
            <div className="topic-modal-topline">
              <p>Signature topic <span>{String(topics.indexOf(selectedTopic) + 1).padStart(2, "0")}</span></p>
              <button ref={closeButtonRef} className="topic-modal-close" type="button" onClick={() => setSelectedTopic(null)} aria-label="Close topic overview">Close <span aria-hidden="true">×</span></button>
            </div>
            <h3 id="topic-modal-title">{selectedTopic.title}</h3>
            <p id="topic-modal-overview" className="topic-modal-overview">{selectedTopic.overview}</p>
            <div className="topic-modal-details">
              <div><span>What people take away</span><p>{selectedTopic.takeaway}</p></div>
              <div><span>Ideal for</span><p>{selectedTopic.audience}</p></div>
            </div>
            <div className="topic-modal-actions">
              <Link className="button button-primary" href={`/work-with-arete?topic=${encodeURIComponent(selectedTopic.title)}`}>Ask about this topic <span>↗</span></Link>
              <Link className="topic-modal-more" href="/speaking">Explore all speaking options</Link>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
