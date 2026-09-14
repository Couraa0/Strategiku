import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service.js';
import { RegisterSchema, LoginSchema } from './auth.schema.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = RegisterSchema.parse(req.body);
      const result = await AuthService.register(validated);
      return sendSuccess(res, result, 'Registrasi berhasil', 201);
    } catch (err: any) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = LoginSchema.parse(req.body);
      const result = await AuthService.login(validated);
      return sendSuccess(res, result, 'Login berhasil', 200);
    } catch (err: any) {
      if (err.message === 'Email atau password tidak sesuai.') {
        return sendError(res, err.message, [], 401);
      }
      next(err);
    }
  }

  static async me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, 'Unauthenticated', [], 401);
      }
      const result = await AuthService.getMe(req.user.user_id);
      return sendSuccess(res, result, 'Data pengguna berhasil diambil');
    } catch (err: any) {
      next(err);
    }
  }

  static async logout(req: Request, res: Response) {
    return sendSuccess(res, null, 'Logout berhasil');
  }
}
