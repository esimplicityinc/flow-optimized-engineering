// CORRECTED: Flat capability inventory - NO hierarchies, NO flow, NO containment
// 7 peer task areas + cross-cutting infrastructure concepts
export const architectureData = {
  // Cross-cutting infrastructure concepts (NOT a container, NOT a parent)
  crossCuttingConcepts: {
    label: "Unified Data Fabric",
    description: "The connective backbone that unifies and governs data",
    capabilities: [
      "Pipelines (ETL/ELT/streaming)",
      "Storage across on-prem + cloud",
      "Metadata and governance",
      "Data quality and observability",
      "Security and access controls",
      "Lineage and integration"
    ]
  },

  // 7 PEER TASK AREAS - equal standing, no hierarchy
  taskAreas: [
    {
      id: 1,
      name: "Task Area 1",
      title: "Analytics & AI/ML",
      region: "Insight & Action"
    },
    {
      id: 2,
      name: "Task Area 2",
      title: "Data Engineering",
      region: "Data Governance"
    },
    {
      id: 3,
      name: "Task Area 3",
      title: "Data Management",
      region: "Data Governance"
    },
    {
      id: 4,
      name: "Task Area 4",
      title: "Survey Methodology & Statistical Sampling",
      region: "Insight & Action"
    },
    {
      id: 5,
      name: "Task Area 5",
      title: "Data Literacy / Knowledge Transfer",
      region: "Data Atlas"
    },
    {
      id: 6,
      name: "Task Area 6",
      title: "Economic Research and Support",
      region: "Research & Consulting"
    },
    {
      id: 7,
      name: "Task Area 7",
      title: "Litigation Support & E-Discovery",
      region: "Compliance & Services"
    }
  ],

  // Visual regions are LABELS ONLY - not groupings, not containers
  visualRegions: {
    "Acquisition & Discovery": {
      description: "The outward-facing engine that brings new data into the ecosystem.",
      position: "left"
    },
    "Data Governance": {
      description: null,
      position: "top-center-nested"
    },
    "Insight & Action": {
      description: "The engine that turns governed data into understanding",
      position: "bottom-center"
    },
    "Data Atlas": {
      description: "Human narratives of the fabric",
      position: "right-vertical"
    },
    "Research & Consulting": {
      description: "The high-altitude view that reveals cost, value, and opportunity.",
      position: "top-right"
    },
    "Compliance & Services": {
      description: "Secure and defensible data, prepared the right way",
      position: "bottom-right"
    }
  }
};
