/**
 * Sends the project prompt to the backend for AI analysis.
 */

export async function analyzeProjectApi(prompt) {
  try {
    const response = await fetch("/api/project/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze project");
    }

    return await response.json();

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}