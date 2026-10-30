"use client";

import { useTranslations } from "next-intl";

import { TOP_CONTRIBUTORS } from "../_constants";

const TopContributorsCard = () => {
  const t = useTranslations("Dashboard.alumniNetwork");

  return (
    <section className="rounded-lg border border-border bg-card p-[15px]">
      <h2 className="text-base font-semibold text-foreground">{t("contributors.title")}</h2>

      <ol className="mt-3 flex flex-col gap-3 text-sm">
        {TOP_CONTRIBUTORS.map(({ name, points }, index) => (
          <li key={name} className="flex items-center justify-between">
            <span className="flex items-center text-foreground">
              <span className="w-[21px] text-primary">{index + 1}.</span>
              {name}
            </span>
            <span className="text-primary">{t("points.value", { count: points })}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TopContributorsCard;
