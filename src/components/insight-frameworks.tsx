"use client";

import { useEffect, useRef, useState } from "react";

type Item = { label: string; question: string; example: string };

function FrameworkShell({ index, title, intro, children }: { index: string; title: string; intro: string; children: React.ReactNode }) {
  return <section className="framework-card" aria-labelledby={`framework-${index}`}>
    <div className="framework-head"><p>ARETE Framework {index}</p><h2 id={`framework-${index}`}>{title}</h2><p>{intro}</p></div>
    {children}
  </section>;
}

function Detail({ item }: { item: Item }) { return <div className="framework-detail" aria-live="polite"><p>{item.question}</p><span>{item.example}</span></div>; }

function ProgressiveFlow({ items }: { items: Item[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => { const node = root.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: .25 }); observer.observe(node); return () => observer.disconnect(); }, []);
  return <div ref={root} className={`framework-flow ${visible ? "is-visible" : ""}`}>
    <div className="flow-steps">{items.map((item, index) => <button key={item.label} className={active === index ? "active" : ""} style={{ "--step": index } as React.CSSProperties} onClick={() => setActive(index)} onPointerEnter={() => setActive(index)} aria-pressed={active === index}><span>0{index + 1}</span><strong>{item.label}</strong></button>)}</div>
    <Detail item={items[active]} />
  </div>;
}

function Ladder({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  return <div className="framework-ladder"><div>{items.map((item, index) => <button key={item.label} className={active === index ? "active" : ""} onClick={() => setActive(index)} onPointerEnter={() => setActive(index)} aria-pressed={active === index}><span>{index + 1}</span>{item.label}</button>)}</div><Detail item={items[active]} /></div>;
}

function Recovery({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  return <div className="recovery-model"><div className="recovery-ring">{items.map((item, index) => <button key={item.label} className={active === index ? "active" : ""} onClick={() => setActive(index)} onPointerEnter={() => setActive(index)} aria-pressed={active === index}><span>{item.label.charAt(0)}</span><strong>{item.label}</strong></button>)}<p>Restore<br />trust</p></div><Detail item={items[active]} /></div>;
}

function OperatingModel() {
  const items: Item[] = [
    { label: "Purpose", question: "Why should this work exist?", example: "Set the outcome and the human value it should create." },
    { label: "Judgment", question: "What needs context and accountability?", example: "Keep consequential decisions visibly owned by people." },
    { label: "Intelligence", question: "Where can tools expand capability?", example: "Use AI to surface options, patterns, and faster first drafts." },
    { label: "Trust", question: "What makes adoption sustainable?", example: "Make boundaries, review, and responsibility explicit." },
  ];
  const [active, setActive] = useState(0);
  return <div className="operating-model"><div className="operating-orbit"><p>Meaningful<br />performance</p>{items.map((item, index) => <button key={item.label} className={active === index ? `node-${index + 1} active` : `node-${index + 1}`} onClick={() => setActive(index)} onPointerEnter={() => setActive(index)} aria-pressed={active === index}>{item.label}</button>)}</div><Detail item={items[active]} /></div>;
}

function Matrix() {
  const quadrants: Item[] = [
    { label: "Human-Led", question: "High judgment · High human value", example: "Coaching, negotiation, ethical decisions, sensitive conversations." },
    { label: "Augment", question: "High judgment · Repeatable support", example: "Research synthesis, scenario planning, decision preparation." },
    { label: "Co-Pilot", question: "Clear direction · Collaborative production", example: "Drafting, analysis, ideation, structured problem-solving." },
    { label: "Automate", question: "Low ambiguity · Repetitive execution", example: "Routine classification, formatting, routing, and data transfer." },
  ];
  const [active, setActive] = useState(0);
  return <div className="augmentation"><div className="matrix-axis axis-y">More judgment</div><div className="matrix-grid">{quadrants.map((item, index) => <button key={item.label} className={active === index ? "active" : ""} onClick={() => setActive(index)} onPointerEnter={() => setActive(index)} aria-pressed={active === index}><span>0{index + 1}</span><strong>{item.label}</strong></button>)}</div><div className="matrix-axis axis-x">More repeatability →</div><Detail item={quadrants[active]} /></div>;
}

const clarity = [
  { label: "Direction", question: "Where are we going?", example: "Name the destination in language people can repeat." },
  { label: "Priority", question: "What matters most now?", example: "Choose what receives attention before adding more work." },
  { label: "Ownership", question: "Who carries what?", example: "Make decisions and deliverables visibly owned." },
  { label: "Standard", question: "What does good look like?", example: "Define the quality, behavior, or outcome expected." },
  { label: "Action", question: "What happens next?", example: "Convert understanding into a concrete first move." },
];

export function LeadershipFrameworks() { return <div className="framework-stack"><FrameworkShell index="01" title="Clarity-to-Action Loop" intro="Clarity becomes useful when it travels all the way into action."><ProgressiveFlow items={clarity} /></FrameworkShell><FrameworkShell index="02" title="Leadership Leverage Ladder" intro="Leadership creates greater leverage as it moves from instruction toward shared capability."><Ladder items={[{ label: "Tell", question: "What must be understood?", example: "Give direct context when speed or safety matters." },{ label: "Clarify", question: "What outcome and boundaries matter?", example: "Make success legible without prescribing every move." },{ label: "Enable", question: "What capability or authority is missing?", example: "Remove obstacles and equip people to decide." },{ label: "Align", question: "How do choices connect across the team?", example: "Create shared priorities and visible trade-offs." },{ label: "Trust", question: "What can others now own?", example: "Let capability carry responsibility without unnecessary control." }]} /></FrameworkShell></div>; }

export function ServiceFrameworks() { return <div className="framework-stack"><FrameworkShell index="03" title="Service Culture Chain" intro="Customer experience is the visible end of an internal chain."><ProgressiveFlow items={[{ label: "Leadership", question: "What do leaders model?", example: "Respect, responsiveness, and customer-minded decisions." },{ label: "Systems", question: "What does the organization make possible?", example: "Processes that help rather than prevent good service." },{ label: "Employee", question: "What do people experience at work?", example: "Clarity, capability, authority, and support." },{ label: "Behavior", question: "What becomes consistent?", example: "Listening, ownership, judgment, and follow-through." },{ label: "Customer", question: "What does the customer finally feel?", example: "Confidence that the organization understands and responds." }]} /></FrameworkShell><FrameworkShell index="04" title="4R Service Recovery" intro="A useful recovery restores trust, not only the transaction."><Recovery items={[{ label: "Recognize", question: "What happened from the customer’s view?", example: "Acknowledge the experience before explaining the process." },{ label: "Respond", question: "What needs attention now?", example: "Act with urgency and name the immediate next step." },{ label: "Resolve", question: "What fair solution closes the issue?", example: "Use authority and judgment to remove the problem." },{ label: "Review", question: "What should the organization learn?", example: "Fix recurring causes instead of repeatedly treating symptoms." }]} /></FrameworkShell></div>; }

export function FutureFrameworks() { return <div className="framework-stack"><FrameworkShell index="05" title="Human + AI Operating Model" intro="Meaningful performance depends on aligning capability with purpose, judgment, and trust."><OperatingModel /></FrameworkShell><FrameworkShell index="06" title="Work Augmentation Matrix" intro="Choose a mode of work based on judgment, ambiguity, repeatability, and human value."><Matrix /></FrameworkShell></div>; }
