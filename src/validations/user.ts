import { z } from "zod";

export const userValidation = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(16),
    confirmPassword: z.string().min(8).max(16),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const loginValidation = z.object({
  name: z.string(),
  email: z.string().email(),
});
