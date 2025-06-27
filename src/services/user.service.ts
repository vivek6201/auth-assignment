import { prisma } from "../lib/db";
import bcryptjs from "bcryptjs";
import { ApiError } from "../utils/ApiError";
import { ROLE } from "../generated/prisma";

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
  role: ROLE;
}) => {
  try {
    const hashPass = bcryptjs.hashSync(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPass,
        role: data.role,
      },
    });
    return user;
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw new ApiError("Unable to create User", 500);
  }
};

export const generateResetUrl = async (id: string) => {
  const appUrl = process.env.APP_URL;
  try {
    const token = crypto.randomUUID();
    const resetToken = await prisma.resetToken.create({
      data: {
        userId: id,
        token,
      },
    });

    const url = `${appUrl}/api/v1/auth/reset-pass?token=${resetToken.token}&userId=${id}`;

    return url;
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw new ApiError("Unable to create reset url", 500);
  }
};

export const verifyResetToken = async (tokenString: string, id: string) => {
  try {
    const token = await prisma.resetToken.findFirst({
      where: {
        userId: id,
        token: tokenString,
      },
    });

    if (!token) {
      return {
        message: "Invalid token",
        status: false,
      };
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    if (token.createdAt < fiveMinutesAgo) {
      return {
        message: "Token expired",
        status: false,
      };
    }

    return {
      message: "Token verified",
      status: true,
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw new ApiError(
      error instanceof Error ? error.message : "Unable to verify token",
      500
    );
  }
};

export const resetPass = async (password: string, id:string) => {
  try {
    const hashPass = await bcryptjs.hash(password, 10);
    await prisma.user.update({
      where:{
        id
      },
      data:{
        password: hashPass
      }
    })

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
