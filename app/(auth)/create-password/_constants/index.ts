import { z } from "zod";

export const createPasswordSchema = z
  .object({
    gsCode: z.string().trim().min(1, "GS code is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/\d/, "Password must contain a number")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Kept in step with the password rules in createPasswordSchema above.
export const PASSWORD_REQUIREMENTS = [
  { label: "At least 8 characters long", pattern: /.{8,}/ },
  { label: "Contains at least one number", pattern: /\d/ },
  { label: "Contains at least one uppercase letter", pattern: /[A-Z]/ },
  { label: "Contains at least one special character", pattern: /[^A-Za-z0-9]/ },
];
