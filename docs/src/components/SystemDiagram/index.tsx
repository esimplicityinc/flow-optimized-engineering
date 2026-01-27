/**
 * SystemDiagram - Interactive FOE System Architecture
 * 
 * Wrapped in BrowserOnly for SSR compatibility with Docusaurus.
 * 
 * Usage:
 * ```tsx
 * import SystemDiagram from '@site/src/components/SystemDiagram';
 * 
 * <SystemDiagram />
 * ```
 */

import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

interface SystemDiagramProps {
  /** Force simplified mobile view */
  simplified?: boolean;
}

export default function SystemDiagram(props: SystemDiagramProps) {
  return (
    <BrowserOnly fallback={<SystemDiagramFallback />}>
      {() => {
        const SystemDiagramComponent = require('./SystemDiagram').default;
        return <SystemDiagramComponent {...props} />;
      }}
    </BrowserOnly>
  );
}

function SystemDiagramFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ifm-color-emphasis-100)',
        borderRadius: 12,
        border: '1px solid var(--ifm-color-emphasis-200)',
      }}
    >
      <div style={{ textAlign: 'center', color: 'var(--ifm-color-content-secondary)' }}>
        <div style={{ marginBottom: '0.5rem' }}>Loading system diagram...</div>
        <div style={{ fontSize: '0.8rem' }}>Interactive diagram showing FOE agent architecture</div>
      </div>
    </div>
  );
}

// Re-export for convenience
export { SystemDiagram };
