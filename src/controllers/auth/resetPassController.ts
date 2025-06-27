import { Request, Response } from "express";
import { catchWrapper } from "../../utils/CatchWrapper";
import {
  findUser,
  generateResetUrl,
  resetPass,
  verifyResetToken,
} from "../../services/user.service";
import { ApiResponse } from "../../utils/ApiResponse";

const resetTokenHandler = async (req: Request, res: Response) => {
  const data = req.body;
  const user = await findUser(data.email);

  if (!user) {
    res.status(401).json(ApiResponse.fail("User Not Found"));
    return;
  }

  const resetUrl = await generateResetUrl(user.id);

  res
    .status(200)
    .json(ApiResponse.success({ resetUrl }, "Reset Token generated"));
};

const resetPassHandler = async (req: Request, res: Response) => {
  const data = req.body;
  const { token, userId } = req.query;

  const isVerified = await verifyResetToken(token as string, userId as string);

  if (!isVerified.status) {
    res.status(403).json(ApiResponse.fail(isVerified.message));
    return;
  }

  await resetPass(data.password, userId as string);

  res
    .status(200)
    .json(ApiResponse.success(null, "Password reset is successful"));
};

const resetTokenController = catchWrapper(resetTokenHandler);
const resetPassController = catchWrapper(resetPassHandler);

export { resetTokenController, resetPassController };
