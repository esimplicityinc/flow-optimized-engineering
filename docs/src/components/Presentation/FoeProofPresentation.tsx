import React from 'react';
import { useReveal } from './useReveal';

// Import styles
import './theme/foe-presentation.css';

// Import slide component
import { FoeProofSlides } from './slides/FoeProofSlides';

interface FoeProofPresentationProps {
  /** Initial slide to start on (e.g., "5" or "2/3" for vertical) */
  startSlide?: string;
  /** Show slide numbers - can be boolean, string format like 'c/t', or special values */
  showSlideNumber?: boolean | string;
  /** Enable hash-based navigation */
  hash?: boolean;
  /** Transition style */
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
}

/**
 * FOE Proof Strategy Presentation Component
 * 
 * A 4-slide executive deck that reframes FOE from broad doctrine into
 * a practical, leadership-friendly proof strategy for Keith.
 */
export function FoeProofPresentation({
  transition = 'slide',
}: FoeProofPresentationProps = {}) {
  const { deckRef } = useReveal({
    transition,
    slideNumber: 'c/t',
    hash: true,
    center: true,
    width: 1920,
    height: 1080,
  });

  return (
    <div 
      className="reveal" 
      ref={deckRef}
      style={{ 
        width: '100vw', 
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <div className="slides">
        <FoeProofSlides />
      </div>
    </div>
  );
}

export default FoeProofPresentation;
