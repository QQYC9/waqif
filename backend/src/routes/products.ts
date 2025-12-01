import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
import { validateProduct, validateId, validatePagination, validateSearch } from '../middleware/validators.js';

const router = express.Router();

router.route('/').get(validatePagination, validateSearch, getProducts).post(protect, validateProduct, createProduct);
router.route('/:id').get(validateId, getProduct).put(protect, validateId, validateProduct, updateProduct).delete(protect, validateId, deleteProduct);

export default router;

