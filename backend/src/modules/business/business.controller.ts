import { Response, NextFunction } from 'express';
import { BusinessService } from './business.service.js';
import { sendSuccess } from '../../utils/response.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export class BusinessController {
  static getBusiness(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const data = BusinessService.getBusiness(businessId);
      return sendSuccess(res, data, 'Data bisnis berhasil diambil');
    } catch (err) {
      next(err);
    }
  }

  static updateBusiness(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const data = BusinessService.updateBusiness(businessId, req.body);
      return sendSuccess(res, data, 'Profil bisnis berhasil diperbarui');
    } catch (err) {
      next(err);
    }
  }

  static getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const data = BusinessService.getProfile(businessId);
      return sendSuccess(res, data, 'Detail profil bisnis berhasil diambil');
    } catch (err) {
      next(err);
    }
  }

  static updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const data = BusinessService.updateProfile(businessId, req.body);
      return sendSuccess(res, data, 'Detail profil bisnis berhasil diperbarui');
    } catch (err) {
      next(err);
    }
  }
}
