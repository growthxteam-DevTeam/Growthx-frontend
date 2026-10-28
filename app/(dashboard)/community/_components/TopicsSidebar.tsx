"use client";

import { Tag } from "lucide-react";

import { cn } from "@/lib/utils";

import { TOPICS } from "../_constants";

interface TopicsSidebarProps {
  activeTopic: string;
  onSelect: (topicId: string) => void;
}

const TopicsSidebar = ({ activeTopic, onSelect }: TopicsSidebarProps) => (
  <div className="w-full shrink-0 md:sticky md:top-6 md:w-44 md:self-start">
    <p className="text-sm text-muted-foreground">Topics</p>

    <div className="mt-3 flex flex-col gap-1">
      {TOPICS.map((topic) => {
        const isActive = topic.id === activeTopic;
        return (
          <button
            key={topic.id}
            type="button"
            onClick={() => onSelect(topic.id)}
            className={cn(
              "flex w-fit items-center gap-2 rounded-full px-3 py-2 text-left text-sm transition-colors",
              isActive
                ? "border border-primary bg-card font-bold text-primary"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            <Tag className="size-4 shrink-0" />
            {topic.label}
          </button>
        );
      })}
    </div>
  </div>
);

export default TopicsSidebar;
