import { getAllFreelancers } from '../services/freelancerRepository.js';
import { calculateScore } from '../utils/scoreCalculator.js';
import { generateSummary } from './summaryAgent.js';

/**
 * Matches registered freelancers against project requirements and ranks them by score.
 * Ensures every freelancer has a unique AI-generated profile summary.
 * 
 * @param {Array<string>} requiredSkills Array of required skills & technologies
 * @param {Array<string>} requiredRoles Array of required roles
 * @param {number} teamSize Number of top freelancers to return
 * @returns {Array<object>} Ranked list of registered freelancers with complete AI summary objects
 */
export function matchFreelancers(requiredSkills = [], requiredRoles = [], teamSize = 4) {
  const freelancers = getAllFreelancers();

  if (!freelancers || freelancers.length === 0) {
    return [];
  }

  const scored = freelancers.map((f) => {
    const score = calculateScore(f, requiredSkills, requiredRoles);

    // Generate dynamic unique AI summary object if not already present on record
    const aiSummary = generateSummary(f);

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
      resume: f.resume || null,
      rating: f.rating || 4.8,
      matchScore: score,
      matchPercentage: score,

      // Unique AI Summary Fields
      summary: aiSummary.professionalSummary,
      reason: aiSummary.professionalSummary,
      aiSummary
    };
  });

  // Sort descending by matchScore
  scored.sort((a, b) => b.matchScore - a.matchScore);

  return scored.slice(0, teamSize);
}