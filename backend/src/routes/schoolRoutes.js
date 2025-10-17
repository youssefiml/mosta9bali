import express from 'express';
import {
  listSchools, getSchool, createSchool, updateSchool, deleteSchool
} from '../controllers/schoolController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', listSchools);
router.get('/:id', getSchool);
router.post('/', protect, createSchool);
router.put('/:id', protect, updateSchool);
router.delete('/:id', protect, deleteSchool);

export default router;
