import express from 'express';
import {
  listScholarships, getScholarship, createScholarship, updateScholarship, deleteScholarship
} from '../controllers/scholarshipController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', listScholarships);
router.get('/:id', getScholarship);
router.post('/', protect, createScholarship);
router.put('/:id', protect, updateScholarship);
router.delete('/:id', protect, deleteScholarship);

export default router;
