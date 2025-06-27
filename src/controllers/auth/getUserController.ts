import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchWrapper } from "../../utils/CatchWrapper";

async function getUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;

  res
    .status(200)
    .json(ApiResponse.success(user, "User profile fetched successfully!"));
}

const getUserController = catchWrapper(getUserHandler);
export default getUserController;