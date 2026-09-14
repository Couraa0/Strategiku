import { Router } from 'express';
import { ProductsController } from './products.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', ProductsController.getProducts);
router.post('/', ProductsController.addProduct);
router.put('/:id', ProductsController.updateProduct);
router.delete('/:id', ProductsController.deleteProduct);

export default router;
