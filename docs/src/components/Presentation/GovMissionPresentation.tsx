import React, { useEffect, useRef, useState } from 'react';
import Reveal from 'reveal.js';

// Import styles
import './theme/foe-presentation.css';

// Import slide component
import { GovMissionSlides } from './slides/GovMissionSlides';

interface GovMissionPresentationProps {
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
 * Government Mission Continuity Presentation Component
 * 
 * A presentation explaining how Flow Optimized Engineering solves
 * government's domain knowledge loss problem.
 */
export function GovMissionPresentation({
  startSlide,
  showSlideNumber = 'c/t',
  hash = true,
  transition = 'slide',
}: GovMissionPresentationProps) {
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
      controlsLayout: 'bottom-left',
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
        <GovMissionSlides />
      </div>
    </div>
  );
}

export default GovMissionPresentation;
