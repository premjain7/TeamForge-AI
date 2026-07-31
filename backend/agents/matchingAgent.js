import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { calculateScore } from '../utils/scoreCalculator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const freelancers = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/freelancers.json')));

export function matchFreelancers(requiredSkills, teamSize = 3) {
  const scored = freelancers.map(f => ({
    ...f,
    matchScore: calculateScore(f, requiredSkills)
  }));
  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, teamSize);
}