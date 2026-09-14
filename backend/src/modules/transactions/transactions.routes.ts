import { Router } from 'express';
import { TransactionsController } from './transactions.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', TransactionsController.getTransactions);
router.post('/', TransactionsController.create);
router.get('/:id', TransactionsController.getById);

export default router;
