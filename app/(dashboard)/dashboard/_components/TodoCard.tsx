import { ArchiveRestore, ListTodo } from "lucide-react";
import { useTranslations } from "next-intl";

import { TODO_ITEMS } from "../_constants";

const TodoCard = () => {
  const t = useTranslations("Dashboard.home.todo");

  return (
    <section className="rounded-lg border border-border bg-card px-3 py-4 shadow-sm">
      <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>

      <div className="mt-4 flex flex-col gap-3">
        {TODO_ITEMS.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
            {/* Checklist icon */}
            <ListTodo className="size-8 shrink-0 text-primary" strokeWidth={1.5} />

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-primary leading-snug">{t(`items.${item.key}`)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("points", { points: item.points })} &bull; {t("due")}
              </p>
            </div>

            {/* Submit icon */}
            <ArchiveRestore className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodoCard;
