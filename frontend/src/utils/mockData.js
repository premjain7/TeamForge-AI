export const mockProjectAnalysis = {
  executiveSummary: {
    overview: "High-level architecture plan for a scalable, high-throughput Fintech mobile and web platform with real-time analytics and bank-grade security.",
    complexity: "High",
    estimatedTeamSize: "4 Specialists",
    estimatedBudget: "$28,500",
    estimatedTimeline: "8 Weeks",
    keyRecommendation: "Prioritize bank-grade auth and PCI-DSS compliant API security in Sprint 1 before frontend integrations.",
    biggestRisk: "Third-party payment gateway SLA dependencies and compliance audit delays."
  },
  project: {
    title: "NextGen Fintech Payment Platform",
    type: "Web & Mobile Application",
    complexity: "High",
    summary: "A launch-ready, multi-tenant financial technology application featuring instant peer-to-peer transfers, automated fraud detection, and interactive investment tracking dashboards."
  },
  requirements: {
    roles: [
      "Lead Full-Stack Architect",
      "Senior React & Mobile Engineer",
      "DevOps & Security Specialist",
      "UI/UX Product Designer"
    ],
    technologies: [
      "React 19",
      "Node.js & Express",
      "PostgreSQL",
      "Redis Cache",
      "Tailwind / CSS Modules",
      "Docker & AWS"
    ],
    skills: [
      "Bank API Integration",
      "OAuth2 & JWT Auth",
      "Real-time WebSockets",
      "PCI-DSS Compliance",
      "High-Concurrency DB Optimization"
    ]
  },
  recommendedTeam: [
    {
      id: "f1",
      name: "Alex Rivera",
      role: "Lead Full-Stack Architect",
      experience: "8+ yrs exp",
      hourlyRate: "$85/hr",
      rating: 4.9,
      availability: "Full-time (40 hrs/wk)",
      reason: "Extensive experience scaling fintech backends with Node.js & PostgreSQL under strict security compliance."
    },
    {
      id: "f2",
      name: "Elena Rostova",
      role: "Senior React & Mobile Engineer",
      experience: "6+ yrs exp",
      hourlyRate: "$75/hr",
      rating: 4.95,
      availability: "Full-time (40 hrs/wk)",
      reason: "Expertise in high-performance web applications, responsive charts, and real-time state synchronization."
    },
    {
      id: "f3",
      name: "Marcus Vance",
      role: "DevOps & Security Specialist",
      experience: "7+ yrs exp",
      hourlyRate: "$90/hr",
      rating: 4.88,
      availability: "Part-time (20 hrs/wk)",
      reason: "Specialized in AWS cloud infrastructure, CI/CD pipelines, containerization, and zero-trust security."
    },
    {
      id: "f4",
      name: "Sophia Chen",
      role: "UI/UX Product Designer",
      experience: "5+ yrs exp",
      hourlyRate: "$65/hr",
      rating: 4.92,
      availability: "Part-time (25 hrs/wk)",
      reason: "Track record of designing clean financial dashboards, design systems, and micro-interactive transaction flows."
    }
  ],
  budget: {
    total: 28500,
    formattedTotal: "$28,500",
    currency: "USD",
    breakdown: [
      { category: "Full-Stack & Architecture", amount: 10800, percentage: 38 },
      { category: "Frontend & Mobile Interfaces", amount: 8400, percentage: 30 },
      { category: "DevOps & Security Setup", amount: 5400, percentage: 19 },
      { category: "UI/UX Design & Prototyping", amount: 3900, percentage: 13 }
    ]
  },
  timeline: {
    duration: "8 Weeks",
    totalSprints: 4,
    milestones: [
      {
        phase: "Phase 1: Architecture & Auth Setup",
        weeks: "Weeks 1–2",
        deliverables: [
          "Database schema design & PostgreSQL setup",
          "JWT & OAuth2 Authentication service",
          "DevOps pipeline & staging environment"
        ]
      },
      {
        phase: "Phase 2: Core Payment Engine",
        weeks: "Weeks 3–4",
        deliverables: [
          "Payment gateway API integration",
          "Transaction processing & ledger logic",
          "Unit & integration security tests"
        ]
      },
      {
        phase: "Phase 3: User Dashboard & Mobile UI",
        weeks: "Weeks 5–6",
        deliverables: [
          "Real-time transaction feed",
          "Analytics charts & export modules",
          "User profile & notification settings"
        ]
      },
      {
        phase: "Phase 4: QA, Audit & Production Launch",
        weeks: "Weeks 7–8",
        deliverables: [
          "End-to-end user acceptance testing",
          "Security audit & penetration testing",
          "Production deployment & monitoring setup"
        ]
      }
    ]
  },
  reasoning: [
    "Divided back-end work into dedicated Architecture and Security roles to meet fintech regulatory compliance requirements.",
    "Selected React 19 for maximum rendering efficiency with high-frequency financial ticker updates.",
    "Allocated 30% of total timeline to automated testing and staging validation to prevent runtime transaction edge-case failures.",
    "Structured team with 2 full-time core engineers and 2 part-time domain specialists to optimize total project expenditure."
  ],
  risks: [
    {
      title: "Third-Party Payment API Latency",
      severity: "High",
      impact: "May affect real-time checkout confirmation speeds.",
      mitigation: "Implement Redis caching layer and asynchronous webhook queueing."
    },
    {
      title: "Compliance Audit Delays",
      severity: "Medium",
      impact: "Could delay public launch date by up to 1 week.",
      mitigation: "Begin security audit prep during Sprint 2 parallel to payment integration."
    },
    {
      title: "High Initial Traffic Spikes",
      severity: "Low",
      impact: "Potential DB pool exhaustion during product launch.",
      mitigation: "Configure AWS Auto-Scaling and connection pooling via PgBouncer."
    }
  ]
};

export const samplePrompts = [
  "Build a launch-ready fintech web and mobile app with bank-grade security and analytics.",
  "Create an AI-driven e-commerce platform with automated inventory matching and instant checkout.",
  "Design a multi-tenant SaaS dashboard for team workload tracking with real-time notifications."
];
