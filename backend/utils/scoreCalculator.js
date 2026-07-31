/**
 * Calculates a match score (0-100) for a freelancer based on project requirements.
 * 
 * Scoring Breakdown:
 * - Skill Match: Up to +50 points
 * - Preferred/Current Role Match: +20 points
 * - Experience Match: Up to +15 points
 * - Availability: +10 points
 * - GitHub URL Present: +5 points
 * - Portfolio URL Present: +5 points
 */
export function calculateScore(freelancer, requiredSkills = [], requiredRoles = []) {
  let score = 0;

  // 1. Skill Match (+50 Max)
  const fSkills = (freelancer.skills || []).map((s) => s.toLowerCase());
  const rSkills = (requiredSkills || []).map((s) => s.toLowerCase());

  if (rSkills.length > 0) {
    const matchedCount = fSkills.filter((fs) =>
      rSkills.some((rs) => fs.includes(rs) || rs.includes(fs))
    ).length;

    const skillScore = Math.min(
      Math.round((matchedCount / Math.max(rSkills.length, 1)) * 50),
      50
    );
    score += skillScore;
  } else if (fSkills.length > 0) {
    score += 30; // baseline if no specific skills specified
  }

  // 2. Preferred / Current Role Match (+20)
  const candidateRoles = [
    freelancer.preferredRole || '',
    freelancer.currentRole || ''
  ].map((r) => r.toLowerCase());

  const rRoles = (requiredRoles || []).map((r) => r.toLowerCase());

  const roleMatched = candidateRoles.some((cr) =>
    cr && rRoles.some((rr) => cr.includes(rr) || rr.includes(cr))
  );

  if (roleMatched) {
    score += 20;
  } else if (candidateRoles.some(Boolean)) {
    score += 10; // partial role match baseline
  }

  // 3. Experience Match (+15 Max)
  const expYears = Number(freelancer.experience) || 0;
  const expScore = Math.min(Math.round(expYears * 3), 15);
  score += expScore;

  // 4. Availability (+10)
  if (freelancer.availability && freelancer.availability !== 'Not specified') {
    score += 10;
  }

  // 5. GitHub Present (+5)
  if (freelancer.githubUrl && freelancer.githubUrl.trim().length > 0) {
    score += 5;
  }

  // 6. Portfolio Present (+5)
  if (freelancer.portfolioUrl && freelancer.portfolioUrl.trim().length > 0) {
    score += 5;
  }

  // Cap final score between 0 and 100
  return Math.min(Math.max(score, 0), 100);
}