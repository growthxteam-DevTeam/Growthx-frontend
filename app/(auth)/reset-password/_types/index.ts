import type { z } from "zod";

import type { resetPasswordSchema } from "../_constants";

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
