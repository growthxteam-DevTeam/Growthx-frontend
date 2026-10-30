import { useTranslations } from "next-intl";

import { TRENDING_TOPIC_IDS } from "../_constants";

const TrendingCard = () => {
  const t = useTranslations("Dashboard.community.trending");

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-base font-bold text-foreground">{t("title")}</h2>

      <div className="mt-3 flex flex-wrap gap-2">
        {TRENDING_TOPIC_IDS.map((topic) => (
          <span key={topic} className="rounded-full bg-tint px-3 py-1.5 text-xs font-semibold text-primary">
            {t(`topics.${topic}`)}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TrendingCard;
