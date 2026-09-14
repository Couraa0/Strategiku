import { Response, NextFunction } from 'express';
import { BIService } from './bi.service.js';
import { sendSuccess } from '../../utils/response.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export class BIController {
  static getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const data = BIService.getDashboard(businessId);
      return sendSuccess(res, data, 'Data dashboard BI berhasil diambil');
    } catch (err) {
      next(err);
    }
  }

  static getInsights(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const data = BIService.getInsights(businessId);
      return sendSuccess(res, { business_id: businessId, insights: data }, 'Data insight berhasil diambil');
    } catch (err) {
      next(err);
    }
  }

  static getTrends(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const data = BIService.getTrends(businessId);
      return sendSuccess(res, data, 'Data tren penjualan berhasil diambil');
    } catch (err) {
      next(err);
    }
  }

  static getProductPerformance(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const data = BIService.getProductPerformance(businessId);
      return sendSuccess(res, data, 'Data performa produk berhasil diambil');
    } catch (err) {
      next(err);
    }
  }
}
