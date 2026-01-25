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
    ],
  },
  {
    id: 'agile-craftsmanship',
    title: 'Agile Craftsmanship + Code Economics',
    subtitle: 'Keep change cheap',
    color: '#0891b2', // Cyan - matches understanding color
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
    id: 'flow-theory',
    title: 'Flow Theory',
    subtitle: 'Explicitly about flow in product development',
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
    id: 'reliability',
    title: 'Reliability as a First-Class Design Constraint',
    subtitle: 'Confidence at speed',
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
    ],
  },
  {
    id: 'team-org-design',
    title: 'Team + Org Design for Fast Flow',
    subtitle: 'Structure as a performance lever',
    color: '#0891b2', // Cyan - understanding
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
