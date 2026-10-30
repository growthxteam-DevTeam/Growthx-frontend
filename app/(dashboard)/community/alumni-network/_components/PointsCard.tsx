"use client";

import { useTranslations } from "next-intl";

import { ALUMNI_POINTS } from "../_constants";

const PointsCard = () => {
  const t = useTranslations("Dashboard.alumniNetwork.points");
  const percent = Math.min(100, Math.round((ALUMNI_POINTS.total / ALUMNI_POINTS.goal) * 100));

  return (
    <section className="rounded-lg border border-border bg-card p-[15px]">
      <h2 className="text-base font-semibold text-foreground">{t("title")}</h2>
      <p className="mt-3 text-sm text-primary">{t("value", { count: ALUMNI_POINTS.total })}</p>
      <div
        role="progressbar"
        aria-label={t("title")}
        aria-valuemin={0}
        aria-valuemax={ALUMNI_POINTS.goal}
        aria-valuenow={ALUMNI_POINTS.total}
        className="mt-2 h-1 overflow-hidden rounded-full bg-foreground/15"
      >
        <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
};

export default PointsCard;
