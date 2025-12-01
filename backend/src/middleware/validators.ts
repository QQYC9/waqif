import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation error handler
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: errors.array(),
    });
  }
  next();
};

// Auth validators
export const validateLogin = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('اسم المستخدم يجب أن يكون بين 3 و 50 حرف')
    .escape(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  handleValidationErrors,
];

export const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('اسم المستخدم يجب أن يكون بين 3 و 50 حرف')
    .escape(),
  body('email')
    .trim()
    .isEmail()
    .withMessage('البريد الإلكتروني غير صحيح')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  handleValidationErrors,
];

// Category validators
export const validateCategory = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('اسم الفئة يجب أن يكون بين 2 و 100 حرف')
    .escape(),
  body('image')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('مسار الصورة طويل جداً'),
  handleValidationErrors,
];

// SubCategory validators
export const validateSubCategory = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('اسم القسم الفرعي يجب أن يكون بين 2 و 100 حرف')
    .escape(),
  body('categoryId')
    .isInt({ min: 1 })
    .withMessage('معرف الفئة غير صحيح'),
  body('image')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('مسار الصورة طويل جداً'),
  handleValidationErrors,
];

// SubCategory update validator (categoryId is optional for updates)
export const validateSubCategoryUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('اسم القسم الفرعي يجب أن يكون بين 2 و 100 حرف')
    .escape(),
  body('categoryId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('معرف الفئة غير صحيح'),
  body('image')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('مسار الصورة طويل جداً'),
  handleValidationErrors,
];

// Product validators
export const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('اسم المنتج يجب أن يكون بين 2 و 200 حرف')
    .escape(),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('الوصف يجب أن يكون بين 10 و 2000 حرف'),
  body('specifications')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('المواصفات طويلة جداً'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('السعر يجب أن يكون رقم موجب'),
  body('subCategoryId')
    .isInt({ min: 1 })
    .withMessage('معرف القسم الفرعي غير صحيح'),
  body('image')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('مسار الصورة طويل جداً'),
  handleValidationErrors,
];

// ID parameter validator
export const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('المعرف غير صحيح'),
  handleValidationErrors,
];

// Pagination validators
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('رقم الصفحة يجب أن يكون رقم موجب'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('حد النتائج يجب أن يكون بين 1 و 100'),
  handleValidationErrors,
];

// Search validator
export const validateSearch = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('نص البحث يجب أن يكون بين 2 و 100 حرف')
    .escape(),
  handleValidationErrors,
];
