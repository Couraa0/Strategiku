import { Router } from 'express';
import { RecommendationController } from './recommendation.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', RecommendationController.getRecommendations);

export default router;
