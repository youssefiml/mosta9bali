import express from 'express';
import {
  listCommunities, getCommunity, createCommunity, updateCommunity, deleteCommunity
} from '../controllers/communityController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', listCommunities);
router.get('/:id', getCommunity);
router.post('/', protect, createCommunity);
router.put('/:id', protect, updateCommunity);
router.delete('/:id', protect, deleteCommunity);

export default router;
