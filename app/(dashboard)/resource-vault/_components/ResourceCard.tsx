"use client";

import { useState } from "react";

import { Bookmark, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ResourceItem } from "../_types";

// Bookmarks are local to this session until a saved-resources endpoint exists.
const ResourceCard = ({ resource }: { resource: ResourceItem }) => {
  const [saved, setSaved] = useState(false);
  const SourceIcon = resource.sourceIcon;

  return (
    <article className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-tint-strong text-primary">
            <SourceIcon className="size-4" />
          </span>
          <span className="truncate text-sm text-muted-foreground">{resource.sourceLabel}</span>
        </div>
        <span className="shrink-0 text-xs font-medium text-muted-foreground">{resource.typeBadge}</span>
      </div>

      <h3 className="mt-3 text-lg font-bold text-foreground">{resource.title}</h3>

      {resource.recommended && (
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-primary">
          <Sparkles className="size-3.5 shrink-0" />
          Recommended for you, based on your profile
        </p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-tint px-3 py-1 text-xs font-semibold text-primary">{resource.tag}</span>
        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          aria-pressed={saved}
          aria-label={saved ? "Remove bookmark" : "Save resource"}
          className="cursor-pointer text-muted-foreground hover:text-primary"
        >
          <Bookmark className={cn("size-4", saved && "fill-current text-primary")} />
        </button>
      </div>
    </article>
  );
};

export default ResourceCard;
