import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { registerFreelancer, summarizeFreelancer } from '../controllers/freelancerController.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, '../uploads/resumes');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});

// IMPORTANT: do NOT reject files here. Rejecting mid-stream via fileFilter's
// error callback can abort the socket before Express sends a response,
// which is exactly what caused "Unexpected end of JSON input" on the frontend.
// Accept everything here; validate the real mimetype in the controller instead.
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

const router = express.Router();

// Wrap multer so its own errors (e.g. file too large) always come back as JSON,
// instead of relying solely on the global error handler.
function handleUpload(req, res, next) {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message:
          err.code === 'LIMIT_FILE_SIZE'
            ? 'Resume file is too large (max 10MB)'
            : err.message || 'File upload failed'
      });
    }
    next();
  });
}

router.post('/register', handleUpload, registerFreelancer);
router.post('/summarize', express.json(), summarizeFreelancer);

export default router;