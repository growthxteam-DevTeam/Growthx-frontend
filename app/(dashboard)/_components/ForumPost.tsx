"use client";

import { useState } from "react";

import { formatDistanceToNow } from "date-fns";
import { ChevronDown, Pin, ThumbsDown, ThumbsUp } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { DiscussionComment } from "@/redux/features/discussion/discussionApi";

import { DATE_FNS_LOCALES } from "../_lib/dateLocale";
import Avatar from "./Avatar";
import { useDashboard } from "../dashboard/_hooks/useDashboard";

interface ForumPostProps {
  comment: DiscussionComment;
  /** Absent on replies: only top-level posts can be replied to. */
  onReply?: (content: string, parentId: string) => Promise<boolean>;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
}

const actionClassName = "flex cursor-pointer items-center gap-1 text-xs text-ink-muted hover:text-primary";

const ForumPost = ({ comment, onReply, onLike, onDislike }: ForumPostProps) => {
  const t = useTranslations("Dashboard.forum.post");
  const locale = useLocale() as Locale;
  const { name, profilePicture } = useDashboard();
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");

  const replyCount = comment.replies.length;

  const submitReply = async () => {
    const content = replyText.trim();
    if (!content || !onReply) return;

    if (await onReply(content, comment.id)) {
      setReplyText("");
      setIsReplying(false);
      setShowReplies(true);
    }
  };

  return (
    <li className="flex gap-3">
      <Avatar
        name={comment.author.name}
        src={comment.author.profilePicture}
        className="size-8 bg-tint text-[10px] text-ink-muted"
      />

      <div className="min-w-0 flex-1">
        {comment.pinned && (
          <p className="mb-0.5 flex items-center gap-1 text-[11px] text-ink-muted">
            <Pin className="size-3 text-ink" />
            {t("pinned")}
          </p>
        )}

        <p className="flex flex-wrap items-center gap-2">
          <span className="text-md text-ink">{comment.author.name}</span>
          {comment.staffPost && (
            <span className="rounded-md bg-tint px-2 py-0.5 text-[11px] font-medium text-primary">{t("staff")}</span>
          )}
          <span className="text-[11px] text-ink-muted">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: DATE_FNS_LOCALES[locale] })}
          </span>
        </p>

        <p className="mt-1 break-words text-[13px] text-ink">{comment.content}</p>

        <div className="mt-2 flex items-center gap-5">
          <button
            type="button"
            onClick={() => onLike(comment.id)}
            aria-pressed={comment.likedByMe}
            aria-label={comment.likedByMe ? t("removeLike") : t("like")}
            className={cn(actionClassName, comment.likedByMe && "text-primary")}
          >
            <ThumbsUp className={cn("size-3.5", comment.likedByMe && "fill-current")} />
            {comment.likes}
          </button>

          <button
            type="button"
            onClick={() => onDislike(comment.id)}
            aria-pressed={comment.dislikedByMe}
            aria-label={comment.dislikedByMe ? t("removeDislike") : t("dislike")}
            className={cn(actionClassName, comment.dislikedByMe && "text-primary")}
          >
            <ThumbsDown className={cn("size-3.5", comment.dislikedByMe && "fill-current")} />
          </button>

          {onReply && (
            <button
              type="button"
              onClick={() => setIsReplying((open) => !open)}
              className={cn(actionClassName, "font-medium text-ink")}
            >
              {t("reply")}
            </button>
          )}

          {replyCount > 0 && (
            <button
              type="button"
              onClick={() => setShowReplies((open) => !open)}
              aria-expanded={showReplies}
              className={cn(actionClassName, "font-medium text-primary")}
            >
              <ChevronDown className={cn("size-3.5 transition-transform", showReplies && "rotate-180")} />
              {t("replyCount", { count: replyCount })}
            </button>
          )}
        </div>

        {isReplying && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void submitReply();
            }}
            className="mt-3 flex items-center gap-3"
          >
            <Avatar name={name} src={profilePicture} className="size-7 bg-tint-strong text-[10px] text-primary" />
            <input
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              placeholder={t("replyTo", { name: comment.author.name })}
              maxLength={1000}
              autoFocus
              aria-label={t("replyToLabel", { name: comment.author.name })}
              className="flex-1 border-b border-border bg-transparent pb-1.5 text-sm outline-none placeholder:text-muted-foreground focus:border-field-focus"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="cursor-pointer text-xs font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("reply")}
            </button>
          </form>
        )}

        {showReplies && replyCount > 0 && (
          <ul className="mt-4 flex flex-col gap-4">
            {comment.replies.map((reply) => (
              <ForumPost key={reply.id} comment={reply} onLike={onLike} onDislike={onDislike} />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default ForumPost;
