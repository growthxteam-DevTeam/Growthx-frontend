import { useTranslations } from "next-intl";

import type { FrameworkT } from "@/types/global";

import type { OptionConfig } from "../_constants";

export const useOptions = () => {
  const t = useTranslations("Onboarding.options");

  return (options: OptionConfig[]): FrameworkT[] =>
    options.map(({ labelKey, value }) => ({ value, label: t(labelKey) }));
};
