import { Router } from 'express';
import { KnowledgeController } from './knowledge.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', KnowledgeController.getDocuments);
router.post('/', KnowledgeController.addDocument);
router.put('/:id', KnowledgeController.updateDocument);
router.delete('/:id', KnowledgeController.deleteDocument);

export default router;
