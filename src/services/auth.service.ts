import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET

export const signJWT = async (payload: {
  id: string;
  name: string;
  email: string;
}) => {
    const token = jwt.sign(payload, secret ?? "")
    return token;
};
