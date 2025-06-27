import { NextFunction, Request, Response } from "express";
import { findUser } from "../../services/user.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { signJWT } from "../../services/auth.service";
import { catchWrapper } from "../../utils/CatchWrapper";
import bcryptjs from "bcryptjs";

async function loginHandler(req: Request, res: Response, next: NextFunction) {
  const data = req.body;

  const user = await findUser(data.email);

  if (!user) {
    res.status(401).json(ApiResponse.fail("User not found"));
    return;
  }

  const isValidPass = await bcryptjs.compareSync(data.password, user.password);

  if (!isValidPass) {
    res.status(403).json(ApiResponse.fail("Invalid pass"));
    return;
  }

  const token = signJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
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
