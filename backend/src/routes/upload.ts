import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect } from '../middleware/auth.js';
import { uploadLimiter } from '../middleware/rateLimiter.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = process.env.UPLOAD_DIR || path.join(__dirname, '../../uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    // Sanitize filename
    const sanitizedName = file.fieldname.replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, sanitizedName + '-' + uniqueSuffix + ext);
  },
});

// Enhanced file filter with MIME type validation
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allowed MIME types
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  // Allowed extensions
  const allowedExtensions = /jpeg|jpg|png|gif|webp/;
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMimeTypes.includes(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مدعوم. يرجى رفع صورة (jpg, png, gif, webp) فقط.'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
    files: 1, // Only one file at a time
  },
  fileFilter,
});

const router = express.Router();

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
router.post('/', protect, uploadLimiter, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'لم يتم رفع أي ملف.',
    });
  }

  // Additional security: Check file size again
  if (req.file.size > parseInt(process.env.MAX_FILE_SIZE || '5242880')) {
    return res.status(400).json({
      success: false,
      message: 'حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت.',
    });
  }

  res.status(200).json({
    success: true,
    message: 'تم رفع الصورة بنجاح.',
    data: {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
});

export default router;

