/**
 * ThreePillars Component
 * 
 * Displays the strategic call-to-action: the three pillars (Genes, People, Process)
 * that represent what the organization will DO about the genome insights.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { THREE_PILLARS, GENES, DOMAINS, getGeneById } from '../genomeData';

interface ThreePillarsProps {
  variant?: 'cards' | 'horizontal' | 'stacked';
  showActions?: boolean;
  showGenes?: boolean;
  linkToStrategy?: boolean;
}

// Inline SVG Icons
const DnaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.icon}
  >
    <path d="M2 15c6.667-6 13.333 0 20-6" />
    <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
    <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
    <path d="M17 6l-2.5-2.5" />
    <path d="M14 8l-1-1" />
    <path d="M7 18l2.5 2.5" />
    <path d="M3.5 14.5l.5.5" />
    <path d="M20 9l.5.5" />
    <path d="M6.5 12.5l1 1" />
    <path d="M16.5 10.5l1 1" />
    <path d="M10 16l-1-1" />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.icon}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.icon}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="14" y2="10" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.checkIcon}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'dna':
      return <DnaIcon />;
    case 'users':
      return <UsersIcon />;
    case 'book':
      return <BookIcon />;
    default:
      return null;
  }
};

const getPillarColorClass = (pillarId: string): string => {
  switch (pillarId) {
    case 'genes':
      return styles.pillarGenes;
    case 'people':
      return styles.pillarPeople;
    case 'process':
      return styles.pillarProcess;
    default:
      return '';
  }
};

function ThreePillars({
  variant = 'cards',
  showActions = false,
  showGenes = false,
  linkToStrategy = false,
}: ThreePillarsProps): React.ReactElement {
  const renderGeneChips = (relatedGenes: string[]) => {
    return (
      <div className={styles.geneChips}>
        {relatedGenes.map((geneId) => {
          const gene = getGeneById(geneId);
          if (!gene) return null;
          const domain = DOMAINS[gene.domain];
          return (
            <span
              key={geneId}
              className={styles.geneChip}
              style={{ borderColor: domain.color, color: domain.color }}
            >
              {gene.name}
            </span>
          );
        })}
      </div>
    );
  };

  const renderActions = (actions: string[]) => {
    return (
      <ul className={styles.actionList}>
        {actions.map((action, index) => (
          <li key={index} className={styles.actionItem}>
            <CheckIcon />
            <span>{action}</span>
          </li>
        ))}
      </ul>
    );
  };

  // Stacked variant - full-width cards stacked vertically
  if (variant === 'stacked') {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>THE WINNING PLAY: THREE STRATEGIC MOVES</h2>
        </div>
        <div className={styles.stackedGrid}>
          {THREE_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className={`${styles.stackedCard} ${getPillarColorClass(pillar.id)}`}
            >
              <div className={styles.stackedCardHeader}>
                <div className={styles.iconWrapper}>
                  {getIconComponent(pillar.icon)}
                </div>
                <div className={styles.stackedCardHeaderText}>
                  <h3 className={styles.pillarName}>{pillar.name.toUpperCase()}</h3>
                  <p className={styles.statement}>{pillar.statement}</p>
                </div>
              </div>
              <p className={styles.description}>{pillar.description}</p>
              {showGenes && pillar.relatedGenes.length > 0 && (
                <div className={styles.genesSection}>
                  <span className={styles.genesLabel}>Related Genes:</span>
                  {renderGeneChips(pillar.relatedGenes)}
                </div>
              )}
              {showActions && renderActions(pillar.actions)}
            </div>
          ))}
        </div>
        {linkToStrategy && (
          <div className={styles.strategyLink}>
            <Link to="/esimplicity-strategy" className={styles.strategyLinkButton}>
              See how FOE addresses these pressures
              <span className={styles.arrow}>&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Horizontal variant - compact row layout
  if (variant === 'horizontal') {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.titleSmall}>THREE STRATEGIC MOVES</h2>
        </div>
        <div className={styles.horizontalGrid}>
          {THREE_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className={`${styles.horizontalCard} ${getPillarColorClass(pillar.id)}`}
            >
              <div className={styles.iconWrapperSmall}>
                {getIconComponent(pillar.icon)}
              </div>
              <div className={styles.horizontalCardContent}>
                <h3 className={styles.pillarNameSmall}>{pillar.name.toUpperCase()}</h3>
                <p className={styles.statementSmall}>{pillar.statement}</p>
              </div>
            </div>
          ))}
        </div>
        {linkToStrategy && (
          <div className={styles.strategyLinkInline}>
            <Link to="/esimplicity-strategy">
              See how FOE addresses these pressures &rarr;
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Cards variant (default) - three column cards with full detail
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>THE WINNING PLAY: THREE STRATEGIC MOVES</h2>
      </div>
      <div className={styles.cardsGrid}>
        {THREE_PILLARS.map((pillar) => (
          <div
            key={pillar.id}
            className={`${styles.card} ${getPillarColorClass(pillar.id)}`}
          >
            <div className={styles.cardTop}>
              <div className={styles.iconWrapper}>
                {getIconComponent(pillar.icon)}
              </div>
              <h3 className={styles.pillarName}>{pillar.name.toUpperCase()}</h3>
            </div>
            <p className={styles.statement}>{pillar.statement}</p>
            <p className={styles.description}>{pillar.description}</p>
            {showGenes && pillar.relatedGenes.length > 0 && (
              <div className={styles.genesSection}>
                <span className={styles.genesLabel}>
                  {pillar.id === 'genes' ? 'The Spine Genes:' : 'Related Genes:'}
                </span>
                {renderGeneChips(pillar.relatedGenes)}
              </div>
            )}
            {showActions && (
              <div className={styles.actionsSection}>
                {renderActions(pillar.actions)}
              </div>
            )}
            {pillar.id === 'process' && linkToStrategy && (
              <div className={styles.cardLink}>
                <Link to="/esimplicity-strategy">
                  FOE Strategy <span className={styles.arrow}>&rarr;</span>
                </Link>
              </div>
            )}
            {pillar.id === 'people' && (
              <div className={styles.speciesNote}>
                <span className={styles.speciesLabel}>Mission</span>
                <span className={styles.speciesArrow}>&harr;</span>
                <span className={styles.speciesLabel}>Enablement</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {linkToStrategy && (
        <div className={styles.strategyLink}>
          <Link to="/esimplicity-strategy" className={styles.strategyLinkButton}>
            See how FOE addresses these pressures
            <span className={styles.arrow}>&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ThreePillars;
export { ThreePillars };
