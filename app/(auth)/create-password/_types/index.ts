import type { z } from "zod";

import type { createPasswordSchema } from "../_constants";

export type CreatePasswordValues = z.infer<typeof createPasswordSchema>;
