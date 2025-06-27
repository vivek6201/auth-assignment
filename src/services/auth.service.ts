import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const signJWT = (payload: {
  id: string;
  name: string;
  email: string;
}) => {
  const token = jwt.sign(payload, secret ?? "");
  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token , secret ?? "")

  return decoded;
}