import { Response, NextFunction } from 'express';
import { AssistantService } from './assistant.service.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export class AssistantController {
  static async chat(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { question } = req.body;
      if (!question || typeof question !== 'string') {
        return sendError(res, 'Pertanyaan wajib diisi', [], 400);
      }

      const businessId = req.user?.business_id || 'UMKM001';
      const result = await AssistantService.processChat(businessId, question);
      return sendSuccess(res, result, 'Jawaban AI berhasil dihasilkan');
    } catch (err) {
      next(err);
    }
  }

  static getHistory(req: AuthRequest, res: Response) {
    const history = AssistantService.getHistory();
    return sendSuccess(res, history, 'Riwayat percakapan berhasil diambil');
  }
}
