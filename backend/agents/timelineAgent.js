export function estimateTimeline(complexity) {
  const level = (complexity || "medium").toLowerCase();
  const weeks = { low: 2, medium: 5, high: 9 }[level] || 5;
  return {
    estimatedWeeks: weeks,
    phases: [
      { phase: "Planning & Design", weeks: Math.ceil(weeks * 0.2) },
      { phase: "Development", weeks: Math.ceil(weeks * 0.6) },
      { phase: "Testing & Deployment", weeks: Math.ceil(weeks * 0.2) }
    ]
  };
}