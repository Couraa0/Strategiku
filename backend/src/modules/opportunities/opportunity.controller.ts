import { Response, NextFunction } from 'express';
import { OpportunityService } from './opportunity.service.js';
import { sendSuccess } from '../../utils/response.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export class OpportunityController {
  static getOpportunities(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { category, location, type, status } = req.query as Record<string, string>;
      const list = OpportunityService.getOpportunities({ category, location, type, status });
      return sendSuccess(res, list, 'Daftar peluang usaha berhasil diambil');
    } catch (err) {
      next(err);
    }
  }

  static getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const opp = OpportunityService.getOpportunityById(id);
      return sendSuccess(res, opp, 'Detail peluang usaha berhasil diambil');
    } catch (err) {
      next(err);
    }
  }
}
