import { NotebookText, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";

import { FORUM } from "../_constants";

const ForumTopicCard = () => {
  const t = useTranslations("Dashboard.discussionPage");

  return (
    <section className="flex flex-col items-stretch justify-between gap-8 rounded-lg border border-border bg-card p-10 shadow-md md:min-h-[460px] md:flex-row md:items-center">
      <div>
        <p className="text-sm font-medium text-primary">{t("label")}</p>
        <h2 className="mt-1 text-3xl font-bold text-primary">{FORUM.program}</h2>
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-primary">
          <NotebookText className="size-4" />
          {t("duration", { weeks: FORUM.durationWeeks })}
        </p>
      </div>

      <div className="flex min-h-[300px] w-full flex-col justify-between rounded-md bg-[#06003d] px-8 py-6 text-center text-white md:w-[46%]">
        <h3 className="text-xl font-semibold underline underline-offset-4">{t("topicTitle")}</h3>
        <p className="mx-auto max-w-xs text-base font-medium">{t("topic")}</p>
        <p className="flex items-center justify-center gap-2 text-[11px]">
          <Pencil className="size-3.5" />
          {t("topicNote")}
        </p>
      </div>
    </section>
  );
};

export default ForumTopicCard;
