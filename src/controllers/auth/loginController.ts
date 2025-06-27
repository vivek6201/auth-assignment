import { NextFunction, Request, Response } from "express";
import { findUser } from "../../services/user.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { signJWT } from "../../services/auth.service";
import { catchWrapper } from "../../utils/CatchWrapper";

async function loginHandler(req: Request, res: Response, next: NextFunction) {
  const data = req.body;

  const user = await findUser(data.email);

  if (!user) {
    res.status(401).json(ApiResponse.fail("User not found"));
    return;
  }

  const token = signJWT({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  res.status(200).json(
    ApiResponse.success(
      {
        token,
      },
      "User LoggedIn successfully"
    )
  );
}

const loginController = catchWrapper(loginHandler);
export default loginController;
