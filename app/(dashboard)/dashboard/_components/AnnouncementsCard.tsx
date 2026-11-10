"use client";

import { Megaphone } from "lucide-react";
import { useTranslations } from "next-intl";

import { useDashboardContent } from "../_hooks/useDashboardContent";

const AnnouncementsCard = () => {
  const t = useTranslations("Dashboard.home.announcements");
  const { content } = useDashboardContent();
  const announcements = content?.announcements ?? [];

  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>

      <div className="mt-4 flex flex-col gap-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-4 text-center"
          >
            <Megaphone className="size-5 text-primary" />
            <p className="text-sm break-words whitespace-pre-wrap text-foreground">{announcement.text}</p>
          </div>
        ))}
        {content && announcements.length === 0 && (
          <p className="rounded-md border border-border px-4 py-4 text-center text-sm text-muted-foreground">
            {t("empty")}
          </p>
        )}
      </div>
    </section>
  );
};

export default AnnouncementsCard;
