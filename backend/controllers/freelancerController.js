import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { addFreelancer } from '../services/freelancerRepository.js';
import { generateSummary } from '../agents/summaryAgent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_LIST = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/skillsList.json'), 'utf8')
);
const SKILLS_SET = new Set(SKILLS_LIST.map((s) => s.toLowerCase()));

export const registerFreelancer = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      experience,
      currentRole,
      availability,
      preferredRole,
      githubUrl,
      portfolioUrl,
      linkedinUrl,
      skills
    } = req.body;

    // Validate the resume file itself now that it's fully on disk.
    if (req.file && req.file.mimetype !== 'application/pdf') {
      fs.unlink(req.file.path, () => {}); // best-effort cleanup
      return res.status(400).json({
        success: false,
        message: 'Only PDF resumes are allowed'
      });
    }

    const missing = [];
    if (!fullName) missing.push('fullName');
    if (!email) missing.push('email');
    if (!experience) missing.push('experience');
    if (!currentRole) missing.push('currentRole');
    if (!skills) missing.push('skills');
    if (!githubUrl) missing.push('githubUrl');
    if (!req.file) missing.push('resume');

    if (missing.length > 0) {
      if (req.file) fs.unlink(req.file.path, () => {});
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }

    const parsedSkills = Array.isArray(skills)
      ? skills
      : String(skills).split(',').map((s) => s.trim()).filter(Boolean);

    const invalidSkills = parsedSkills.filter((s) => !SKILLS_SET.has(s.toLowerCase()));
    if (invalidSkills.length > 0) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({
        success: false,
        message: `Unrecognized skills: ${invalidSkills.join(', ')}`
      });
    }
    if (parsedSkills.length === 0) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ success: false, message: 'At least one skill is required' });
    }
    if (parsedSkills.length > 15) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ success: false, message: 'Maximum 15 skills allowed' });
    }
    const uniqueSkills = [...new Set(parsedSkills)];

    const resume = {
      filename: req.file.filename,
      filepath: `/uploads/resumes/${req.file.filename}`,
      uploadedAt: new Date().toISOString(),
      size: req.file.size
    };

    const newFreelancer = {
      fullName,
      email,
      phone: phone || '',
      location: location || '',
      experience: Number(experience) || 0,
      currentRole,
      availability: availability || 'Not specified',
      skills: uniqueSkills,
      preferredRole: preferredRole || currentRole,
      githubUrl,
      portfolioUrl: portfolioUrl || '',
      linkedinUrl: linkedinUrl || '',
      resume,
      rating: 0,
      verified: false,
      createdAt: new Date().toISOString()
    };

    const created = addFreelancer(newFreelancer);

    return res.status(201).json({
      success: true,
      message: 'Freelancer registered successfully.',
      freelancer: created
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

export const summarizeFreelancer = async (req, res, next) => {
  try {
    const { fullName, currentRole, experience, skills = [], githubUrl } = req.body;

    if (!fullName || !currentRole) {
      return res.status(400).json({
        success: false,
        message: 'fullName and currentRole are required to generate a summary'
      });
    }

    const summary = generateSummary({ fullName, currentRole, experience, skills, githubUrl });

    return res.json({
      success: true,
      summary
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};