import { Router } from 'express';
import { AssistantController } from './assistant.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateJwt);

router.post('/chat', AssistantController.chat);
router.get('/history', AssistantController.getHistory);

export default router;
