import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ROLE } from "../generated/prisma";

type User = {
  id: string;
  name: string;
  email: string;
  role: ROLE;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json(ApiResponse.fail("authentication token is required"));
    return;
  }

  try {
    const decoded = verifyJWT(token);
    req.user = decoded as User;
    next();
  } catch (error) {
    res.status(401).json(ApiResponse.fail("authentication token is invalid"));
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.user?.role;

  try {
    if (role !== "Admin") {
      res.status(403).json(ApiResponse.fail("Unauthorized access"));
      return;
    }
    next();
  } catch (error) {
    res.status(401).json(ApiResponse.fail("authentication token is invalid"));
  }
};
