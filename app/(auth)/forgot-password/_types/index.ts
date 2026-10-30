import type { z } from "zod";

import type { forgotPasswordSchema } from "../_constants";

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
