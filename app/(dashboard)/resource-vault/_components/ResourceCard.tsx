"use client";

import { useState } from "react";

import { Bookmark, ExternalLink, Newspaper, SquarePlay } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Resource } from "@/redux/features/resources/resourcesApi";

const formatDate = (iso: string | null, locale: string) =>
  iso ? new Date(iso).toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" }) : null;

// Bookmarks are local to this session until a saved-resources endpoint exists.
const ResourceCard = ({ resource, tag }: { resource: Resource; tag?: string }) => {
  const t = useTranslations("Dashboard.vault.card");
  const locale = useLocale();
  const [saved, setSaved] = useState(false);
  const SourceIcon = resource.type === "video" ? SquarePlay : Newspaper;
  const badge =
    resource.type === "video"
      ? t("video")
      : resource.readMinutes
        ? t("minRead", { minutes: resource.readMinutes })
        : t("article");
  const published = formatDate(resource.publishedAt, locale);

  return (
    <article className="relative rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-tint-strong text-primary">
            <SourceIcon className="size-4" />
          </span>
          <span className="truncate text-sm text-muted-foreground">{resource.source}</span>
        </div>
        <span className="shrink-0 text-xs font-medium text-muted-foreground">{badge}</span>
      </div>

      <div className="mt-3 flex items-start gap-4">
        <div className="min-w-0 flex-1">
          {/* Reading happens on the publisher's site, so the whole card (stretched link) opens it in a new tab. */}
          <h3 className="text-lg font-bold text-foreground">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary"
            >
              {resource.title}
              <span className="sr-only"> {t("opensIn", { source: resource.source })}</span>
            </a>
          </h3>
          {resource.summary && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{resource.summary}</p>}
        </div>

        {resource.imageUrl && (
          <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-md bg-muted sm:block">
            <Image src={resource.imageUrl} alt="" fill sizes="96px" unoptimized className="object-cover" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {tag && <span className="rounded-full bg-tint px-3 py-1 font-semibold text-primary">{tag}</span>}
          <span className="flex items-center gap-1 font-medium text-foreground">
            {t("readOn", { source: resource.source })}
            <ExternalLink className="size-3" />
          </span>
          {published && <span>{published}</span>}
        </div>
        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          aria-pressed={saved}
          aria-label={saved ? t("removeBookmark") : t("save")}
          className="relative z-10 shrink-0 cursor-pointer text-muted-foreground hover:text-primary"
        >
          <Bookmark className={cn("size-4", saved && "fill-current text-primary")} />
        </button>
      </div>
    </article>
  );
};

export default ResourceCard;
