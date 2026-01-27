/**
 * GovPersonas Component
 *
 * Displays the government ecosystem personas (both demand and supply sides)
 * showing who participates in the permission economy and what they exchange.
 */

import React, { useState } from 'react';
import styles from './styles.module.css';
import { GOV_PERSONAS, getPersonasBySide, type GovPersona } from '../genomeData';

interface GovPersonasProps {
  variant?: 'ecosystem' | 'cards' | 'flow';
  side?: 'demand' | 'supply' | 'both';
  highlightPersona?: string;
  onPersonaClick?: (persona: GovPersona) => void;
}

// Icon components using inline SVG
const Icons: Record<string, React.ReactElement> = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  'file-contract': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  cog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
};

function PersonaCard({
  persona,
  isHighlighted,
  onClick,
  showDetails = false,
}: {
  persona: GovPersona;
  isHighlighted: boolean;
  onClick?: () => void;
  showDetails?: boolean;
}): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(showDetails);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onClick?.();
  };

  const sideClass = persona.side === 'demand' ? styles.demandSide : styles.supplySide;

  return (
    <div
      className={`${styles.personaCard} ${sideClass} ${isHighlighted ? styles.highlighted : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className={styles.personaHeader}>
        <div className={styles.personaIcon}>{Icons[persona.icon]}</div>
        <h4 className={styles.personaName}>{persona.name}</h4>
      </div>

      {(isExpanded || showDetails) && (
        <p className={styles.personaDescription}>{persona.description}</p>
      )}

      <div className={styles.personaExchange}>
        {persona.consumes && persona.consumes.length > 0 && (
          <div className={styles.consumesList}>
            <span className={styles.exchangeLabel}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                <path d="M12 4l-8 8h6v8h4v-8h6z" />
              </svg>
              Consumes
            </span>
            <ul>
              {persona.consumes.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {persona.emits && persona.emits.length > 0 && (
          <div className={styles.emitsList}>
            <span className={styles.exchangeLabel}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                <path d="M12 20l8-8h-6V4h-4v8H4z" />
              </svg>
              Emits
            </span>
            <ul>
              {persona.emits.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {persona.produces && persona.produces.length > 0 && (
          <div className={styles.producesList}>
            <span className={styles.exchangeLabel}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                <path d="M12 20l8-8h-6V4h-4v8H4z" />
              </svg>
              Produces
            </span>
            <ul>
              {persona.produces.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function EcosystemVariant({
  highlightPersona,
  onPersonaClick,
}: {
  highlightPersona?: string;
  onPersonaClick?: (persona: GovPersona) => void;
}): React.ReactElement {
  const demandPersonas = getPersonasBySide('demand');
  const supplyPersonas = getPersonasBySide('supply');

  return (
    <div className={styles.ecosystemContainer}>
      <h2 className={styles.ecosystemTitle}>THE PERMISSION ECOSYSTEM</h2>

      <div className={styles.ecosystemGrid}>
        {/* Demand Side */}
        <div className={styles.sideColumn}>
          <div className={styles.sideHeader}>
            <h3 className={styles.sideTitle}>DEMAND SIDE</h3>
            <span className={styles.sideSubtitle}>Government</span>
          </div>
          <div className={styles.personaList}>
            {demandPersonas.map((persona) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                isHighlighted={highlightPersona === persona.id}
                onClick={() => onPersonaClick?.(persona)}
              />
            ))}
          </div>
        </div>

        {/* Flow Arrows */}
        <div className={styles.flowArrows}>
          <div className={styles.flowArrow}>
            <span className={styles.flowLabel}>proof</span>
            <div className={styles.arrowLine}>
              <div className={styles.arrowDash}></div>
            </div>
            <span className={styles.flowLabel}>permission</span>
          </div>
          <div className={styles.flowArrow}>
            <span className={styles.flowLabel}>outcomes</span>
            <div className={styles.arrowLine}>
              <div className={styles.arrowDash}></div>
            </div>
            <span className={styles.flowLabel}>urgency</span>
          </div>
          <div className={styles.flowArrow}>
            <span className={styles.flowLabel}>evidence</span>
            <div className={styles.arrowLine}>
              <div className={styles.arrowDash}></div>
            </div>
            <span className={styles.flowLabel}>trust</span>
          </div>
        </div>

        {/* Supply Side */}
        <div className={styles.sideColumn}>
          <div className={styles.sideHeader}>
            <h3 className={styles.sideTitle}>SUPPLY SIDE</h3>
            <span className={styles.sideSubtitle}>Vendor</span>
          </div>
          <div className={styles.personaList}>
            {supplyPersonas.map((persona) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                isHighlighted={highlightPersona === persona.id}
                onClick={() => onPersonaClick?.(persona)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className={styles.keyInsight}>
        <div className={styles.insightLine}></div>
        <div className={styles.insightContent}>
          <span className={styles.insightLabel}>KEY INSIGHT</span>
          <p className={styles.insightText}>
            Risk Owners consume <span className={styles.highlight}>PROOF</span>. Enablement Hybrids
            produce <span className={styles.highlight}>EVIDENCE</span>. This is the critical
            exchange.
          </p>
        </div>
        <div className={styles.insightLine}></div>
      </div>
    </div>
  );
}

function CardsVariant({
  side = 'both',
  highlightPersona,
  onPersonaClick,
}: {
  side?: 'demand' | 'supply' | 'both';
  highlightPersona?: string;
  onPersonaClick?: (persona: GovPersona) => void;
}): React.ReactElement {
  const personas =
    side === 'both'
      ? GOV_PERSONAS
      : side === 'demand'
        ? getPersonasBySide('demand')
        : getPersonasBySide('supply');

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cardsGrid}>
        {personas.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            isHighlighted={highlightPersona === persona.id}
            onClick={() => onPersonaClick?.(persona)}
            showDetails
          />
        ))}
      </div>
    </div>
  );
}

function FlowVariant({
  highlightPersona,
  onPersonaClick,
}: {
  highlightPersona?: string;
  onPersonaClick?: (persona: GovPersona) => void;
}): React.ReactElement {
  const demandPersonas = getPersonasBySide('demand');
  const supplyPersonas = getPersonasBySide('supply');

  return (
    <div className={styles.flowContainer}>
      <h2 className={styles.flowTitle}>PERMISSION ECONOMY FLOWS</h2>

      <div className={styles.sankeyDiagram}>
        {/* Supply Side Column */}
        <div className={styles.flowColumn}>
          <h4 className={styles.flowColumnTitle}>Supply (Vendor)</h4>
          {supplyPersonas.map((persona, idx) => (
            <div
              key={persona.id}
              className={`${styles.flowNode} ${styles.supplyNode} ${highlightPersona === persona.id ? styles.highlighted : ''}`}
              onClick={() => onPersonaClick?.(persona)}
              style={{ '--flow-index': idx } as React.CSSProperties}
            >
              <div className={styles.flowNodeIcon}>{Icons[persona.icon]}</div>
              <span className={styles.flowNodeName}>{persona.name}</span>
            </div>
          ))}
        </div>

        {/* Flow Paths */}
        <div className={styles.flowPaths}>
          <svg viewBox="0 0 200 400" preserveAspectRatio="none" className={styles.flowSvg}>
            {/* Animated flow paths */}
            <path
              d="M0,50 C100,50 100,100 200,100"
              className={styles.flowPath}
              style={{ '--path-delay': '0s' } as React.CSSProperties}
            />
            <path
              d="M0,50 C100,50 100,200 200,200"
              className={styles.flowPath}
              style={{ '--path-delay': '0.5s' } as React.CSSProperties}
            />
            <path
              d="M0,150 C100,150 100,100 200,100"
              className={styles.flowPath}
              style={{ '--path-delay': '1s' } as React.CSSProperties}
            />
            <path
              d="M0,150 C100,150 100,300 200,300"
              className={styles.flowPath}
              style={{ '--path-delay': '1.5s' } as React.CSSProperties}
            />
            <path
              d="M0,250 C100,250 100,200 200,200"
              className={styles.flowPath}
              style={{ '--path-delay': '2s' } as React.CSSProperties}
            />
          </svg>

          {/* Flow Labels */}
          <div className={styles.flowLabelsContainer}>
            <span className={styles.flowResourceLabel} style={{ top: '20%' }}>
              intent
            </span>
            <span className={styles.flowResourceLabel} style={{ top: '40%' }}>
              evidence
            </span>
            <span className={styles.flowResourceLabel} style={{ top: '60%' }}>
              guardrails
            </span>
            <span className={styles.flowResourceLabel} style={{ top: '80%' }}>
              artifacts
            </span>
          </div>
        </div>

        {/* Demand Side Column */}
        <div className={styles.flowColumn}>
          <h4 className={styles.flowColumnTitle}>Demand (Government)</h4>
          {demandPersonas.map((persona, idx) => (
            <div
              key={persona.id}
              className={`${styles.flowNode} ${styles.demandNode} ${highlightPersona === persona.id ? styles.highlighted : ''}`}
              onClick={() => onPersonaClick?.(persona)}
              style={{ '--flow-index': idx } as React.CSSProperties}
            >
              <div className={styles.flowNodeIcon}>{Icons[persona.icon]}</div>
              <span className={styles.flowNodeName}>{persona.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insight */}
      <div className={styles.keyInsight}>
        <div className={styles.insightLine}></div>
        <div className={styles.insightContent}>
          <span className={styles.insightLabel}>KEY INSIGHT</span>
          <p className={styles.insightText}>
            Risk Owners consume <span className={styles.highlight}>PROOF</span>. Enablement Hybrids
            produce <span className={styles.highlight}>EVIDENCE</span>. This is the critical
            exchange.
          </p>
        </div>
        <div className={styles.insightLine}></div>
      </div>
    </div>
  );
}

function GovPersonas({
  variant = 'ecosystem',
  side = 'both',
  highlightPersona,
  onPersonaClick,
}: GovPersonasProps): React.ReactElement {
  if (variant === 'cards') {
    return (
      <CardsVariant
        side={side}
        highlightPersona={highlightPersona}
        onPersonaClick={onPersonaClick}
      />
    );
  }

  if (variant === 'flow') {
    return <FlowVariant highlightPersona={highlightPersona} onPersonaClick={onPersonaClick} />;
  }

  // Default: ecosystem
  return <EcosystemVariant highlightPersona={highlightPersona} onPersonaClick={onPersonaClick} />;
}

export default GovPersonas;
export { GovPersonas };
export type { GovPersonasProps };
