import React from 'react';

interface QuoteBlockProps {
  children: string;
  attribution?: string;
  size?: 'normal' | 'large' | 'hero';
  centered?: boolean;
}

/**
 * QuoteBlock - Styled blockquote for key insights
 * 
 * Usage:
 * <QuoteBlock attribution="DORA Research" size="large">
 *   Speed and stability are NOT tradeoffs.
 * </QuoteBlock>
 */
export function QuoteBlock({ 
  children, 
  attribution, 
  size = 'normal',
  centered = true 
}: QuoteBlockProps) {
  const fontSizes = {
    normal: '1.1em',
    large: '1.5em',
    hero: '2em',
  };

  return (
    <blockquote
      style={{
        display: 'block',
        position: 'relative',
        width: '90%',
        margin: '20px auto',
        padding: '1.5em 2em',
        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.08) 0%, rgba(30, 64, 175, 0.03) 100%)',
        borderLeft: '6px solid #1e40af',
        borderRadius: '0 12px 12px 0',
        fontStyle: 'italic',
        fontSize: fontSizes[size],
        textAlign: centered ? 'center' : 'left',
      }}
    >
      <p style={{ margin: 0 }}>{children}</p>
      {attribution && (
        <footer
          className="quote-attribution"
          style={{
            fontSize: '0.6em',
            color: '#64748b',
            marginTop: '0.8em',
            fontStyle: 'normal',
          }}
        >
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}

export default QuoteBlock;
