import jwt from "jsonwebtoken";
import { ROLE } from "../generated/prisma";

const secret = process.env.JWT_SECRET;

export const signJWT = (payload: {
  id: string;
  name: string;
  email: string;
  role: ROLE;
}) => {
  const token = jwt.sign(payload, secret ?? "");
  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, secret ?? "");

  return decoded;
};
