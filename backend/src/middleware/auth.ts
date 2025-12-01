import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export interface AuthRequest extends Request {
  user?: User;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'غير مصرح لك بالوصول. يرجى تسجيل الدخول.',
      });
      return;
    }

    try {
      // Verify JWT_SECRET exists
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
      
      // Get user from token
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      });
      
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'المستخدم غير موجود.',
        });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'رمز الدخول غير صحيح أو منتهي الصلاحية.',
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم.',
    });
  }
};
