// Mocked AI summary generator.
// To go live with Gemini: replace the body of generateSummary() with a real
// API call and return the same shape. Nothing else in the codebase needs to change.
export function generateSummary({ fullName, currentRole, experience, skills, githubUrl }) {
  const experienceNum = Number(experience) || 0;
  const experienceLevel = experienceNum >= 6 ? 'Senior' : experienceNum >= 3 ? 'Mid-Level' : 'Junior';
  const skillList = Array.isArray(skills) ? skills : [];

  return {
    professionalSummary: `${fullName} is a ${experienceLevel.toLowerCase()} ${currentRole} with ${experienceNum} years of hands-on experience building production-grade software.`,
    technicalSummary:
      'Demonstrates strong command of modern development practices, with a consistent track record of delivering functional, maintainable systems.',
    verifiedSkills: skillList.length ? skillList : ['React', 'Node.js'],
    primaryDomain: skillList[0] || currentRole,
    recommendedRoles: [currentRole, 'Full Stack Developer'],
    strengths: ['Clean code practices', 'Strong problem solving', 'Fast delivery'],
    improvementAreas: ['Test coverage', 'Documentation depth'],
    experienceLevel,
    githubSummary: githubUrl
      ? 'Active repository history with consistent commit activity and readable project structure.'
      : 'No GitHub profile provided.',
    resumeSummary:
      'Resume clearly outlines relevant experience, technologies used, and measurable project outcomes.',
    overallRecommendation: `Strong candidate for ${experienceLevel.toLowerCase()}-level ${currentRole} roles on cross-functional teams.`
  };
}