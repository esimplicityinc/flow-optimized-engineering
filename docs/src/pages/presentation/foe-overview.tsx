import React from 'react';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * FOE Overview Presentation
 * 
 * A 40-slide presentation explaining Flow Optimized Engineering
 * at progressively deeper levels.
 * 
 * Keyboard shortcuts:
 * - Arrow keys: Navigate slides
 * - Space: Next slide
 * - S: Open speaker notes
 * - O: Overview mode
 * - F: Fullscreen
 * - Esc: Exit overview/fullscreen
 * - ?: Show help
 */
export default function FOEOverviewPresentation() {
  return (
    <>
      <Head>
        <title>Flow Optimized Engineering | Presentation</title>
        <meta name="description" content="A comprehensive presentation explaining Flow Optimized Engineering at progressively deeper levels." />
        <meta name="robots" content="noindex" />
        {/* Hide Docusaurus navbar/footer for fullscreen presentation */}
        <style>{`
          .navbar, .footer, .theme-doc-sidebar-container, .pagination-nav {
            display: none !important;
          }
          .main-wrapper {
            padding: 0 !important;
            margin: 0 !important;
          }
          body {
            overflow: hidden;
          }
          #__docusaurus {
            min-height: 100vh;
          }
        `}</style>
      </Head>
      <BrowserOnly fallback={<div style={{ minHeight: '100vh', background: '#0F172A' }} />}>
        {() => {
          const { Presentation } = require('../../components/Presentation');
          return <Presentation />;
        }}
      </BrowserOnly>
    </>
  );
}
