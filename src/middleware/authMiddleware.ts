import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = (req: Request, res:Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json(ApiResponse.fail("authentication token is required"));
        return;
    }

    try {
        const decoded = verifyJWT(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json(ApiResponse.fail("authentication token is invalid"));
        
    }
}