import express from 'express';
import {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from '../controllers/subCategoryController.js';
import { protect } from '../middleware/auth.js';
import { validateSubCategory, validateSubCategoryUpdate, validateId } from '../middleware/validators.js';

const router = express.Router();

router.route('/').get(getSubCategories).post(protect, validateSubCategory, createSubCategory);
router.route('/:id').get(validateId, getSubCategory).put(protect, validateId, validateSubCategoryUpdate, updateSubCategory).delete(protect, validateId, deleteSubCategory);

export default router;

