import { analyzePrompt } from "../agents/requirementAgent.js";

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

        return res.json({
            success: true,
            ...analysis
        });

    } catch (error) {
        next(error);
    }
};