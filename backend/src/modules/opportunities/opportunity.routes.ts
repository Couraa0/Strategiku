import { Router } from 'express';
import { OpportunityController } from './opportunity.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', OpportunityController.getOpportunities);
router.get('/:id', OpportunityController.getById);

export default router;
