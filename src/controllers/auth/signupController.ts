import { NextFunction, Request, Response } from "express";
import { catchWrapper } from "../../utils/CatchWrapper";
import { createUser, findUser } from "../../services/user.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { signJWT } from "../../services/auth.service";

async function signupHandler(req: Request, res: Response, next: NextFunction) {
  const data = req.body;

  const user = await findUser(data.email);

  if (user) {
    res.status(401).json(ApiResponse.fail("User Already Exists"));
    return;
  }

  const newUser = await createUser({
    email: data.email,
    name: data.name,
    password: data.password,
    role: data.role,
  });

  const token = signJWT({
    email: newUser.email,
    name: newUser.name,
    id: newUser.id,
    role: newUser.role,
  });

  res
    .status(200)
    .json(ApiResponse.success({ token }, "User registered successfully"));
}

const signupController = catchWrapper(signupHandler);
export default signupController;
