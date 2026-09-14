import { Router } from 'express';
import { BusinessController } from './business.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', BusinessController.getBusiness);
router.put('/', BusinessController.updateBusiness);
router.get('/profile', BusinessController.getProfile);
router.put('/profile', BusinessController.updateProfile);

export default router;
