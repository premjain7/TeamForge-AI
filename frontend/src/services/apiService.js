import { mockProjectAnalysis } from "../utils/mockData";

/**
 * Analyzes project requirements using AI backend (Simulated async service in Sprint 1).
 * Production-ready API signature compatible with future fetch calls.
 * 
 * @param {string} prompt Project description provided by user
 * @returns {Promise<object>} Analysis report object
 */
export async function analyzeProjectApi(prompt) {
  // Simulate asynchronous network/AI processing latency
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return clone of mock analysis adapted for the prompt if needed
      const customTitle = prompt && prompt.length > 10 
        ? prompt.substring(0, 45).trim() + "..."
        : mockProjectAnalysis.project.title;

      resolve({
        ...mockProjectAnalysis,
        project: {
          ...mockProjectAnalysis.project,
          title: customTitle,
          summary: prompt || mockProjectAnalysis.project.summary
        }
      });
    }, 2000);
  });
}
