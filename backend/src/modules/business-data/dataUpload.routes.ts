import { Router } from 'express';
import multer from 'multer';
import { DataUploadController } from './dataUpload.controller.js';
import { authenticateJwt } from '../../middleware/authMiddleware.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
const router = Router();

router.use(authenticateJwt);

router.post('/upload', upload.single('file'), DataUploadController.uploadCSV);
router.get('/template', DataUploadController.getTemplate);

export default router;
