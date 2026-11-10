"use client";

import { ArchiveRestore, ListTodo } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import { useDashboardContent } from "../_hooks/useDashboardContent";

const TodoCard = () => {
  const t = useTranslations("Dashboard.home.todo");
  const format = useFormatter();
  const { content } = useDashboardContent();
  const assignments = content?.assignments ?? [];

  return (
    <section className="rounded-lg border border-border bg-card px-3 py-4 shadow-sm">
      <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>

      <div className="mt-4 flex flex-col gap-3">
        {assignments.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
            {/* Checklist icon */}
            <ListTodo className="size-8 shrink-0 text-primary" strokeWidth={1.5} />

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-primary leading-snug break-words">{item.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("points", { points: item.points })} &bull;{" "}
                {t("due", {
                  date: format.dateTime(new Date(item.date), {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  }),
                })}
              </p>
            </div>

            {/* Submit icon */}
            <ArchiveRestore className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          </div>
        ))}
        {content && assignments.length === 0 && (
          <p className="rounded-lg border border-border px-4 py-4 text-center text-sm text-muted-foreground">
            {t("empty")}
          </p>
        )}
      </div>
    </section>
  );
};

export default TodoCard;
