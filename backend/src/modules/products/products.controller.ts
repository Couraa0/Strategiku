import { Response, NextFunction } from 'express';
import { ProductsService } from './products.service.js';
import { sendSuccess } from '../../utils/response.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export class ProductsController {
  static getProducts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const products = ProductsService.getProducts(businessId);
      return sendSuccess(res, products, 'Daftar produk berhasil diambil');
    } catch (err) {
      next(err);
    }
  }

  static addProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const businessId = req.user?.business_id || 'UMKM001';
      const product = ProductsService.addProduct(businessId, req.body);
      return sendSuccess(res, product, 'Produk berhasil ditambahkan', 201);
    } catch (err) {
      next(err);
    }
  }

  static updateProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = ProductsService.updateProduct(id, req.body);
      return sendSuccess(res, product, 'Produk berhasil diperbarui');
    } catch (err) {
      next(err);
    }
  }

  static deleteProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = ProductsService.deleteProduct(id);
      return sendSuccess(res, result, 'Produk berhasil dihapus');
    } catch (err) {
      next(err);
    }
  }
}
