import React, { useEffect, useRef, useState } from 'react';
import Reveal from 'reveal.js';

// Import styles
import './theme/foe-presentation.css';

// Import slide components
import { Level1Slides } from './slides/Level1Slides';
import { Level2Slides } from './slides/Level2Slides';
import { Level3Slides } from './slides/Level3Slides';
import { Level4Slides } from './slides/Level4Slides';
import { Level5Slides } from './slides/Level5Slides';

interface PresentationProps {
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
 * FOE Presentation Component
 * 
 * A 40-slide presentation explaining Flow Optimized Engineering
 * at progressively deeper levels for executive audiences.
 */
export function Presentation({
  startSlide,
  showSlideNumber = 'c/t',
  hash = true,
  transition = 'slide',
}: PresentationProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<Reveal.Api | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Prevent double initialization
    if (!deckRef.current || revealRef.current) return;

    revealRef.current = new Reveal(deckRef.current, {
      // Display and Layout
      width: 1920,
      height: 1080,
      margin: 0.04,
      minScale: 0.2,
      maxScale: 2.0,
      center: true,
      
      // Navigation and Controls
      controls: true,
      controlsLayout: 'bottom-right',
      controlsBackArrows: 'faded',
      progress: true,
      slideNumber: showSlideNumber,
      hash: hash,
      keyboard: true,
      touch: true,
      loop: false,
      navigationMode: 'default',
      
      // Transitions and Animation
      transition: transition,
      transitionSpeed: 'default',
      backgroundTransition: 'fade',
      autoAnimate: true,
      autoAnimateDuration: 0.8,
      autoAnimateEasing: 'ease',
      
      // Fragments
      fragments: true,
      fragmentInURL: true,
      
      // View Modes
      overview: true,
      help: true,
      pause: true,
      
      // Speaker notes (press 'S' to open)
      showNotes: false,
      
      // Performance
      viewDistance: 3,
      mobileViewDistance: 2,
    });

    revealRef.current.initialize().then(() => {
      setIsReady(true);
      
      // Jump to specific slide if requested
      if (startSlide) {
        const parts = startSlide.split('/').map(Number);
        revealRef.current?.slide(parts[0] || 0, parts[1] || 0);
      }
    });

    return () => {
      try {
        if (revealRef.current) {
          revealRef.current.destroy();
          revealRef.current = null;
        }
      } catch (e) {
        console.warn('Reveal.js destroy call failed.');
      }
    };
  }, []);

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
        {/* Level 1: Executive Summary (Slides 1-8) */}
        <Level1Slides />
        
        {/* Level 2: Core Principles (Slides 9-18) */}
        <Level2Slides />
        
        {/* Level 3: Evidence & Research (Slides 19-28) */}
        <Level3Slides />
        
        {/* Level 4: Implementation (Slides 29-36) */}
        <Level4Slides />
        
        {/* Level 5: Roadmap & Next Steps (Slides 37-40) */}
        <Level5Slides />
      </div>
      
      {/* FOE Logo watermark */}
      <img 
        src="/img/foe-logo.svg" 
        alt="FOE" 
        className="slide-logo"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '30px',
          height: '40px',
          opacity: 0.6,
          zIndex: 100,
        }}
      />
    </div>
  );
}

export default Presentation;

// Re-export components for external use
export { Slide, Fragment, FragmentBlock, VerticalSlides } from './Slide';
export { useReveal } from './useReveal';
