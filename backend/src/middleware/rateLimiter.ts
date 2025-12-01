import rateLimit from 'express-rate-limit';

// Rate limiter for login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'محاولات تسجيل دخول كثيرة جداً. يرجى المحاولة بعد 15 دقيقة.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for general API requests
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    success: false,
    message: 'طلبات كثيرة جداً. يرجى المحاولة لاحقاً.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for file uploads
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 uploads per hour
  message: {
    success: false,
    message: 'تم تجاوز حد رفع الملفات. يرجى المحاولة بعد ساعة.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
