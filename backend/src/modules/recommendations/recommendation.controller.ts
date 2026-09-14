import { Response, NextFunction } from 'express';
import { RecommendationService } from './recommendation.service.js';
import { sendSuccess } from '../../utils/response.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export class RecommendationController {
  static getRecommendations(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const recommendations = RecommendationService.getRecommendations(businessId);
      return sendSuccess(res, { recommendations }, 'Rekomendasi peluang usaha berhasil diambil');
    } catch (err) {
      next(err);
    }
  }
}
