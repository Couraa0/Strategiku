import express from 'express';
import { getProfile } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected route example
router.get('/profile', requireAuth, getProfile);

export default router;
