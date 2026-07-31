export function buildExecutiveSummary({ project, requirements, matchedTeam, budget, timeline }) {
  const topPick = matchedTeam[0];

  return {
    title: `${project.type} Development Initiative`,
    overview: `This ${project.complexity.toLowerCase()}-complexity ${project.type.toLowerCase()} requires a specialized team combining ${requirements.skills.slice(0, 3).join(", ")}. Based on scope analysis, we recommend a ${requirements.roles.length}-person team delivering within ${timeline.estimatedWeeks} weeks at an estimated investment of ${budget.formattedTotal}.`,
    summary: `Client requirements point to a ${project.type.toLowerCase()} needing ${requirements.roles.join(", ")}, built with ${requirements.technologies.join(", ")}.`,
    complexity: project.complexity,
    estimatedTeamSize: requirements.roles.length,
    estimatedBudget: budget.formattedTotal,
    estimatedTimeline: `${timeline.estimatedWeeks} weeks`,
    keyRecommendation: `${topPick?.name || "Top-ranked freelancer"} is the strongest match at ${topPick?.matchScore || 0}% compatibility and should anchor the core team.`,
    biggestRisk: project.complexity === "High"
      ? "High technical complexity may extend timelines if scope isn't locked early."
      : "Moderate scope risk — ensure requirements stay fixed once development starts."
  };
}

export function buildReasoning({ requirements, matchedTeam }) {
  return [
    `Extracted ${requirements.skills.length} core skills and ${requirements.technologies.length} required technologies from the client brief.`,
    `Matched ${matchedTeam.length} freelancers ranked by skill overlap, experience, and rating.`,
    `Top candidate ${matchedTeam[0]?.name || "N/A"} scored ${matchedTeam[0]?.matchScore || 0}% compatibility against required skills.`,
    `Team composition balances specialization with budget efficiency across ${requirements.roles.length} roles.`
  ];
}

export function buildRisks({ project, timeline }) {
  const risks = [
    {
      title: "Timeline Slippage",
      severity: project.complexity === "High" ? "High" : "Medium",
      impact: "Delivery may extend beyond the estimated " + timeline.estimatedWeeks + " weeks if scope changes mid-project.",
      mitigation: "Lock requirements before development begins; use weekly milestone check-ins."
    },
    {
      title: "Budget Overrun",
      severity: "Medium",
      impact: "Additional feature requests can inflate costs beyond initial estimate.",
      mitigation: "Define a fixed-scope contract with change-request pricing agreed upfront."
    },
    {
      title: "Team Coordination",
      severity: project.complexity === "High" ? "Medium" : "Low",
      impact: "Multiple specialists working async can cause integration delays.",
      mitigation: "Assign a lead developer and use daily async standups."
    }
  ];
  return risks;
}