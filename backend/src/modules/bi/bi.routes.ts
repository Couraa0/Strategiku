import { Router } from 'express';
import { BIController } from './bi.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/dashboard', BIController.getDashboard);
router.get('/insights', BIController.getInsights);
router.get('/trends', BIController.getTrends);
router.get('/products', BIController.getProductPerformance);

export default router;
