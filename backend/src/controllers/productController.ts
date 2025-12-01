import { Response } from 'express';
import { Product, SubCategory } from '../models/index.js';
import { Op } from 'sequelize';
import { AuthRequest } from '../middleware/auth.js';
import { getCache, setCache, CACHE_KEYS, deleteCachePattern } from '../utils/cache.js';

// @desc    Get all products with pagination and search
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { subCategoryId, search, page, limit } = req.query;
    
    // Parse pagination params (only if provided)
    const pageNum = page ? parseInt(page as string) : 1;
    const limitNum = limit ? parseInt(limit as string) : undefined;
    const offset = limitNum ? (pageNum - 1) * limitNum : undefined;

    // Build cache key
    const cacheKey = `products_page${pageNum}_limit${limitNum || 'all'}_sub${subCategoryId || 'all'}_search${search || 'none'}`;
    
    // Check cache
    const cached = getCache<any>(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    const where: any = {};

    if (subCategoryId) {
      where.subCategoryId = subCategoryId;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // Build query options
    const queryOptions: any = {
      where,
      include: [
        {
          model: SubCategory,
          as: 'subCategory',
          attributes: ['id', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    };

    // Add pagination only if limit is specified
    if (limitNum) {
      queryOptions.limit = limitNum;
      queryOptions.offset = offset;
    }

    const { count, rows: products } = await Product.findAndCountAll(queryOptions);

    const response = {
      success: true,
      count: products.length,
      total: count,
      ...(limitNum && {
        page: pageNum,
        pages: Math.ceil(count / limitNum),
      }),
      data: products,
    };

    // Cache for 5 minutes
    setCache(cacheKey, response, 300);

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في جلب المنتجات.',
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const cacheKey = CACHE_KEYS.PRODUCT_BY_ID(parseInt(req.params.id));
    
    // Check cache
    const cached = getCache<any>(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: SubCategory,
          as: 'subCategory',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'المنتج غير موجود.',
      });
      return;
    }

    const response = {
      success: true,
      data: product,
    };

    // Cache for 1 hour
    setCache(cacheKey, response, 3600);

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في جلب المنتج.',
    });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { subCategoryId, name, description, specifications, price, image } = req.body;

    if (!subCategoryId || !name || !description || price === undefined) {
      res.status(400).json({
        success: false,
        message: 'جميع الحقول مطلوبة (subCategoryId, name, description, price).',
      });
      return;
    }

    const product = await Product.create({
      subCategoryId: parseInt(subCategoryId),
      name,
      description,
      specifications: specifications || '',
      price: parseFloat(price),
      image: image || '/images/placeholder.jpg',
    });

    const populated = await Product.findByPk(product.id, {
      include: [
        {
          model: SubCategory,
          as: 'subCategory',
          attributes: ['id', 'name'],
        },
      ],
    });

    // Clear products cache
    deleteCachePattern('products_');

    res.status(201).json({
      success: true,
      message: 'تم إنشاء المنتج بنجاح.',
      data: populated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في إنشاء المنتج.',
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'المنتج غير موجود.',
      });
      return;
    }

    if (req.body.price) {
      req.body.price = parseFloat(req.body.price);
    }
    if (req.body.subCategoryId) {
      req.body.subCategoryId = parseInt(req.body.subCategoryId);
    }

    await product.update(req.body);
    
    const updated = await Product.findByPk(product.id, {
      include: [
        {
          model: SubCategory,
          as: 'subCategory',
          attributes: ['id', 'name'],
        },
      ],
    });

    // Clear cache for this product and products list
    deleteCachePattern('products_');
    deleteCachePattern(`product_${req.params.id}`);

    res.status(200).json({
      success: true,
      message: 'تم تحديث المنتج بنجاح.',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في تحديث المنتج.',
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'المنتج غير موجود.',
      });
      return;
    }

    await product.destroy();

    // Clear cache
    deleteCachePattern('products_');
    deleteCachePattern(`product_${req.params.id}`);

    res.status(200).json({
      success: true,
      message: 'تم حذف المنتج بنجاح.',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في حذف المنتج.',
    });
  }
};
