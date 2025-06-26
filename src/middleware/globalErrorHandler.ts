import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
) => {
  const statusCode = 500;
  const message = "Something went wrong";

  console.error(
    `[${req.method}] ${req.originalUrl} → ${statusCode}: ${message}`
  );

  res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: (err as Error).stack,
    }),
  });
};
