import express from 'express';
import authRoutes from './authRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);

// Base API route
router.get('/', (req, res) => {
  res.json({ message: 'API v1 is online' });
});

export default router;
