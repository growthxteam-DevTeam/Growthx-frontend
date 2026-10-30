"use client";

import { Tag } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { TOPIC_IDS } from "../_constants";

interface TopicsSidebarProps {
  activeTopic: string;
  onSelect: (topicId: string) => void;
}

const TopicsSidebar = ({ activeTopic, onSelect }: TopicsSidebarProps) => {
  const t = useTranslations("Dashboard.community");

  return (
    <div className="w-full shrink-0 md:sticky md:top-6 md:w-44 md:self-start">
      <p className="text-sm text-muted-foreground">{t("topicsLabel")}</p>

      <div className="mt-3 flex flex-col gap-1">
        {TOPIC_IDS.map((id) => {
          const isActive = id === activeTopic;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={cn(
                "flex w-fit items-center gap-2 rounded-full px-3 py-2 text-left text-sm transition-colors",
                isActive
                  ? "border border-primary bg-card font-bold text-primary"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              <Tag className="size-4 shrink-0" />
              {t(`topics.${id}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicsSidebar;
