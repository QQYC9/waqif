import { Response } from 'express';
import { Category, SubCategory, Product } from '../models/index.js';
import { AuthRequest } from '../middleware/auth.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const categories = await Category.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في جلب الفئات.',
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({
        success: false,
        message: 'الفئة غير موجودة.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في جلب الفئة.',
    });
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private
export const createCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, image } = req.body;

    if (!name) {
      res.status(400).json({
        success: false,
        message: 'اسم الفئة مطلوب.',
      });
      return;
    }

    const category = await Category.create({
      name,
      image: image || '/images/placeholder.jpg',
    });

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الفئة بنجاح.',
      data: category,
    });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({
        success: false,
        message: 'الفئة موجودة بالفعل.',
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في إنشاء الفئة.',
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
export const updateCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({
        success: false,
        message: 'الفئة غير موجودة.',
      });
      return;
    }

    await category.update(req.body);
    await category.reload();

    res.status(200).json({
      success: true,
      message: 'تم تحديث الفئة بنجاح.',
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في تحديث الفئة.',
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({
        success: false,
        message: 'الفئة غير موجودة.',
      });
      return;
    }

    // Delete associated subcategories and products (CASCADE will handle this)
    await category.destroy();

    res.status(200).json({
      success: true,
      message: 'تم حذف الفئة وجميع البيانات المرتبطة بها بنجاح.',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في حذف الفئة.',
    });
  }
};
