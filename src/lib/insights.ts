export type InsightSection = { heading?: string; paragraphs: string[]; quote?: string };

export type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  standfirst: string;
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
    sections: [
      { paragraphs: ["Artificial intelligence is changing what individuals and organizations can do. Work that once required hours can be completed in minutes; information can be summarized instantly; processes can be automated.", "Greater technological capability creates an important leadership question: what becomes more important when machines become more capable?"] },
      { heading: "AI can generate. Leaders must decide.", paragraphs: ["Intelligent tools can generate possibilities, analyze information, explore scenarios, and accelerate execution. Organizations still need people to determine what matters, which trade-offs are acceptable, what should not be done, and what kind of organization they are becoming.", "Technology expands our options. Leadership determines which options deserve attention."] },
      { heading: "Speed makes direction more important.", paragraphs: ["When execution becomes faster, poor direction becomes more expensive. Powerful technology can help a team move rapidly in the wrong direction.", "AI does not reduce the need for leadership clarity. It increases it."], quote: "Capability without direction creates faster confusion." },
      { heading: "The future is not human versus machine.", paragraphs: ["A more useful question is: what should humans do better because machines can now do more? Less repetitive production can create more space for interpretation, improvement, judgment, difficult conversations, and developing people.", "The opportunity is not simply automation. It is augmentation—technology increasing human capability without removing human responsibility."] },
    ],
    closingQuestion: "What should our people become better at now that intelligent tools can do more?",
    areteInsight: "Intelligent tools can amplify performance. Human leadership gives that performance direction and purpose.",
  },
];

export const getInsight = (slug: string) => publishedInsights.find((insight) => insight.slug === slug);
