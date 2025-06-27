import { prisma } from "../lib/db";
import bcryptjs from "bcryptjs"
import { ApiError } from "../utils/ApiError";

export const findUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return null;
  }
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const hashPass = bcryptjs.hashSync(data.password, 10);
    
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPass,
      },
    });
    return user;
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw new ApiError("Unable to create User", 500)
  }
};
