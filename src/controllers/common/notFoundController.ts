import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/ApiError';

export const notFoundController = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Cannot find ${req.originalUrl}`, 404));
};