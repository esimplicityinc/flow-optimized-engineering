/**
 * Genome Explorer - Version D: Story-First Narrative
 * 
 * An immersive, scroll-driven storytelling experience that reveals
 * the AI-era engineering evolution through chapters and narrative sections.
 */

import { useState, useEffect, useRef, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import {
  GENES,
  DOMAINS,
  SPECIES_PROFILES,
  EXTINCTION_EVENTS,
  EVOLUTION_PHASES,
  KEY_QUOTES,
  getGenesByDomain,
  type Gene,
  type Domain,
} from '../components/GenomeExplorer/genomeData';
import { PermissionEconomy } from '../components/GenomeExplorer/PermissionEconomy';
import { CircuitVisualization } from '../components/GenomeExplorer/CircuitVisualization';
import { ThreePillars } from '../components/GenomeExplorer/ThreePillars';
import { GovPersonas } from '../components/GenomeExplorer/GovPersonas';
import styles from './genome-explorer-d.module.css';

// ============================================
// SCROLL REVEAL HOOK
// ============================================

function useScrollReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ============================================
// PROGRESS INDICATOR
// ============================================

function ProgressIndicator(): ReactNode {
  const [activeSection, setActiveSection] = useState(0);
  const chapters = [
    { id: 'chapter-old-world', label: 'Old World' },
    { id: 'chapter-shock', label: 'The Shock' },
    { id: 'chapter-permission-economy', label: 'Permission Economy' },
    { id: 'chapter-pressures', label: 'Pressures' },
    { id: 'chapter-genome', label: 'New Genome' },
    { id: 'chapter-enablement-spine', label: 'Enablement Spine' },
    { id: 'chapter-species', label: 'Two Species' },
    { id: 'chapter-ecosystem', label: 'Ecosystem' },
    { id: 'chapter-extinction', label: 'What Dies' },
    { id: 'chapter-winning-play', label: 'Winning Play' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = chapters.map(ch => document.getElementById(ch.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={styles.progressIndicator}>
      {chapters.map((chapter, index) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          className={clsx(
            styles.progressDot,
            index === activeSection && styles.active,
            index < activeSection && styles.passed
          )}
          title={chapter.label}
        >
          <span className={styles.progressLabel}>{chapter.label}</span>
        </a>
      ))}
    </nav>
  );
}

// ============================================
// CHAPTER SECTION COMPONENT
// ============================================

type ChapterTheme = 'dark' | 'light' | 'blue' | 'green' | 'purple' | 'somber';

interface ChapterProps {
  id: string;
  title?: string;
  subtitle?: string;
  theme?: ChapterTheme;
  children: ReactNode;
  fullHeight?: boolean;
}

function ChapterSection({
  id,
  title,
  subtitle,
  theme = 'dark',
  children,
  fullHeight = false,
}: ChapterProps): ReactNode {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      id={id}
      ref={ref}
      className={clsx(
        styles.chapter,
        styles[`theme${theme.charAt(0).toUpperCase()}${theme.slice(1)}`],
        isVisible && styles.visible,
        fullHeight && styles.fullHeight
      )}
    >
      <div className={styles.chapterInner}>
        {(title || subtitle) && (
          <header className={styles.chapterHeader}>
            {subtitle && <span className={styles.chapterSubtitle}>{subtitle}</span>}
            {title && <h2 className={styles.chapterTitle}>{title}</h2>}
          </header>
        )}
        <div className={styles.chapterContent}>{children}</div>
      </div>
    </section>
  );
}

// ============================================
// HERO / PROLOGUE
// ============================================

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.dnaHelix} />
      </div>
      <div className={styles.heroContent}>
        <span className={styles.badge}>The AI-Era Engineering Genome</span>
        <h1 className={styles.heroTitle}>
          What Gets<br />Selected Now
        </h1>
        <p className={styles.heroSubtitle}>
          A story of evolutionary pressure, adaptation, and the new traits<br />
          that define engineering excellence in the age of AI
        </p>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Scroll to begin</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

// ============================================
// CHAPTER 1: THE OLD WORLD
// ============================================

function OldWorldChapter(): ReactNode {
  const traits = [
    { trait: 'Syntax Tolerance', desc: 'Patience for rigid rules and delayed feedback' },
    { trait: 'Solo Throughput', desc: 'Deep work, minimal coordination, "leave me alone"' },
    { trait: 'Precision over Persuasion', desc: 'Being right mattered more than being aligned' },
    { trait: 'Optimization Mindset', desc: 'Elegance, reduction, correctness' },
  ];

  return (
    <ChapterSection
      id="chapter-old-world"
      title="The Old World"
      subtitle="Chapter 1"
      theme="dark"
      fullHeight
    >
      <div className={styles.quoteBlock}>
        <blockquote>
          "For ~40 years, software rewarded a very specific combo of traits..."
        </blockquote>
      </div>

      <div className={styles.oldWorldTraits}>
        {traits.map((item, index) => (
          <RevealItem key={item.trait} delay={index * 150}>
            <div className={styles.traitCard}>
              <h4>{item.trait}</h4>
              <p>{item.desc}</p>
            </div>
          </RevealItem>
        ))}
      </div>

      <RevealItem delay={700}>
        <div className={styles.insightBox}>
          <p>
            <strong>You won by being a high-trust compiler:</strong> hold large systems
            in your head, be careful and consistent, grind through ambiguity until it
            becomes implementation.
          </p>
        </div>
      </RevealItem>
    </ChapterSection>
  );
}

// ============================================
// CHAPTER 2: THE SHOCK
// ============================================

function ShockChapter(): ReactNode {
  const becameCheap = [
    'Implementation volume',
    'Variants and rewrites',
    'Boilerplate and glue code',
    '"Good-looking" output',
  ];

  const becameExpensive = [
    'Correctness under ambiguity',
    'Taste and judgment',
    'Specification clarity',
    'Proof and evidence',
    'Alignment speed',
  ];

  return (
    <ChapterSection
      id="chapter-shock"
      title="The Environmental Shock"
      subtitle="Chapter 2"
      theme="light"
      fullHeight
    >
      <div className={styles.shockHeadline}>
        <RevealItem>
          <h3>AI flips the constraint</h3>
        </RevealItem>
      </div>

      <div className={styles.shockComparison}>
        <RevealItem delay={200}>
          <div className={styles.shockColumn}>
            <div className={styles.shockColumnHeader}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" />
              </svg>
              <span>What became cheap</span>
            </div>
            <ul>
              {becameCheap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </RevealItem>

        <div className={styles.shockDivider}>
          <div className={styles.shockDividerLine} />
          <span className={styles.shockDividerIcon}>AI</span>
          <div className={styles.shockDividerLine} />
        </div>

        <RevealItem delay={400}>
          <div className={clsx(styles.shockColumn, styles.expensive)}>
            <div className={styles.shockColumnHeader}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
              <span>What became expensive</span>
            </div>
            <ul>
              {becameExpensive.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </RevealItem>
      </div>

      <RevealItem delay={600}>
        <div className={styles.quoteBlockAlt}>
          <blockquote>
            "AI is a mutation amplifier: it increases both capability and risk.
            When 'typing the code' gets cheap, the scarce resource becomes
            taste + judgment + direction + alignment."
          </blockquote>
        </div>
      </RevealItem>
    </ChapterSection>
  );
}

// ============================================
// CHAPTER: THE PERMISSION ECONOMY (NEW)
// ============================================

function PermissionEconomyChapter(): ReactNode {
  return (
    <ChapterSection
      id="chapter-permission-economy"
      title="The Permission Economy"
      subtitle="The New Constraint"
      theme="dark"
      fullHeight
    >
      <RevealItem>
        <PermissionEconomy variant="hero" showSpineSkin={false} />
      </RevealItem>

      <RevealItem delay={200}>
        <div className={styles.chapterQuote}>
          <blockquote>
            "Government doesn't reward speed. It rewards assurance."
          </blockquote>
        </div>
      </RevealItem>

      <RevealItem delay={400}>
        <div className={styles.paradoxFlow}>
          <div className={styles.paradoxStep}>AI raises speed</div>
          <div className={styles.paradoxArrow}>→</div>
          <div className={styles.paradoxStep}>That raises risk</div>
          <div className={styles.paradoxArrow}>→</div>
          <div className={styles.paradoxStep}>Permission becomes the bottleneck</div>
        </div>
      </RevealItem>
    </ChapterSection>
  );
}

// ============================================
// CHAPTER 3: THE PRESSURES
// ============================================

function PressuresChapter(): ReactNode {
  const pressures = [
    {
      name: 'The Spec Gap',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M12 11v6M9 14h6" />
        </svg>
      ),
      description:
        'When output is easy, the main failure mode becomes "we built the wrong thing fast."',
      color: '#3B82F6',
    },
    {
      name: 'Drift & Entropy',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
          <path d="M8 8l8 8M8 16l8-8" opacity="0.5" />
        </svg>
      ),
      description:
        'AI increases throughput, which increases architectural entropy unless constrained.',
      color: '#F59E0B',
    },
    {
      name: 'Evidence as Currency',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description:
        'Risk owners, auditors, and engineers stop trusting fluent output. Receipts matter.',
      color: '#10B981',
    },
  ];

  return (
    <ChapterSection
      id="chapter-pressures"
      title="Evolutionary Pressures"
      subtitle="Chapter 3"
      theme="dark"
    >
      <p className={styles.pressuresIntro}>
        Three forces reshaping the engineering landscape
      </p>

      <div className={styles.pressuresGrid}>
        {pressures.map((pressure, index) => (
          <RevealItem key={pressure.name} delay={index * 200}>
            <div
              className={styles.pressureCard}
              style={{ '--pressure-color': pressure.color } as React.CSSProperties}
            >
              <div className={styles.pressureIcon}>{pressure.icon}</div>
              <h4>{pressure.name}</h4>
              <p>{pressure.description}</p>
            </div>
          </RevealItem>
        ))}
      </div>

      <RevealItem delay={700}>
        <div className={styles.pressureInsight}>
          <p>
            The bottleneck moved from <strong>production</strong> to{' '}
            <strong>selection</strong> to <strong>coordination</strong> to{' '}
            <strong>trust/evidence</strong>.
          </p>
        </div>
      </RevealItem>
    </ChapterSection>
  );
}

// ============================================
// CHAPTER 4: THE NEW GENOME
// ============================================

function GenomeChapter(): ReactNode {
  const [selectedGene, setSelectedGene] = useState<Gene | null>(null);

  const domains: { domain: Domain; theme: 'blue' | 'green' | 'purple' }[] = [
    { domain: 'product', theme: 'blue' },
    { domain: 'education', theme: 'green' },
    { domain: 'systems', theme: 'purple' },
  ];

  return (
    <ChapterSection
      id="chapter-genome"
      title="The New Genome"
      subtitle="Chapter 4"
      theme="dark"
    >
      <p className={styles.genomeIntro}>
        12 capability genes across 3 domains define the AI-era engineer
      </p>

      {domains.map(({ domain, theme }, domainIndex) => (
        <DomainSection
          key={domain}
          domain={domain}
          theme={theme}
          delay={domainIndex * 300}
          onGeneSelect={setSelectedGene}
        />
      ))}

      {selectedGene && (
        <GeneModal gene={selectedGene} onClose={() => setSelectedGene(null)} />
      )}
    </ChapterSection>
  );
}

interface DomainSectionProps {
  domain: Domain;
  theme: 'blue' | 'green' | 'purple';
  delay: number;
  onGeneSelect: (gene: Gene) => void;
}

function DomainSection({ domain, theme, delay, onGeneSelect }: DomainSectionProps): ReactNode {
  const domainGenes = getGenesByDomain(domain);
  const domainInfo = DOMAINS[domain];

  return (
    <RevealItem delay={delay}>
      <div className={clsx(styles.domainSection, styles[`domain${theme.charAt(0).toUpperCase()}${theme.slice(1)}`])}>
        <div className={styles.domainHeader}>
          <div
            className={styles.domainBadge}
            style={{ '--domain-color': domainInfo.color } as React.CSSProperties}
          >
            {domainInfo.name}
          </div>
          <p className={styles.domainDesc}>{domainInfo.description}</p>
        </div>

        <div className={styles.geneGrid}>
          {domainGenes.map((gene, index) => (
            <button
              key={gene.id}
              className={styles.geneCard}
              onClick={() => onGeneSelect(gene)}
              style={
                {
                  '--gene-color': domainInfo.color,
                  animationDelay: `${delay + index * 100}ms`,
                } as React.CSSProperties
              }
            >
              <h5>{gene.name}</h5>
              <p>{gene.definition}</p>
              <span className={styles.geneHint}>Click to explore</span>
            </button>
          ))}
        </div>
      </div>
    </RevealItem>
  );
}

// ============================================
// GENE MODAL
// ============================================

interface GeneModalProps {
  gene: Gene;
  onClose: () => void;
}

function GeneModal({ gene, onClose }: GeneModalProps): ReactNode {
  const domainInfo = DOMAINS[gene.domain];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{ '--modal-color': domainInfo.color } as React.CSSProperties}
      >
        <button className={styles.modalClose} onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.modalDomain}>{domainInfo.name}</span>
          <h3>{gene.name}</h3>
          <p className={styles.modalDefinition}>{gene.definition}</p>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.thenNow}>
            <div className={styles.thenColumn}>
              <h4>Then</h4>
              <p>{gene.thenExpression}</p>
            </div>
            <div className={styles.nowColumn}>
              <h4>Now</h4>
              <p>{gene.nowExpression}</p>
            </div>
          </div>

          <div className={styles.modalQuestion}>
            <h4>Key Question</h4>
            <p>"{gene.keyQuestion}"</p>
          </div>

          <div className={styles.modalExamples}>
            <h4>Examples</h4>
            <ul>
              {gene.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Link
            to={`/docs/strategy/${gene.strategySection.id}`}
            className={styles.modalLink}
          >
            Read more in Strategy Section {gene.strategySection.number}:{' '}
            {gene.strategySection.title}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CHAPTER: THE ENABLEMENT SPINE (NEW)
// ============================================

function EnablementSpineChapter(): ReactNode {
  return (
    <ChapterSection
      id="chapter-enablement-spine"
      title="The Enablement Spine"
      subtitle="Systems Genes"
      theme="purple"
      fullHeight
    >
      <RevealItem>
        <p className={styles.chapterLead}>
          The Systems genes form the <strong>enablement spine</strong> that converts
          AI capacity into auditable delivery.
        </p>
      </RevealItem>

      <RevealItem delay={200}>
        <div className={styles.spineGenes}>
          <div className={styles.spineGene}>Constraints</div>
          <div className={styles.spineGene}>Verification</div>
          <div className={styles.spineGene}>Operability</div>
          <div className={styles.spineGene}>Governance</div>
        </div>
      </RevealItem>

      <RevealItem delay={400}>
        <CircuitVisualization variant="simplified" interactive={false} />
      </RevealItem>
    </ChapterSection>
  );
}

// ============================================
// CHAPTER 5: TWO SPECIES
// ============================================

function SpeciesChapter(): ReactNode {
  const mission = SPECIES_PROFILES[0];
  const enablement = SPECIES_PROFILES[1];

  return (
    <ChapterSection
      id="chapter-species"
      title="Two Species Emerge"
      subtitle="Chapter 5"
      theme="light"
    >
      <div className={styles.speciesIntro}>
        <RevealItem>
          <p>
            The genome expresses differently based on who you serve.
            Two distinct species emerge from the same evolutionary pressure.
          </p>
        </RevealItem>
      </div>

      <div className={styles.speciesSplit}>
        <RevealItem delay={200}>
          <div className={clsx(styles.speciesCard, styles.missionCard)}>
            <div className={styles.speciesHeader}>
              <span className={styles.speciesIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                  <path d="M13 13l6 6" />
                </svg>
              </span>
              <h3>{mission.name}</h3>
              <span className={styles.speciesSubtitle}>{mission.subtitle}</span>
            </div>

            <div className={styles.speciesBody}>
              <div className={styles.speciesField}>
                <label>Customer</label>
                <p>{mission.customer}</p>
              </div>
              <div className={styles.speciesField}>
                <label>Work Product</label>
                <p>{mission.workProduct}</p>
              </div>
              <div className={styles.speciesField}>
                <label>Core Stance</label>
                <p>"{mission.coreStance}"</p>
              </div>
              <div className={styles.speciesField}>
                <label>Fitness Function</label>
                <p>{mission.fitnessFunction}</p>
              </div>
            </div>

            <div className={styles.speciesGenes}>
              <span className={styles.speciesGenesLabel}>Primary Genes</span>
              <div className={styles.speciesGeneTags}>
                {mission.requiredGenes.slice(0, 4).map((geneId) => {
                  const gene = GENES.find((g) => g.id === geneId);
                  return gene ? (
                    <span key={geneId} className={styles.geneTag}>
                      {gene.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </RevealItem>

        <div className={styles.speciesDivider}>
          <div className={styles.speciesDividerContent}>
            <span>Symbiosis</span>
            <p>They need each other</p>
          </div>
        </div>

        <RevealItem delay={400}>
          <div className={clsx(styles.speciesCard, styles.enablementCard)}>
            <div className={styles.speciesHeader}>
              <span className={styles.speciesIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </span>
              <h3>{enablement.name}</h3>
              <span className={styles.speciesSubtitle}>{enablement.subtitle}</span>
            </div>

            <div className={styles.speciesBody}>
              <div className={styles.speciesField}>
                <label>Customer</label>
                <p>{enablement.customer}</p>
              </div>
              <div className={styles.speciesField}>
                <label>Work Product</label>
                <p>{enablement.workProduct}</p>
              </div>
              <div className={styles.speciesField}>
                <label>Core Stance</label>
                <p>"{enablement.coreStance}"</p>
              </div>
              <div className={styles.speciesField}>
                <label>Fitness Function</label>
                <p>{enablement.fitnessFunction}</p>
              </div>
            </div>

            <div className={styles.speciesGenes}>
              <span className={styles.speciesGenesLabel}>Primary Genes</span>
              <div className={styles.speciesGeneTags}>
                {enablement.requiredGenes.slice(0, 4).map((geneId) => {
                  const gene = GENES.find((g) => g.id === geneId);
                  return gene ? (
                    <span key={geneId} className={styles.geneTag}>
                      {gene.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </RevealItem>
      </div>

      <RevealItem delay={600}>
        <div className={styles.speciesQuote}>
          <blockquote>
            "Mission teams own decisions that change business behavior.
            Enablement teams own decisions that change the cost/risk of change itself."
          </blockquote>
        </div>
      </RevealItem>
    </ChapterSection>
  );
}

// ============================================
// CHAPTER: THE ECOSYSTEM (NEW)
// ============================================

function EcosystemChapter(): ReactNode {
  return (
    <ChapterSection
      id="chapter-ecosystem"
      title="The Permission Ecosystem"
      subtitle="Symbiosis"
      theme="light"
    >
      <RevealItem>
        <p className={styles.chapterLead}>
          In the permission economy, demand flows from government to vendor,
          and permission flows back through evidence.
        </p>
      </RevealItem>

      <RevealItem delay={200}>
        <GovPersonas variant="ecosystem" side="both" />
      </RevealItem>

      <RevealItem delay={400}>
        <div className={styles.keyExchange}>
          <strong>The Critical Exchange:</strong> Risk Owners consume PROOF.
          Enablement Hybrids produce EVIDENCE.
        </div>
      </RevealItem>
    </ChapterSection>
  );
}

// ============================================
// CHAPTER 6: WHAT DIES
// ============================================

function ExtinctionChapter(): ReactNode {
  return (
    <ChapterSection
      id="chapter-extinction"
      title="What Dies"
      subtitle="Chapter 6"
      theme="somber"
    >
      <div className={styles.extinctionIntro}>
        <RevealItem>
          <p>
            Not all traits survive the transition. Some become maladaptive—
            selected against by the new environment.
          </p>
        </RevealItem>
      </div>

      <div className={styles.extinctionGrid}>
        {EXTINCTION_EVENTS.map((event, index) => (
          <RevealItem key={event.id} delay={index * 250}>
            <div className={styles.extinctionCard}>
              <div className={styles.extinctionMarker}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20" opacity="0.3" />
                  <circle cx="12" cy="12" r="8" />
                  <path d="M15 9l-6 6M9 9l6 6" />
                </svg>
              </div>
              <h4>{event.name}</h4>
              <p className={styles.extinctionDesc}>{event.description}</p>
              <div className={styles.extinctionWhy}>
                <span>Why it dies:</span>
                <p>{event.whyItDies}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </div>

      <RevealItem delay={800}>
        <div className={styles.extinctionClose}>
          <p>
            These aren't bad people. They're good people with traits
            that were adaptive in a different environment.
          </p>
        </div>
      </RevealItem>
    </ChapterSection>
  );
}

// ============================================
// CHAPTER: THE WINNING PLAY (replaces Epilogue)
// ============================================

function WinningPlayChapter(): ReactNode {
  return (
    <ChapterSection
      id="chapter-winning-play"
      title="The Winning Play"
      subtitle="Strategic Advantage"
      theme="dark"
      fullHeight
    >
      <RevealItem>
        <p className={styles.chapterLead}>
          Three strategic moves to convert AI capacity into competitive advantage.
        </p>
      </RevealItem>

      <RevealItem delay={200}>
        <ThreePillars
          variant="stacked"
          showActions={true}
          showGenes={true}
          linkToStrategy={true}
        />
      </RevealItem>

      <RevealItem delay={500}>
        <div className={styles.epilogueCTA}>
          <h3>This is what FOE is built to address.</h3>
          <p>
            Flow Optimized Engineering provides the practices, tools, and cultural
            patterns to thrive in the permission economy.
          </p>
          <div className={styles.epilogueButtons}>
            <Link to="/docs/intro/what-is-foe" className={styles.primaryButton}>
              Explore the Strategy
            </Link>
            <Link to="/docs/maturity-model/self-assessment" className={styles.secondaryButton}>
              Assess Your Team
            </Link>
          </div>
        </div>
      </RevealItem>
    </ChapterSection>
  );
}

// ============================================
// REVEAL ITEM COMPONENT
// ============================================

interface RevealItemProps {
  children: ReactNode;
  delay?: number;
}

function RevealItem({ children, delay = 0 }: RevealItemProps): ReactNode {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={clsx(styles.revealItem, isVisible && styles.revealed)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function GenomeExplorerD(): ReactNode {
  useEffect(() => {
    document.documentElement.classList.add('hide-navbar');
    return () => {
      document.documentElement.classList.remove('hide-navbar');
    };
  }, []);

  return (
    <Layout
      title="AI-Era Engineering Genome"
      description="Explore the evolutionary pressures reshaping engineering roles in the age of AI"
    >
      <Head>
        <style>{`
          .navbar { display: none !important; }
          .main-wrapper { padding-top: 0 !important; }
          html { scroll-behavior: smooth; }
        `}</style>
      </Head>
      <main className={styles.narrative}>
        <ProgressIndicator />
        <HeroSection />
        <OldWorldChapter />
        <ShockChapter />
        <PermissionEconomyChapter />
        <PressuresChapter />
        <GenomeChapter />
        <EnablementSpineChapter />
        <SpeciesChapter />
        <EcosystemChapter />
        <ExtinctionChapter />
        <WinningPlayChapter />
      </main>
    </Layout>
  );
}
