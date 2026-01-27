/**
 * PermissionEconomy Component
 * 
 * Displays the "Permission Economy" thesis - the central framing for why
 * the genome matters in government contexts.
 */

import React from 'react';
import styles from './styles.module.css';
import { PERMISSION_ECONOMY, SPINE_SKIN, GOVCON_QUOTES } from '../genomeData';

interface PermissionEconomyProps {
  variant?: 'full' | 'compact' | 'hero';
  showSpineSkin?: boolean;
}

function PermissionEconomy({ 
  variant = 'full', 
  showSpineSkin = true 
}: PermissionEconomyProps): React.ReactElement {
  const coreQuote = GOVCON_QUOTES[0]; // "Government is a permission economy..."

  if (variant === 'compact') {
    return (
      <div className={styles.compact}>
        <blockquote className={styles.compactQuote}>
          <span className={styles.quoteMarks}>"</span>
          {PERMISSION_ECONOMY.coreInsight}
          <span className={styles.quoteMarks}>"</span>
        </blockquote>
        <div className={styles.compactWinningPlay}>
          <strong>The Winning Play:</strong> {PERMISSION_ECONOMY.winningPlay}
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>THE PERMISSION ECONOMY</h2>
          <blockquote className={styles.heroQuote}>
            <span className={styles.heroQuoteMarks}>"</span>
            <span className={styles.heroQuoteText}>
              Government is a permission economy.
              <br />
              We don't get rewarded for speed.
              <br />
              We get rewarded for <span className={styles.highlight}>assurance</span>.
            </span>
            <span className={styles.heroQuoteMarks}>"</span>
          </blockquote>
          
          <div className={styles.heroParadox}>
            <div className={styles.heroParadoxBox}>
              <span className={styles.heroParadoxLabel}>AI raises</span>
              <span className={styles.heroParadoxValue}>SPEED</span>
            </div>
            <div className={styles.heroArrow}>
              <span className={styles.arrowLine}></span>
              <span className={styles.arrowHead}></span>
            </div>
            <div className={`${styles.heroParadoxBox} ${styles.heroParadoxBoxWarning}`}>
              <span className={styles.heroParadoxLabel}>That raises</span>
              <span className={styles.heroParadoxValue}>RISK</span>
            </div>
          </div>

          <div className={styles.heroWinningPlay}>
            <span className={styles.heroWinningPlayLabel}>The Winning Play</span>
            <p className={styles.heroWinningPlayText}>
              Build an enablement spine that turns AI capacity into <span className={styles.highlight}>auditable delivery</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>THE PERMISSION ECONOMY</h2>
      
      {/* Core Quote */}
      <blockquote className={styles.coreQuote}>
        <span className={styles.quoteMarks}>"</span>
        <span className={styles.quoteText}>
          Government is a permission economy.
          <br />
          We don't get rewarded for speed.
          <br />
          We get rewarded for <span className={styles.highlight}>assurance</span>.
        </span>
        <span className={styles.quoteMarks}>"</span>
      </blockquote>

      {/* AI Paradox */}
      <div className={styles.paradoxSection}>
        <h3 className={styles.sectionTitle}>THE AI PARADOX</h3>
        <div className={styles.paradoxFlow}>
          <div className={styles.paradoxBox}>
            <span className={styles.paradoxLabel}>AI raises</span>
            <span className={styles.paradoxValue}>speed</span>
          </div>
          <div className={styles.paradoxArrow}>
            <span className={styles.arrowLine}></span>
            <span className={styles.arrowHead}></span>
          </div>
          <div className={`${styles.paradoxBox} ${styles.paradoxBoxWarning}`}>
            <span className={styles.paradoxLabel}>That raises</span>
            <span className={styles.paradoxValue}>risk</span>
          </div>
        </div>
        <div className={styles.paradoxConclusion}>
          <p>
            Agencies only accept AI delivery with{' '}
            <span className={styles.highlightAccent}>LEGIBILITY</span> and{' '}
            <span className={styles.highlightAccent}>EVIDENCE</span> by default
          </p>
        </div>
      </div>

      {/* Winning Play */}
      <div className={styles.winningPlaySection}>
        <h3 className={styles.sectionTitle}>THE WINNING PLAY</h3>
        <p className={styles.winningPlayQuote}>
          "{PERMISSION_ECONOMY.winningPlay}"
        </p>
      </div>

      {/* Spine/Skin Model */}
      {showSpineSkin && (
        <div className={styles.spineSkinSection}>
          <div className={styles.spineBox}>
            <div className={styles.spineHeader}>
              <span className={styles.spineLabel}>SPINE</span>
              <span className={styles.spineSubtitle}>What gov always pays for</span>
            </div>
            <ul className={styles.spineList}>
              {SPINE_SKIN.spine.elements.map((element, index) => (
                <li key={index} className={styles.spineItem}>
                  {element}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.skinFlip}>
            <div className={styles.skinFlipHeader}>
              <span className={styles.skinFlipLabel}>SKIN FLIP</span>
              <span className={styles.skinFlipSubtitle}>Services → Products</span>
            </div>
            <div className={styles.skinFlipContent}>
              <div className={styles.skinEra}>
                <span className={styles.skinEraLabel}>Pre-AI:</span>
                <span className={styles.skinEraText}>Humans do assurance</span>
              </div>
              <div className={`${styles.skinEra} ${styles.skinEraNew}`}>
                <span className={styles.skinEraLabel}>Post-AI:</span>
                <span className={styles.skinEraText}>Systems do assurance</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PermissionEconomy;
export { PermissionEconomy };
