import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { catchWrapper } from "../../utils/CatchWrapper";

async function getAdminHandler(
  req: Request,
  res: Response,
) {
  const user = req.user;

  res
    .status(200)
    .json(ApiResponse.success(user, "Admin profile fetched successfully!"));
}

const getAdminController = catchWrapper(getAdminHandler);
export default getAdminController;