export function calculateScore(freelancer, requiredSkills) {
  const matches = freelancer.skills.filter(fs =>
    requiredSkills.some(rs =>
      fs.toLowerCase().includes(rs.toLowerCase()) ||
      rs.toLowerCase().includes(fs.toLowerCase())
    )
  ).length;

  const skillScore = (matches / requiredSkills.length) * 60;
  const experienceScore = Math.min(freelancer.experience, 10) * 2;
  const ratingScore = freelancer.rating * 4;

  return Math.round(Math.min(skillScore + experienceScore + ratingScore, 100));
}