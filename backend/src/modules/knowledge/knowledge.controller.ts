import { Response, NextFunction } from 'express';
import { KnowledgeService } from './knowledge.service.js';
import { sendSuccess } from '../../utils/response.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export class KnowledgeController {
  static getDocuments(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const docs = KnowledgeService.getDocuments(businessId);
      return sendSuccess(res, docs, 'Daftar dokumen knowledge base berhasil diambil');
    } catch (err) {
      next(err);
    }
  }

  static addDocument(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const doc = KnowledgeService.addDocument(businessId, req.body);
      return sendSuccess(res, doc, 'Dokumen knowledge base berhasil ditambahkan', 201);
    } catch (err) {
      next(err);
    }
  }

  static updateDocument(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const doc = KnowledgeService.updateDocument(id, req.body);
      return sendSuccess(res, doc, 'Dokumen knowledge base berhasil diperbarui');
    } catch (err) {
      next(err);
    }
  }

  static deleteDocument(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = KnowledgeService.deleteDocument(id);
      return sendSuccess(res, result, 'Dokumen knowledge base berhasil dihapus');
    } catch (err) {
      next(err);
    }
  }
}
