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

        const combinedSkills = [...new Set([...requirements.skills, ...requirements.technologies])];
        const matchedTeamRaw = matchFreelancers(combinedSkills, requirements.roles.length || 3);

        const matchedTeam = matchedTeamRaw.map((f, idx) => ({
            id: idx + 1,
            ...f,
            role: requirements.roles[idx] || "Specialist"
        }));

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
                title: executiveSummary.title,
                summary: executiveSummary.summary
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