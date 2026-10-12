import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("emailInvalid").trim(),
  password: z.string().min(1, "passwordRequired"),
  rememberMe: z.boolean(),
});
