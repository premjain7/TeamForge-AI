import { analyzePrompt } from "../agents/requirementAgent.js";
import { matchFreelancers } from "../agents/matchingAgent.js";
import { estimateBudget } from "../agents/budgetAgent.js";
import { estimateTimeline } from "../agents/timelineAgent.js";
import { buildExecutiveSummary, buildReasoning, buildRisks } from "../agents/summaryAgent.js";

export const analyzeProject = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Project prompt is required."
      });
    }

    const analysis = await analyzePrompt(prompt);
    const { project, requirements } = analysis;

    const combinedSkills = [...new Set([...(requirements.skills || []), ...(requirements.technologies || [])])];
    const targetRoles = requirements.roles || [];
    const teamCount = Math.max(targetRoles.length, 4);

    // Fetch and match registered freelancers from freelancers.json
    const matchedTeam = matchFreelancers(combinedSkills, targetRoles, teamCount);

    const budget = estimateBudget(matchedTeam, project.complexity);
    const timeline = estimateTimeline(project.complexity);

    const summaryInputs = { project, requirements, matchedTeam, budget, timeline };
    const executiveSummary = buildExecutiveSummary(summaryInputs);
    const reasoning = buildReasoning(summaryInputs);
    const risks = buildRisks(summaryInputs);

    return res.json({
      success: true,
      project: {
        ...project,
        title: executiveSummary.title || project.title,
        summary: executiveSummary.summary || project.summary
      },
      requirements,
      recommendedTeam: matchedTeam,
      budget,
      timeline,
      executiveSummary,
      reasoning,
      risks
    });
  } catch (error) {
    next(error);
  }
};