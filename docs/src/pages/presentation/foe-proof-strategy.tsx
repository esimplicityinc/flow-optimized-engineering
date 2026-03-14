import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * FOE Proof Strategy Presentation
 * 
 * A 4-slide executive deck for Keith that reframes FOE from broad doctrine
 * into a practical, leadership-friendly proof strategy. The purpose is to
 * satisfy concerns about audience, outcome, practical implementation,
 * organizational support, and evidence.
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

export default function FoeProofStrategyPresentation() {
  return (
    <Layout
      title="FOE Proof Strategy"
      description="From FOE doctrine to program-level proof — a practical adoption strategy for proving FOE in aligned programs, measuring results, and scaling based on evidence"
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
          const { FoeProofPresentation } = require('../../components/Presentation/FoeProofPresentation');
          return <FoeProofPresentation />;
        }}
      </BrowserOnly>
    </Layout>
  );
}
