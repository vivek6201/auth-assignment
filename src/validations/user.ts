import { z } from "zod";
import { ROLE } from "../generated/prisma";

export const userValidation = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(16),
    confirmPassword: z.string().min(8).max(16),
    role: z.nativeEnum(ROLE),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const loginValidation = z.object({
  password: z.string().min(8).max(16),
  email: z.string().email(),
});

export const resetTokenValidation = z.object({
  email: z.string().email(),
});

export const resetPassValidation = z.object({
  password: z.string().min(8).max(16),
  confirmPassword: z.string().min(8).max(16),
});
