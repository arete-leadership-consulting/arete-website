export type InsightSection = { heading?: string; paragraphs: string[]; quote?: string };

export type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  standfirst: string;
  image: { src: string; alt: string };
  sections: InsightSection[];
  closingQuestion: string;
  areteInsight: string;
};

export const publishedInsights: Insight[] = [
  {
    slug: "clarity-in-leadership",
    category: "Leadership",
    title: "Why clarity is one of a leader’s most generous acts",
    excerpt: "When people do not know what matters, they spend energy guessing. Clear leadership gives people direction, confidence, and room to do their best work.",
    standfirst: "People cannot execute what they do not understand. Clarity is not merely good communication—it is one of leadership’s fundamental responsibilities.",
    image: { src: "/brand/insights/leadership-clarity.png", alt: "Business leader reviewing a strategic plan" },
    sections: [
      { paragraphs: ["Leadership is often associated with vision, courage, decisiveness, and the ability to inspire. But one of the most valuable things a leader can give a team is much simpler: clarity.", "People want to know where they are going, what matters, what is expected of them, and how their work contributes to something bigger. When those things are unclear, people often work harder—but in different directions."] },
      { heading: "Clarity reduces unnecessary weight.", paragraphs: ["A leader cannot remove every challenge from someone’s work. A leader can remove unnecessary confusion.", "Clarity answers five practical questions: What are we trying to accomplish? What matters most now? Who owns what? What does good look like? What happens next?"] },
      { heading: "Clarity is not control.", paragraphs: ["Micromanagement tells people exactly how to do everything. Clarity establishes the destination, the boundaries that matter, and the outcome we are trying to create.", "When capable people understand the destination, they can make better decisions without constantly waiting for instructions."], quote: "Good clarity creates freedom." },
      { heading: "People should not have to guess what their leader means.", paragraphs: ["Across frontline service, management, entrepreneurship, creative teams, organizational leadership, and community leadership, the pattern is often the same: vague expectations make execution difficult. Clear direction helps people move.", "Leadership is not only asking people to carry responsibility. Sometimes it means carrying the responsibility of making things clear first."] },
    ],
    closingQuestion: "Have I made the destination clear enough for people to move confidently?",
    areteInsight: "Leadership begins by creating clarity around people, purpose, and performance.",
  },
  {
    slug: "building-service-culture",
    category: "Customer Experience",
    title: "Service culture is built long before the customer arrives",
    excerpt: "Great service does not begin at the counter, on the phone, or inside a customer journey. It begins with the culture employees experience.",
    standfirst: "By the time an employee meets a customer, much of the experience has already been shaped by leadership, systems, and culture.",
    image: { src: "/brand/insights/service-culture.png", alt: "Service team preparing together before opening" },
    sections: [
      { paragraphs: ["Most organizations think about customer service at the moment an employee meets a customer: the greeting, transaction, complaint, or follow-up. But by that point, much of the customer experience has already been determined.", "The way employees treat customers is heavily influenced by the organization they experience every day."] },
      { heading: "Service starts inside.", paragraphs: ["Scripts, standards, and training matter. Sustainable service culture requires something deeper: clarity, capable leaders, useful systems, authority to solve reasonable problems, and respect for employees.", "An organization cannot consistently create excellent external experiences while tolerating poor internal ones."], quote: "Eventually, the culture reaches the customer." },
      { heading: "Every system communicates something.", paragraphs: ["Ask an employee to deliver fast service while requiring five approvals for a simple solution, and the system defeats the promise. Ask people to take ownership without giving them authority, and hesitation becomes rational.", "Customer experience is not simply a frontline responsibility. Operations, leadership, communication, technology, hiring, and culture all eventually meet the customer."] },
      { heading: "Move from service training to service culture.", paragraphs: ["A short seminar cannot repair an environment that works against the principles being taught. Organizations must align what leaders model, what processes enable, what employees can decide, what behavior gets recognized, and what the organization learns from complaints.", "When those pieces work together, service stops being something employees are reminded to do. It becomes how the organization works."] },
    ],
    closingQuestion: "What does our internal culture make easier—or harder—for the people serving our customers?",
    areteInsight: "Great customer experiences are built through aligned people, systems, leadership, and purpose.",
  },
  {
    slug: "human-leadership-ai",
    category: "Future of Work",
    title: "Human leadership in an age of intelligent tools",
    excerpt: "As intelligent tools become more capable, leadership becomes less about having all the answers—and more about judgment, trust, direction, and meaningful work.",
    standfirst: "Technology expands what organizations can do. Leadership determines which possibilities deserve attention—and what must remain meaningfully human.",
    image: { src: "/brand/insights/human-leadership-ai.png", alt: "Two leaders discussing work alongside intelligent technology" },
    sections: [
      { paragraphs: ["Artificial intelligence is changing what individuals and organizations can do. Work that once required hours can be completed in minutes; information can be summarized instantly; processes can be automated.", "Greater technological capability creates an important leadership question: what becomes more important when machines become more capable?"] },
      { heading: "AI can generate. Leaders must decide.", paragraphs: ["Intelligent tools can generate possibilities, analyze information, explore scenarios, and accelerate execution. Organizations still need people to determine what matters, which trade-offs are acceptable, what should not be done, and what kind of organization they are becoming.", "Technology expands our options. Leadership determines which options deserve attention."] },
      { heading: "Speed makes direction more important.", paragraphs: ["When execution becomes faster, poor direction becomes more expensive. Powerful technology can help a team move rapidly in the wrong direction.", "AI does not reduce the need for leadership clarity. It increases it."], quote: "Capability without direction creates faster confusion." },
      { heading: "The future is not human versus machine.", paragraphs: ["A more useful question is: what should humans do better because machines can now do more? Less repetitive production can create more space for interpretation, improvement, judgment, difficult conversations, and developing people.", "The opportunity is not simply automation. It is augmentation—technology increasing human capability without removing human responsibility."] },
    ],
    closingQuestion: "What should our people become better at now that intelligent tools can do more?",
    areteInsight: "Intelligent tools can amplify performance. Human leadership gives that performance direction and purpose.",
  },
  {
    slug: "growth-creates-problems",
    category: "Business",
    title: "Growth Creates Problems—and That Can Be a Good Thing",
    excerpt: "The systems that helped an organization reach its current level may not be the systems capable of taking it to the next one.",
    standfirst: "Growth exposes the limits of yesterday’s habits. The resulting friction can be useful evidence that an organization is ready for a stronger way of working.",
    image: { src: "/brand/insights/growth-systems.png", alt: "Leadership team redesigning an operating process on a glass wall" },
    sections: [
      { paragraphs: ["Growth is often described as proof that an organization is succeeding. More customers, more people, more opportunities, and more responsibility can all signal progress. But growth also creates pressure.", "Informal communication stops reaching everyone. Decisions that once took minutes require coordination. A founder who could personally solve every problem becomes a bottleneck. The organization has not necessarily become worse. It has become more complex."] },
      { heading: "Friction is information.", paragraphs: ["When work starts falling between roles, approvals slow down, or teams solve the same problem in different ways, the instinct may be to blame people. Often the better question is whether the operating system still fits the organization.", "Recurring friction shows where responsibilities, processes, tools, or decision rights need to mature. Treating that friction as information turns frustration into design input."], quote: "A growing organization eventually outgrows the way it used to work." },
      { heading: "Do not solve every growth problem with more effort.", paragraphs: ["Committed people can compensate for weak systems for a while. They remember what the process forgot, chase missing information, and stay late to keep promises. That effort can hide structural problems until exhaustion makes them impossible to ignore.", "Sustainable growth asks leaders to replace heroics with clarity: clear ownership, useful routines, visible priorities, and simple standards that help people make sound decisions without constant escalation."] },
      { heading: "Build for the next level without losing what matters.", paragraphs: ["Maturing an organization does not require turning it into a bureaucracy. The goal is to preserve the speed, care, and entrepreneurial energy that created momentum while adding enough structure to carry greater weight.", "The best systems reduce avoidable confusion. They make good work easier, make accountability visible, and give leaders more time to think about what comes next."] },
    ],
    closingQuestion: "What recurring problem is telling us that our way of working needs to grow with the organization?",
    areteInsight: "Growth creates complexity. Clear systems help people carry that complexity without losing momentum or purpose.",
  },
  {
    slug: "culture-without-posters",
    category: "Leadership",
    title: "You Don’t Build Culture With Posters",
    excerpt: "Values become culture only when they influence decisions, behaviors, standards, conversations, and consequences.",
    standfirst: "Culture is not the language displayed on a wall. It is the pattern people experience when priorities compete, pressure rises, and choices have consequences.",
    image: { src: "/brand/insights/culture-behavior.png", alt: "Leadership team building trust through an attentive working conversation" },
    sections: [
      { paragraphs: ["Many organizations can name their values. Fewer can show how those values change a meeting, a hiring decision, a customer recovery, a difficult conversation, or the way a leader responds when something goes wrong.", "Words can introduce an aspiration. Culture forms when people see what the organization consistently rewards, protects, challenges, and permits."] },
      { heading: "People learn culture by watching what happens.", paragraphs: ["If collaboration is celebrated but individual competition is rewarded, the reward becomes the real value. If accountability is printed on a wall but missed commitments are ignored, silence becomes the standard.", "Every response teaches people what matters here. Leaders shape culture through the decisions they repeat, especially when the convenient choice conflicts with the stated one."], quote: "Culture is the accumulated evidence of what an organization truly values." },
      { heading: "Standards need conversation.", paragraphs: ["Healthy culture is not created by assuming everyone interprets a value in the same way. Teams need to translate broad words into observable behavior: what respect sounds like in disagreement, what ownership looks like after a mistake, and what excellence requires before work is considered complete.", "These conversations make expectations usable. They also give people a fair basis for feedback and accountability."] },
      { heading: "Consistency creates trust.", paragraphs: ["No culture is perfect, and no leader behaves consistently every day. Credibility grows when leaders notice gaps, address them openly, and keep bringing decisions back to the standards they have named.", "Culture becomes strong when people no longer need a poster to remember it. They can predict how the organization will act because they have experienced the pattern repeatedly."] },
    ],
    closingQuestion: "What do our repeated decisions teach people about what we truly value?",
    areteInsight: "Culture becomes real when values shape daily choices, leadership behavior, and the standards people experience together.",
  },
  {
    slug: "strategy-choosing-what-matters",
    category: "Execution",
    title: "Strategy Means Choosing What Matters",
    excerpt: "A long list of priorities is usually evidence that priorities have not actually been chosen. Strategy creates focus. Execution turns that focus into movement.",
    standfirst: "Strategy is not the collection of everything an organization hopes to accomplish. It is a disciplined choice about where attention, energy, and resources will create the most meaningful progress.",
    image: { src: "/brand/insights/strategy-focus.png", alt: "Leadership team selecting one strategic priority from several options" },
    sections: [
      { paragraphs: ["Organizations rarely suffer from a shortage of worthwhile ideas. They struggle because more possibilities compete for the same limited attention, time, and resources.", "When every initiative is described as a priority, people receive no useful guidance about trade-offs. Work expands, attention fragments, and progress becomes difficult to see."] },
      { heading: "Choice is the work of strategy.", paragraphs: ["A strategy becomes useful when it helps people decide what to pursue, what to sequence, and what to decline for now. This requires leaders to compare opportunities against a clear direction rather than treating every good idea as equally urgent.", "Saying no does not mean an idea lacks value. It means the organization has chosen where its effort matters most in this season."], quote: "Focus is created by the choices that remove competing work." },
      { heading: "Priorities must change calendars and resources.", paragraphs: ["A declared priority is only credible when time, budget, talent, and leadership attention move toward it. If the calendar remains crowded with yesterday’s commitments, the new priority is simply another item added to the list.", "Execution improves when teams can see the connection between the strategic choice and the work they are expected to stop, start, or do differently."] },
      { heading: "Review progress without constantly changing direction.", paragraphs: ["Focus does not mean refusing to learn. Leaders should inspect results, assumptions, and changing conditions. But constant redirection creates its own form of drift because teams never stay with a choice long enough to learn from execution.", "A useful review asks whether the strategy is wrong, whether the execution needs adjustment, or whether patience is required. Those are different problems and should lead to different decisions."] },
    ],
    closingQuestion: "If we could advance only one priority meaningfully this quarter, which choice would create the greatest movement?",
    areteInsight: "Strategy creates direction through choice. Execution gives that choice time, resources, ownership, and disciplined follow-through.",
  },
];

export const getInsight = (slug: string) => publishedInsights.find((insight) => insight.slug === slug);
