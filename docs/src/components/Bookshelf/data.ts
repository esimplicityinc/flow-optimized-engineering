/**
 * FOE Bookshelf - Book and Resource Data
 * 
 * Core reference materials that inform Flow Optimized Engineering principles.
 * Book covers loaded from Open Library's free CDN.
 */

export interface BookItem {
  id: string;
  title: string;
  author: string;
  foeRelevance: string;
  coverId?: number; // Open Library cover ID (not used for resources - they use inline SVGs)
  externalUrl: string;
  type: 'book' | 'resource';
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  items: BookItem[];
}

/**
 * Get the Open Library cover URL for a given cover ID
 */
export function getCoverUrl(coverId: number, size: 'S' | 'M' | 'L' = 'L'): string {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

/**
 * All books organized by category
 */
export const categories: Category[] = [
  {
    id: 'behavioral-economics',
    title: 'Behavioral Economics + Persuasion',
    subtitle: 'Why teams and users don\'t behave "rationally"',
    color: '#7c3aed', // Purple - matches feedback color
    items: [
      {
        id: 'alchemy',
        title: 'Alchemy',
        author: 'Rory Sutherland',
        foeRelevance: 'Reframes "value" as perception + context; pushes experimentation over armchair rationality—great for FOE\'s fast feedback mindset.',
        coverId: 10184444,
        externalUrl: 'https://openlibrary.org/works/OL20866639W',
        type: 'book',
      },
      {
        id: 'thinking-fast-slow',
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        foeRelevance: 'System 1 vs System 2 thinking; explains why process and UX must be designed for bias, not ideals.',
        coverId: 13290711,
        externalUrl: 'https://openlibrary.org/works/OL15992072W',
        type: 'book',
      },
      {
        id: 'nudge',
        title: 'Nudge',
        author: 'Richard Thaler & Cass Sunstein',
        foeRelevance: 'Choice architecture; helps FOE design defaults/guardrails so "the right thing" is the easy thing.',
        coverId: 6402116,
        externalUrl: 'https://openlibrary.org/works/OL3936258W',
        type: 'book',
      },
      {
        id: 'influence',
        title: 'Influence',
        author: 'Robert Cialdini',
        foeRelevance: 'Social proof/authority/scarcity etc.; useful for landing FOE with execs and shifting org behavior.',
        coverId: 431011,
        externalUrl: 'https://openlibrary.org/works/OL3902892W',
        type: 'book',
      },
      {
        id: 'switch',
        title: 'Switch',
        author: 'Chip & Dan Heath',
        foeRelevance: 'Practical change mechanics; aligns to FOE adoption as a change campaign, not a memo.',
        coverId: 7348937,
        externalUrl: 'https://openlibrary.org/works/OL18619651W',
        type: 'book',
      },
    ],
  },
  {
    id: 'psychological-safety',
    title: 'Psychological Safety + Team Culture',
    subtitle: 'Creating environments where teams can act decisively',
    color: '#ec4899', // Pink - warmth/safety
    items: [
      {
        id: 'fearless-organization',
        title: 'The Fearless Organization',
        author: 'Amy Edmondson',
        foeRelevance: 'The research foundation for psychological safety; without it, teams can\'t take the risks that enable fast feedback and learning.',
        coverId: 8833979,
        externalUrl: 'https://openlibrary.org/works/OL20185510W',
        type: 'book',
      },
    ],
  },
  {
    id: 'leadership-purpose',
    title: 'Leadership + Purpose',
    subtitle: 'Alignment as a prerequisite for flow',
    color: '#059669', // Green - matches confidence color
    items: [
      {
        id: 'extreme-ownership',
        title: 'Extreme Ownership',
        author: 'Jocko Willink & Leif Babin',
        foeRelevance: 'Ownership, decentralized execution, clarity of intent—removes "coordination drag" that kills flow.',
        coverId: 12835042,
        externalUrl: 'https://openlibrary.org/works/OL20017105W',
        type: 'book',
      },
      {
        id: 'start-with-why',
        title: 'Start With Why',
        author: 'Simon Sinek',
        foeRelevance: 'Purpose as an alignment engine; reduces thrash and rework by making "why" explicit.',
        coverId: 6395237,
        externalUrl: 'https://openlibrary.org/works/OL13806374W',
        type: 'book',
      },
      {
        id: 'measure-what-matters',
        title: 'Measure What Matters',
        author: 'John Doerr',
        foeRelevance: 'OKRs for alignment and focus; connects engineering work to outcomes, reducing thrash from unclear priorities.',
        coverId: 10706481,
        externalUrl: 'https://openlibrary.org/works/OL24232412W',
        type: 'book',
      },
    ],
  },
  {
    id: 'engineering-leadership',
    title: 'Engineering Leadership',
    subtitle: 'Creating conditions for flow at scale',
    color: '#6366f1', // Indigo - leadership/vision
    items: [
      {
        id: 'staff-engineer',
        title: 'Staff Engineer',
        author: 'Will Larson',
        foeRelevance: 'Technical leadership beyond the management track; how senior ICs create leverage through architecture, mentorship, and organizational influence.',
        coverId: 10637714,
        externalUrl: 'https://openlibrary.org/works/OL24199831W',
        type: 'book',
      },
    ],
  },
  {
    id: 'antifragility-risk',
    title: 'Antifragility + Risk',
    subtitle: 'How to get stronger under volatility',
    color: '#dc2626', // Red - danger/risk theme
    items: [
      {
        id: 'antifragile',
        title: 'Antifragile',
        author: 'Nassim Nicholas Taleb',
        foeRelevance: 'Design for volatility; optionality, small bets, bounded downside—very FOE-native for experimentation + resilience.',
        coverId: 9180157,
        externalUrl: 'https://openlibrary.org/works/OL16726829W',
        type: 'book',
      },
      {
        id: 'black-swan',
        title: 'The Black Swan',
        author: 'Nassim Nicholas Taleb',
        foeRelevance: 'Epistemic humility about rare events; why prediction fails and robustness matters—foundational for FOE\'s confidence pillar.',
        coverId: 5721840,
        externalUrl: 'https://openlibrary.org/works/OL3295030W',
        type: 'book',
      },
    ],
  },
  {
    id: 'architecture-design',
    title: 'Architecture + Design Patterns',
    subtitle: 'Structural decisions that enable change',
    color: '#0891b2', // Cyan - matches understanding color
    items: [
      {
        id: 'ddd',
        title: 'Domain-Driven Design',
        author: 'Eric Evans',
        foeRelevance: 'Ubiquitous language and bounded contexts; aligns code structure to business understanding, reducing cognitive load and enabling team autonomy.',
        coverId: 5548424,
        externalUrl: 'https://openlibrary.org/works/OL4464385W',
        type: 'book',
      },
      {
        id: 'clean-architecture',
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        foeRelevance: 'Dependency rules and boundaries; keeps the core stable while enabling rapid iteration at the edges—structural support for fast feedback.',
        coverId: 8605114,
        externalUrl: 'https://openlibrary.org/works/OL19809141W',
        type: 'book',
      },
      {
        id: 'hexagonal-architecture',
        title: 'Hexagonal Architecture',
        author: 'Alistair Cockburn',
        foeRelevance: 'Ports and adapters pattern; isolates business logic from infrastructure, enabling testing and swappability—core to maintainable systems.',
        externalUrl: 'https://alistair.cockburn.us/hexagonal-architecture/',
        type: 'resource',
      },
      {
        id: 'twelve-factor',
        title: 'The Twelve-Factor App',
        author: 'Adam Wiggins / Heroku',
        foeRelevance: 'Cloud-native application principles; config, dependencies, disposability—foundational patterns for deployment confidence.',
        externalUrl: 'https://12factor.net',
        type: 'resource',
      },
    ],
  },
  {
    id: 'agile-craftsmanship',
    title: 'Agile Craftsmanship + Code Economics',
    subtitle: 'Keep change cheap',
    color: '#14b8a6', // Teal
    items: [
      {
        id: 'xp-explained',
        title: 'Extreme Programming Explained',
        author: 'Kent Beck',
        foeRelevance: 'Short cycles, tight feedback loops, engineering discipline as the enabler of speed.',
        coverId: 5394766,
        externalUrl: 'https://openlibrary.org/works/OL1961693W',
        type: 'book',
      },
      {
        id: 'refactoring',
        title: 'Refactoring',
        author: 'Martin Fowler (with Kent Beck)',
        foeRelevance: 'Systematically keep the codebase malleable so flow doesn\'t collapse under tech debt.',
        coverId: 7087623,
        externalUrl: 'https://openlibrary.org/works/OL16551230W',
        type: 'book',
      },
    ],
  },
  {
    id: 'cognitive-load-dx',
    title: 'Cognitive Load + Developer Experience',
    subtitle: 'Reducing friction in the development loop',
    color: '#8b5cf6', // Violet
    items: [
      {
        id: 'software-eng-google',
        title: 'Software Engineering at Google',
        author: 'Titus Winters, Tom Manshreck & Hyrum Wright',
        foeRelevance: 'Lessons from scale: code review, testing, documentation culture—how Google institutionalizes understanding and fast feedback.',
        coverId: 10450993,
        externalUrl: 'https://openlibrary.org/works/OL22293580W',
        type: 'book',
      },
      {
        id: 'programmers-brain',
        title: 'The Programmer\'s Brain',
        author: 'Felienne Hermans',
        foeRelevance: 'Cognitive science applied to code; how developers read, understand, and remember—directly supports FOE\'s understanding pillar.',
        coverId: 11352839,
        externalUrl: 'https://openlibrary.org/works/OL24658954W',
        type: 'book',
      },
      {
        id: 'docs-for-developers',
        title: 'Docs for Developers',
        author: 'Jared Bhatti, Zachary Sarah Corleissen, Jen Lambourne, David Nunez & Heidi Waterhouse',
        foeRelevance: 'Documentation as a product; reduces cognitive load by offloading knowledge to artifacts—essential for understanding at scale.',
        coverId: 11329695,
        externalUrl: 'https://openlibrary.org/works/OL24645251W',
        type: 'book',
      },
    ],
  },
  {
    id: 'product-strategy',
    title: 'Product Discovery + Strategy',
    subtitle: 'Building the right thing, not just building it right',
    color: '#f59e0b', // Amber
    items: [
      {
        id: 'inspired',
        title: 'Inspired',
        author: 'Marty Cagan',
        foeRelevance: 'Product teams over feature factories; empowered engineers who understand the "why" move faster with less rework.',
        coverId: 9700654,
        externalUrl: 'https://openlibrary.org/works/OL16803591W',
        type: 'book',
      },
      {
        id: 'empowered',
        title: 'Empowered',
        author: 'Marty Cagan & Chris Jones',
        foeRelevance: 'How leaders create the environment for empowered product teams; organizational conditions that enable flow.',
        coverId: 10847862,
        externalUrl: 'https://openlibrary.org/works/OL21688399W',
        type: 'book',
      },
    ],
  },
  {
    id: 'devops-dora',
    title: 'DevOps + Delivery Performance Science',
    subtitle: 'DORA: evidence for speed',
    color: '#1e40af', // Blue - primary/trust
    items: [
      {
        id: 'accelerate',
        title: 'Accelerate',
        author: 'Nicole Forsgren, Jez Humble & Gene Kim',
        foeRelevance: 'The research backbone: what predicts delivery performance and org outcomes.',
        coverId: 8509069,
        externalUrl: 'https://openlibrary.org/works/OL19542983W',
        type: 'book',
      },
      {
        id: 'dora',
        title: 'DORA Official Guides',
        author: 'DORA Team (Google Cloud)',
        foeRelevance: 'How the metrics evolved; practical measurement framing for delivery performance.',
        externalUrl: 'https://dora.dev',
        type: 'resource',
      },
      {
        id: 'four-keys',
        title: 'Four Keys',
        author: 'Google Cloud / Open Source',
        foeRelevance: 'A common operationalization pattern teams use to implement DORA-style metrics.',
        externalUrl: 'https://github.com/dora-team/fourkeys',
        type: 'resource',
      },
      {
        id: 'devops-handbook',
        title: 'The DevOps Handbook',
        author: 'Gene Kim, Jez Humble, Patrick Debois & John Willis',
        foeRelevance: 'Turns the research into practices and operating model.',
        coverId: 10860557,
        externalUrl: 'https://openlibrary.org/works/OL19730495W',
        type: 'book',
      },
      {
        id: 'phoenix-project',
        title: 'The Phoenix Project',
        author: 'Gene Kim, Kevin Behr & George Spafford',
        foeRelevance: 'Narrative form of flow + constraints + WIP + ops/dev alignment.',
        coverId: 9151976,
        externalUrl: 'https://openlibrary.org/works/OL16806686W',
        type: 'book',
      },
      {
        id: 'continuous-delivery',
        title: 'Continuous Delivery',
        author: 'Jez Humble & David Farley',
        foeRelevance: 'The "deployment pipeline" discipline that makes fast change safe.',
        coverId: 6998977,
        externalUrl: 'https://openlibrary.org/works/OL16420058W',
        type: 'book',
      },
    ],
  },
  {
    id: 'flow-visibility',
    title: 'Flow Theory + Work Visibility',
    subtitle: 'Seeing and optimizing how work moves',
    color: '#7c3aed', // Purple
    items: [
      {
        id: 'product-dev-flow',
        title: 'The Principles of Product Development Flow',
        author: 'Donald Reinertsen',
        foeRelevance: 'Queueing economics, batch size, WIP cost—arguably the most "FOE-literal" flow book.',
        coverId: 7763174,
        externalUrl: 'https://openlibrary.org/works/OL17530761W',
        type: 'book',
      },
      {
        id: 'making-work-visible',
        title: 'Making Work Visible',
        author: 'Dominica DeGrandis',
        foeRelevance: 'The five thieves of time; visualizing WIP, dependencies, and unplanned work—essential for identifying flow blockers.',
        coverId: 12722418,
        externalUrl: 'https://openlibrary.org/works/OL19727714W',
        type: 'book',
      },
    ],
  },
  {
    id: 'systems-thinking',
    title: 'Systems Thinking + Constraints',
    subtitle: 'Why bottlenecks dominate outcomes',
    color: '#d97706', // Orange/amber - warning/attention
    items: [
      {
        id: 'thinking-in-systems',
        title: 'Thinking in Systems',
        author: 'Donella Meadows',
        foeRelevance: 'Feedback loops, leverage points; helps FOE reason about second-order effects.',
        coverId: 14420637,
        externalUrl: 'https://openlibrary.org/works/OL3737036W',
        type: 'book',
      },
    ],
  },
  {
    id: 'observability-reliability',
    title: 'Observability + Production Confidence',
    subtitle: 'Understanding systems in production',
    color: '#059669', // Green - confidence
    items: [
      {
        id: 'sre-book',
        title: 'Site Reliability Engineering',
        author: 'Betsy Beyer, Chris Jones, Jennifer Petoff & Niall Murphy (Google)',
        foeRelevance: 'Error budgets, toil reduction, operations as engineering—FOE\'s "confidence" pillar in practice.',
        coverId: 9196682,
        externalUrl: 'https://openlibrary.org/works/OL20028554W',
        type: 'book',
      },
      {
        id: 'observability-engineering',
        title: 'Observability Engineering',
        author: 'Charity Majors, Liz Fong-Jones & George Miranda',
        foeRelevance: 'Beyond monitoring to understanding; high-cardinality debugging, production as the ultimate feedback loop.',
        coverId: 12736555,
        externalUrl: 'https://openlibrary.org/works/OL25337316W',
        type: 'book',
      },
      {
        id: 'release-it',
        title: 'Release It! (2nd Edition)',
        author: 'Michael Nygard',
        foeRelevance: 'Stability patterns for production: circuit breakers, bulkheads, timeouts—design patterns that build deployment confidence.',
        coverId: 743624,
        externalUrl: 'https://openlibrary.org/works/OL8848832W',
        type: 'book',
      },
    ],
  },
  {
    id: 'team-org-design',
    title: 'Team + Org Design for Fast Flow',
    subtitle: 'Structure as a performance lever',
    color: '#0ea5e9', // Sky blue
    items: [
      {
        id: 'team-topologies',
        title: 'Team Topologies',
        author: 'Matthew Skelton & Manuel Pais',
        foeRelevance: 'Org shapes that optimize for "fast flow of value" and cognitive load.',
        coverId: 10354937,
        externalUrl: 'https://openlibrary.org/works/OL21232655W',
        type: 'book',
      },
    ],
  },
  {
    id: 'lean-improvement',
    title: 'Lean + Continuous Improvement Rituals',
    subtitle: 'Institutionalizing feedback',
    color: '#1e40af', // Blue - primary
    items: [
      {
        id: 'lean-thinking',
        title: 'Lean Thinking',
        author: 'James Womack & Daniel Jones',
        foeRelevance: 'Waste removal, value streams—directly compatible with FOE\'s "reduce friction" agenda.',
        coverId: 425241,
        externalUrl: 'https://openlibrary.org/works/OL3252234W',
        type: 'book',
      },
      {
        id: 'lean-startup',
        title: 'The Lean Startup',
        author: 'Eric Ries',
        foeRelevance: 'Build-measure-learn loops; complements FOE\'s emphasis on tight learning cycles.',
        coverId: 7104760,
        externalUrl: 'https://openlibrary.org/works/OL16086010W',
        type: 'book',
      },
    ],
  },
];

/**
 * Flat list of all books for search/filter functionality
 */
export const allBooks: BookItem[] = categories.flatMap(cat => cat.items);

/**
 * Total count of items
 */
export const totalItemCount = allBooks.length;
