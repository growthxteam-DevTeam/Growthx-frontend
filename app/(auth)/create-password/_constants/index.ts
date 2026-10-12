import { z } from "zod";

export const createPasswordSchema = z
  .object({
    gsCode: z.string().trim().min(1, "gsCodeRequired"),
    password: z
      .string()
      .min(8, "passwordMin")
      .regex(/\d/, "passwordNumber")
      .regex(/[A-Z]/, "passwordUppercase")
      .regex(/[^A-Za-z0-9]/, "passwordSpecial"),
    confirmPassword: z.string().min(1, "confirmPasswordRequired"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "passwordsMismatch",
    path: ["confirmPassword"],
  });

// Kept in step with the password rules in createPasswordSchema above.
export const PASSWORD_REQUIREMENTS = [
  { key: "length", pattern: /.{8,}/ },
  { key: "number", pattern: /\d/ },
  { key: "uppercase", pattern: /[A-Z]/ },
  { key: "special", pattern: /[^A-Za-z0-9]/ },
] as const;
