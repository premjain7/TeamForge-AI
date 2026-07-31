import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '../data/freelancers.json');

function readFreelancers() {
  let raw;
  try {
    raw = fs.readFileSync(DATA_PATH, 'utf8');
  } catch (err) {
    throw new Error(`Could not read freelancers.json: ${err.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`freelancers.json contains invalid JSON: ${err.message}`);
  }
}

function writeFreelancers(freelancers) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(freelancers, null, 2));
}

export function addFreelancer(freelancer) {
  const freelancers = readFreelancers();
  const nextId = freelancers.length > 0
    ? Math.max(...freelancers.map((f) => f.id || 0)) + 1
    : 1;

  const record = { id: nextId, ...freelancer };
  freelancers.push(record);
  writeFreelancers(freelancers);
  return record;
}

export function getAllFreelancers() {
  return readFreelancers();
}