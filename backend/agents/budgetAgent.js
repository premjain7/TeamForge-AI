export function estimateBudget(matchedTeam, complexity) {
  const level = (complexity || "medium").toLowerCase();
  const multiplier = { low: 1, medium: 1.5, high: 2.2 }[level] || 1.5;
  const hoursPerPerson = { low: 40, medium: 80, high: 140 }[level] || 80;

  const categoryMap = {};

  matchedTeam.forEach(f => {
    const category = f.skills[0] || "General";
    const cost = Math.round(f.hourlyRate * hoursPerPerson * multiplier);
    categoryMap[category] = (categoryMap[category] || 0) + cost;
  });

  const totalCost = Object.values(categoryMap).reduce((a, b) => a + b, 0);

  const breakdown = Object.entries(categoryMap).map(([category, amount]) => ({
    category,
    amount,
    percentage: Math.round((amount / totalCost) * 100)
  }));

  return {
    totalCost,
    formattedTotal: `$${totalCost.toLocaleString()}`,
    breakdown
  };
}