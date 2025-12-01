import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateLogin, validateRegister } from '../middleware/validators.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', loginLimiter, validateLogin, login);
router.get('/me', protect, getMe);

export default router;

