import { getAllFreelancers } from '../services/freelancerRepository.js';
import { calculateScore } from '../utils/scoreCalculator.js';

/**
 * Matches registered freelancers against project requirements and ranks them by score.
 * 
 * @param {Array<string>} requiredSkills Array of required skills & technologies
 * @param {Array<string>} requiredRoles Array of required roles
 * @param {number} teamSize Number of top freelancers to return
 * @returns {Array<object>} Ranked list of registered freelancers
 */
export function matchFreelancers(requiredSkills = [], requiredRoles = [], teamSize = 4) {
  const freelancers = getAllFreelancers();

  if (!freelancers || freelancers.length === 0) {
    return [];
  }

  const scored = freelancers.map((f) => {
    const score = calculateScore(f, requiredSkills, requiredRoles);

    // Build concise AI summary / match rationale
    const matchedSkillList = (f.skills || []).filter((fs) =>
      (requiredSkills || []).some((rs) =>
        fs.toLowerCase().includes(rs.toLowerCase()) || rs.toLowerCase().includes(fs.toLowerCase())
      )
    );

    const summaryText = matchedSkillList.length > 0
      ? `Strong fit with ${f.experience || 0}+ yrs exp in ${f.currentRole}. Core competencies in ${matchedSkillList.join(', ')}.`
      : `Specialist with ${f.experience || 0}+ yrs exp in ${f.currentRole} and solid technical background.`;

    return {
      id: f.id,
      name: f.fullName,
      fullName: f.fullName,
      email: f.email,
      phone: f.phone || '',
      location: f.location || '',
      currentRole: f.currentRole,
      role: f.currentRole,
      preferredRole: f.preferredRole || f.currentRole,
      experience: typeof f.experience === 'number' ? `${f.experience} yrs exp` : f.experience,
      experienceYears: Number(f.experience) || 0,
      skills: f.skills || [],
      availability: f.availability || 'Available Immediately',
      githubUrl: f.githubUrl || '',
      portfolioUrl: f.portfolioUrl || '',
      linkedinUrl: f.linkedinUrl || '',
      rating: f.rating || 4.8,
      matchScore: score,
      matchPercentage: score,
      summary: summaryText,
      reason: summaryText
    };
  });

  // Sort descending by matchScore
  scored.sort((a, b) => b.matchScore - a.matchScore);

  return scored.slice(0, teamSize);
}