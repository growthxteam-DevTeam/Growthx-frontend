import { useTranslations } from "next-intl";

import { Progress } from "@/components/ui/progress";

import { BADGE_PROGRESS } from "../_constants";

const BadgeProgressCard = () => {
  const t = useTranslations("Dashboard.community.badge");
  const percent = Math.round((BADGE_PROGRESS.completedMilestones / BADGE_PROGRESS.totalMilestones) * 100);

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-base font-bold text-foreground">{t("title")}</h2>
      <Progress value={percent} className="mt-4" />
      <p className="mt-2 text-xs text-muted-foreground">
        {t("progress", { done: BADGE_PROGRESS.completedMilestones, total: BADGE_PROGRESS.totalMilestones })}
      </p>
    </section>
  );
};

export default BadgeProgressCard;
