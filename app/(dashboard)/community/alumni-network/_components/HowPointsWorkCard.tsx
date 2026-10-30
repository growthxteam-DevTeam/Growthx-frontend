"use client";

import { useTranslations } from "next-intl";

import { POINT_RULES } from "../_constants";

const HowPointsWorkCard = () => {
  const t = useTranslations("Dashboard.alumniNetwork.howPoints");

  return (
    <section className="rounded-lg border border-border bg-card p-[11px]">
      <h2 className="text-base font-semibold text-foreground">{t("title")}</h2>

      <ul className="mt-3 flex flex-col gap-1.5 text-sm">
        {POINT_RULES.map(({ id, points }) => (
          <li key={id} className="flex items-center justify-between">
            <span className="text-muted-foreground">{t(id)}</span>
            <span className="text-primary">+{points}</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs leading-4 text-muted-foreground/70">{t("note")}</p>
    </section>
  );
};

export default HowPointsWorkCard;
