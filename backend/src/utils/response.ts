import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  message: string;
  errors?: any[];
}

export const sendSuccess = <T>(res: Response, data: T, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

export const sendError = (res: Response, message = 'An error occurred', errors: any[] = [], statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    data: null,
    message,
    errors,
  });
};
