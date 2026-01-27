/**
 * EcosystemDiagram - Interactive eSimplicity Ecosystem Architecture Diagram
 * 
 * Shows the relationships between:
 * - Teams (Gov Delivery, TRB, RIC Teams)
 * - Concepts (FOE, Shine, Maturity Model, Field Guides)
 * - Platforms (KATALYST, PRIMA)
 */

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TeamNode, ConceptNode, PlatformNode, MobileNode } from './nodes';
import { nodes, edges, mobileNodes, mobileEdges } from './data';
import Legend from './Legend';
import styles from './EcosystemDiagram.module.css';
import { Maximize2, Minimize2 } from 'lucide-react';

// Define custom node types
const nodeTypes = {
  teamNode: TeamNode,
  conceptNode: ConceptNode,
  platformNode: PlatformNode,
  mobileNode: MobileNode,
};

interface EcosystemDiagramProps {
  /** Force simplified mobile view */
  simplified?: boolean;
}

function EcosystemDiagramInner({ simplified = false }: EcosystemDiagramProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [showSimplified, setShowSimplified] = useState(simplified);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !simplified) {
        setShowSimplified(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [simplified]);

  // Select nodes and edges based on view
  const currentNodes = showSimplified ? mobileNodes : nodes;
  const currentEdges = showSimplified ? mobileEdges : edges;

  const [flowNodes, setNodes, onNodesChange] = useNodesState(currentNodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(currentEdges);

  // Update nodes/edges when view changes
  useEffect(() => {
    setNodes(currentNodes);
    setEdges(currentEdges);
  }, [showSimplified, currentNodes, currentEdges, setNodes, setEdges]);

  const toggleView = useCallback(() => {
    setShowSimplified((prev) => !prev);
  }, []);

  // Fit view options
  const fitViewOptions = useMemo(() => ({
    padding: 0.15,
    includeHiddenNodes: false,
  }), []);

  return (
    <div className={styles.container}>
      {/* View Toggle */}
      <div className={styles.viewToggle}>
        <button 
          className={styles.toggleButton}
          onClick={toggleView}
          aria-label={showSimplified ? 'Show detailed view' : 'Show simplified view'}
        >
          {showSimplified ? (
            <>
              <Maximize2 size={14} />
              <span>Detailed View</span>
            </>
          ) : (
            <>
              <Minimize2 size={14} />
              <span>Simplified View</span>
            </>
          )}
        </button>
      </div>

      {/* Diagram */}
      <div className={`${styles.diagramWrapper} ${showSimplified ? styles.mobileWrapper : ''}`}>
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={fitViewOptions}
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
          minZoom={0.3}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Controls 
            className={styles.controls}
            showInteractive={false}
          />
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1}
            color="var(--ifm-color-emphasis-300)"
          />
        </ReactFlow>
      </div>

      {/* Legend */}
      <Legend compact={showSimplified} />
    </div>
  );
}

// Wrap with ReactFlowProvider for proper context
export default function EcosystemDiagram(props: EcosystemDiagramProps) {
  return (
    <ReactFlowProvider>
      <EcosystemDiagramInner {...props} />
    </ReactFlowProvider>
  );
}
