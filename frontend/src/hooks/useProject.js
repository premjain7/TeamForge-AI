import { useState, useCallback } from "react";
import { analyzeProjectApi } from "../services/apiService";

/**
 * Custom hook for project state management.
 * Strictly decoupled from routing, view navigation, and presentation layer.
 */
export function useProject() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'completed' | 'error'
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  const analyzeProject = useCallback(async (customPrompt) => {
    const promptToSubmit = customPrompt !== undefined ? customPrompt : prompt;
    if (!promptToSubmit || !promptToSubmit.trim()) return;

    setLoading(true);
    setStatus("loading");
    setError(null);

    try {
      const data = await analyzeProjectApi(promptToSubmit);
      setAnalysisData(data);
      setStatus("completed");
    } catch (err) {
      setError(err.message || "Failed to analyze project requirements.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  const resetAnalysis = useCallback(() => {
    setPrompt("");
    setLoading(false);
    setStatus("idle");
    setAnalysisData(null);
    setError(null);
  }, []);

  return {
    prompt,
    setPrompt,
    loading,
    status,
    analysisData,
    error,
    analyzeProject,
    resetAnalysis
  };
}

export default useProject;
