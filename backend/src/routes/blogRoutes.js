import express from 'express';
import {
  listBlogs, getBlog, createBlog, updateBlog, deleteBlog
} from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', listBlogs);
router.get('/:id', getBlog);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
