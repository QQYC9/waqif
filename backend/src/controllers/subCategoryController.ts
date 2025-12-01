import { Response } from 'express';
import { SubCategory, Product, Category } from '../models/index.js';
import { AuthRequest } from '../middleware/auth.js';

// @desc    Get all subcategories
// @route   GET /api/subcategories
// @access  Public
export const getSubCategories = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.query;
    const where: any = {};
    
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const subCategories = await SubCategory.findAll({
      where,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      count: subCategories.length,
      data: subCategories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في جلب الأقسام الفرعية.',
    });
  }
};

// @desc    Get single subcategory
// @route   GET /api/subcategories/:id
// @access  Public
export const getSubCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!subCategory) {
      res.status(404).json({
        success: false,
        message: 'القسم الفرعي غير موجود.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في جلب القسم الفرعي.',
    });
  }
};

// @desc    Create subcategory
// @route   POST /api/subcategories
// @access  Private
export const createSubCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { categoryId, name, image } = req.body;

    if (!categoryId || !name) {
      res.status(400).json({
        success: false,
        message: 'معرف الفئة الرئيسية واسم القسم الفرعي مطلوبان.',
      });
      return;
    }

    const subCategory = await SubCategory.create({
      categoryId: parseInt(categoryId),
      name,
      image: image || '/images/placeholder.jpg',
    });

    const populated = await SubCategory.findByPk(subCategory.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'تم إنشاء القسم الفرعي بنجاح.',
      data: populated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في إنشاء القسم الفرعي.',
    });
  }
};

// @desc    Update subcategory
// @route   PUT /api/subcategories/:id
// @access  Private
export const updateSubCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id);

    if (!subCategory) {
      res.status(404).json({
        success: false,
        message: 'القسم الفرعي غير موجود.',
      });
      return;
    }

    await subCategory.update(req.body);
    
    const updated = await SubCategory.findByPk(subCategory.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: 'تم تحديث القسم الفرعي بنجاح.',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في تحديث القسم الفرعي.',
    });
  }
};

// @desc    Delete subcategory
// @route   DELETE /api/subcategories/:id
// @access  Private
export const deleteSubCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id);

    if (!subCategory) {
      res.status(404).json({
        success: false,
        message: 'القسم الفرعي غير موجود.',
      });
      return;
    }

    // CASCADE will handle associated products
    await subCategory.destroy();

    res.status(200).json({
      success: true,
      message: 'تم حذف القسم الفرعي وجميع المنتجات المرتبطة به بنجاح.',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في حذف القسم الفرعي.',
    });
  }
};
