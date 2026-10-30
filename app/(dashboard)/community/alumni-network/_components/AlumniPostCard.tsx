"use client";

import { Reply, ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import Avatar from "../../../_components/Avatar";
import type { AlumniPost } from "../_types";

interface AlumniPostCardProps {
  post: AlumniPost;
  onAction: () => void;
}

const AlumniPostCard = ({ post, onAction }: AlumniPostCardProps) => {
  const t = useTranslations("Dashboard.alumniNetwork");

  return (
    <article className="rounded-lg border border-border bg-card p-[19px]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={post.author} className="size-10 text-base" />
          <div className="flex flex-col gap-1">
            <p className="text-base leading-5 font-semibold text-foreground">{post.author}</p>
            <p className="text-sm text-muted-foreground">
              {t("post.cohort", { number: post.cohort })} · {post.role}
            </p>
          </div>
        </div>

        <span
          className={cn(
            "inline-flex h-[26px] shrink-0 items-center rounded-sm border px-2 text-sm",
            post.type === "offering"
              ? "border-success bg-success text-success-foreground"
              : "border-border bg-background text-foreground",
          )}
        >
          {t(`filters.${post.type}`)}
        </span>
      </div>

      <p className="mt-[18px] text-base text-foreground">{t(`post.content.${post.id}`)}</p>

      <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <span className="text-muted-foreground">{t("post.responses", { count: post.responses })}</span>
        <button type="button" onClick={onAction} className="flex cursor-pointer items-center gap-2 text-primary hover:underline">
          <Reply className="size-4" aria-hidden />
          {t(`post.actions.${post.action}`)}
        </button>
        <button type="button" onClick={onAction} className="flex cursor-pointer items-center gap-2 text-primary hover:underline">
          <ThumbsUp className="size-4" aria-hidden />
          {t("post.helpful")}
        </button>
      </div>
    </article>
  );
};

export default AlumniPostCard;
