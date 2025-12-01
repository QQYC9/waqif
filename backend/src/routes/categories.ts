import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';
import { validateCategory, validateId } from '../middleware/validators.js';

const router = express.Router();

router.route('/').get(getCategories).post(protect, validateCategory, createCategory);
router.route('/:id').get(validateId, getCategory).put(protect, validateId, validateCategory, updateCategory).delete(protect, validateId, deleteCategory);

export default router;

