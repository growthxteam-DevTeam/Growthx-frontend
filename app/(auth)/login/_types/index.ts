import type { z } from "zod";

import type { loginSchema } from "../_constants";

export type LoginValues = z.infer<typeof loginSchema>;
