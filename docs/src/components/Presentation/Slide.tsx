import React, { ReactNode } from 'react';

interface SlideProps {
  children: ReactNode;
  className?: string;
  background?: string;
  backgroundGradient?: boolean;
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  autoAnimate?: boolean;
  autoAnimateId?: string;
  notes?: string;
  darkBg?: boolean;
}

/**
 * Slide component wrapper for reveal.js sections
 */
export function Slide({
  children,
  className = '',
  background,
  backgroundGradient,
  transition,
  autoAnimate,
  autoAnimateId,
  notes,
  darkBg,
}: SlideProps) {
  const bgColor = backgroundGradient 
    ? undefined 
    : background;
  
  const bgStyle = backgroundGradient 
    ? 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)' 
    : undefined;

  return (
    <section
      className={`${className} ${darkBg ? 'dark-bg' : ''}`}
      data-background-color={bgColor}
      data-background={bgStyle}
      data-transition={transition}
      data-auto-animate={autoAnimate || undefined}
      data-auto-animate-id={autoAnimateId}
    >
      {children}
      {notes && <aside className="notes">{notes}</aside>}
    </section>
  );
}

/**
 * Vertical slide stack for nested slides
 */
interface VerticalSlidesProps {
  children: ReactNode;
}

export function VerticalSlides({ children }: VerticalSlidesProps) {
  return <section>{children}</section>;
}

/**
 * Fragment wrapper for animated content reveal
 */
interface FragmentProps {
  children: ReactNode;
  index?: number;
  animation?: 'fade-in' | 'fade-out' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' 
    | 'grow' | 'shrink' | 'strike' | 'highlight-red' | 'highlight-blue' | 'highlight-green';
  className?: string;
}

export function Fragment({ 
  children, 
  index, 
  animation = 'fade-in',
  className = '' 
}: FragmentProps) {
  return (
    <span 
      className={`fragment ${animation} ${className}`}
      data-fragment-index={index}
    >
      {children}
    </span>
  );
}

/**
 * Fragment wrapper for block elements
 */
export function FragmentBlock({ 
  children, 
  index, 
  animation = 'fade-in',
  className = '' 
}: FragmentProps) {
  return (
    <div 
      className={`fragment ${animation} ${className}`}
      data-fragment-index={index}
    >
      {children}
    </div>
  );
}

export default Slide;
