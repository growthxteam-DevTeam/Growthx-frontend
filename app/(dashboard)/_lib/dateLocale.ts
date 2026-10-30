import { enUS, fr } from "date-fns/locale";

import type { Locale } from "@/i18n/config";

// date-fns locale for each supported UI language, for relative times like "2 hours ago".
export const DATE_FNS_LOCALES: Record<Locale, typeof enUS> = { en: enUS, fr };
