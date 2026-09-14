import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authenticateJwt, AuthController.me);
router.post('/logout', AuthController.logout);

export default router;
