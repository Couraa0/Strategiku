import { Router } from 'express';
import { OpportunityController } from './opportunity.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const router = Router();

router.get('/', OpportunityController.getOpportunities);
router.get('/:id', OpportunityController.getById);
router.post('/', authenticateJwt, OpportunityController.createOpportunity);

export default router;
