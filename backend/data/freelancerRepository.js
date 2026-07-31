import { getAllFreelancers } from '../services/freelancerRepository.js';

export function getFreelancers() {
  return getAllFreelancers();
}
