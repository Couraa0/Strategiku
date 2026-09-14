import { Response, NextFunction } from 'express';
import { DataUploadService } from './dataUpload.service.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export class DataUploadController {
  static uploadCSV(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return sendError(res, 'Silakan pilih file CSV untuk diunggah', [], 400);
      }

      const businessId = req.user?.business_id || 'UMKM001';
      const result = DataUploadService.processCSVUpload(req.file.buffer, businessId);

      if (!result.success) {
        return sendError(res, 'Validasi CSV gagal pada beberapa baris data', result.errors, 422);
      }

      return sendSuccess(res, result, 'Impor data bisnis berhasil diproses');
    } catch (err) {
      next(err);
    }
  }

  static getTemplate(req: AuthRequest, res: Response) {
    const csvContent = DataUploadService.getCSVTemplate();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="template_transaksi_aphyah.csv"');
    return res.status(200).send(csvContent);
  }
}
