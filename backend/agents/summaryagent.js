// ---------- Project Summary ----------

export function buildExecutiveSummary({ project, matchedTeam, budget, timeline }) {
  return {
    title: project.name || "AI Generated Project",
    summary: `This project requires ${matchedTeam.length} recommended freelancers. Estimated budget is $${
      budget.total || budget.totalBudget || 0
    } with an estimated timeline of ${
      timeline.duration || timeline.totalDuration || "4 weeks"
    }.`
  };
}

export function buildReasoning({ requirements, matchedTeam }) {
  return [
    `AI identified ${requirements.roles.length} key roles for this project.`,
    `Required skills: ${requirements.skills.join(", ")}.`,
    `Selected ${matchedTeam.length} freelancers based on skill match and experience.`,
    "Budget was estimated using freelancer hourly rates.",
    "Timeline was generated based on project complexity."
  ];
}

export function buildRisks() {
  return [
    {
      title: "Scope Creep",
      severity: "High",
      impact: "Project cost and duration may increase.",
      mitigation: "Freeze requirements before development."
    },
    {
      title: "API Integration",
      severity: "Medium",
      impact: "Third-party services may delay development.",
      mitigation: "Use backup APIs and proper error handling."
    },
    {
      title: "Security Issues",
      severity: "High",
      impact: "Sensitive data may be exposed.",
      mitigation: "Implement authentication and encryption."
    },
    {
      title: "Team Availability",
      severity: "Low",
      impact: "Resource changes may delay delivery.",
      mitigation: "Keep backup freelancers available."
    }
  ];
}

// ---------- Freelancer Summary ----------

export function generateSummary({
  fullName,
  currentRole,
  experience,
  skills,
  githubUrl
}) {
  const years = Number(experience) || 0;

  const level =
    years >= 6
      ? "Senior"
      : years >= 3
      ? "Mid-Level"
      : "Junior";

  return {
    professionalSummary: `${fullName} is a ${level} ${currentRole} with ${years} years of experience.`,

    technicalSummary:
      "Demonstrates strong software development practices and problem-solving ability.",

    verifiedSkills: skills,

    primaryDomain: currentRole,

    recommendedRoles: [currentRole],

    strengths: [
      "Problem Solving",
      "Clean Code",
      "Team Collaboration"
    ],

    improvementAreas: [
      "Documentation",
      "Testing"
    ],

    experienceLevel: level,

    githubSummary: githubUrl
      ? "GitHub profile available."
      : "GitHub profile not provided.",

    resumeSummary:
      "Resume indicates relevant experience and technical skills.",

    overallRecommendation:
      `Recommended for ${level} ${currentRole} positions.`
  };
}