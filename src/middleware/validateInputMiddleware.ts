import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({ errors: err.errors });
    }
  };
};