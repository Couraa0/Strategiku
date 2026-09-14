import { Response, NextFunction } from 'express';
import { TransactionsService } from './transactions.service.js';
import { sendSuccess } from '../../utils/response.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export class TransactionsController {
  static getTransactions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const { channel, customer_type, search } = req.query as Record<string, string>;
      const result = TransactionsService.getTransactions(businessId, { channel, customer_type, search });
      return sendSuccess(res, result, 'Daftar transaksi berhasil diambil');
    } catch (err) {
      next(err);
    }
  }

  static getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = TransactionsService.getTransactionById(id);
      return sendSuccess(res, result, 'Detail transaksi berhasil diambil');
    } catch (err) {
      next(err);
    }
  }

  static create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const result = TransactionsService.createTransaction(businessId, req.body);
      return sendSuccess(res, result, 'Transaksi berhasil ditambahkan', 201);
    } catch (err) {
      next(err);
    }
  }
}
