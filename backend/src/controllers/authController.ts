import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { User } from '../models/index.js';

// Generate JWT Token
const generateToken = (id: number): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (userExists) {
      res.status(400).json({
        success: false,
        message: 'المستخدم موجود بالفعل.',
      });
      return;
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role: 'admin',
    });

    const userId = user.getDataValue('id');
    const token = generateToken(userId);

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح.',
      token,
      user: {
        id: userId,
        username: user.getDataValue('username'),
        email: user.getDataValue('email'),
        role: user.getDataValue('role'),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في إنشاء الحساب.',
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: 'يرجى إدخال اسم المستخدم وكلمة المرور.',
      });
      return;
    }

    // Check for user
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
      },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة.',
      });
      return;
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة.',
      });
      return;
    }

    const userId = user.getDataValue('id');
    const token = generateToken(userId);

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح.',
      token,
      user: {
        id: userId,
        username: user.getDataValue('username'),
        email: user.getDataValue('email'),
        role: user.getDataValue('role'),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في تسجيل الدخول.',
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'خطأ في جلب البيانات.',
    });
  }
};
