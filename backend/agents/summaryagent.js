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
  return {
    skills: requirements.skills,
    selectedRoles: matchedTeam.map((member) => member.role),
    explanation:
      "Freelancers were selected based on skill match, experience and rating."
  };
}

export function buildRisks() {
  return {
    risks: [
      "Changing requirements",
      "Scope creep",
      "API delays",
      "Resource availability"
    ]
  };
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