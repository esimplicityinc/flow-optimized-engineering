import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * Government Mission Continuity Presentation
 * 
 * A presentation explaining how Flow Optimized Engineering solves
 * government's domain knowledge loss problem.
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

// ============================================
// PAGE COMPONENT
// ============================================

export default function GovMissionContinuityPresentation() {
  return (
    <Layout
      title="Government Mission Continuity Presentation"
      description="How Flow Optimized Engineering solves government's knowledge loss problem and puts agencies back in control of their mission"
    >
      <Head>
        <meta name="robots" content="noindex" />
        <style>{`
          .navbar, .footer, .theme-doc-sidebar-container, .pagination-nav {
            display: none !important;
          }
          .main-wrapper {
            padding: 0 !important;
            margin: 0 !important;
          }
        `}</style>
      </Head>
      <BrowserOnly fallback={<div style={{ minHeight: '100vh', background: '#0F172A' }} />}>
        {() => {
          const { GovMissionPresentation } = require('../../components/Presentation/GovMissionPresentation');
          return <GovMissionPresentation />;
        }}
      </BrowserOnly>
    </Layout>
  );
}
