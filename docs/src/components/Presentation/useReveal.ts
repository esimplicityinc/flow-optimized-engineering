import { useEffect, useRef, useState } from 'react';
import Reveal from 'reveal.js';

interface UseRevealOptions {
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  backgroundTransition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  autoAnimate?: boolean;
  autoAnimateDuration?: number;
  slideNumber?: boolean | string;
  hash?: boolean;
  center?: boolean;
  width?: number;
  height?: number;
}

const defaultOptions: UseRevealOptions = {
  transition: 'slide',
  backgroundTransition: 'fade',
  autoAnimate: true,
  autoAnimateDuration: 0.8,
  slideNumber: 'c/t',
  hash: true,
  center: true,
  width: 1920,
  height: 1080,
};

export function useReveal(options: UseRevealOptions = {}) {
  const deckRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<Reveal.Api | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!deckRef.current || revealRef.current) return;

    const mergedOptions = { ...defaultOptions, ...options };

    revealRef.current = new Reveal(deckRef.current, {
      // Display and Layout
      width: mergedOptions.width,
      height: mergedOptions.height,
      margin: 0.04,
      minScale: 0.2,
      maxScale: 2.0,
      center: mergedOptions.center,
      
      // Navigation and Controls
      controls: true,
      controlsLayout: 'bottom-right',
      controlsBackArrows: 'faded',
      progress: true,
      slideNumber: mergedOptions.slideNumber,
      hash: mergedOptions.hash,
      keyboard: true,
      touch: true,
      loop: false,
      navigationMode: 'default',
      
      // Transitions and Animation
      transition: mergedOptions.transition,
      transitionSpeed: 'default',
      backgroundTransition: mergedOptions.backgroundTransition,
      autoAnimate: mergedOptions.autoAnimate,
      autoAnimateDuration: mergedOptions.autoAnimateDuration,
      autoAnimateEasing: 'ease',
      
      // Fragments
      fragments: true,
      fragmentInURL: true,
      
      // View Modes
      overview: true,
      help: true,
      pause: true,
      
      // Performance
      viewDistance: 3,
      mobileViewDistance: 2,
      
      // Display notes in presenter view
      showNotes: false,
    });

    revealRef.current.initialize().then(() => {
      setIsReady(true);
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

  return {
    deckRef,
    revealRef,
    isReady,
  };
}

export default useReveal;
