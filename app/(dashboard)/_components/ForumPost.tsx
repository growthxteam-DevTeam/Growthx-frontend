"use client";

import { useState } from "react";

import { formatDistanceToNow } from "date-fns";
import { ChevronDown, Pin, ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DiscussionComment } from "@/redux/features/discussion/discussionApi";

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
            Pinned by Growth Space
          </p>
        )}

        <p className="flex flex-wrap items-center gap-2">
          <span className="text-md text-ink">{comment.author.name}</span>
          {comment.staffPost && (
            <span className="rounded-md bg-tint px-2 py-0.5 text-[11px] font-medium text-primary">Staff Post</span>
          )}
          <span className="text-[11px] text-ink-muted">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </p>

        <p className="mt-1 break-words text-[13px] text-ink">{comment.content}</p>

        <div className="mt-2 flex items-center gap-5">
          <button
            type="button"
            onClick={() => onLike(comment.id)}
            aria-pressed={comment.likedByMe}
            aria-label={comment.likedByMe ? "Remove like" : "Like"}
            className={cn(actionClassName, comment.likedByMe && "text-primary")}
          >
            <ThumbsUp className={cn("size-3.5", comment.likedByMe && "fill-current")} />
            {comment.likes}
          </button>

          <button
            type="button"
            onClick={() => onDislike(comment.id)}
            aria-pressed={comment.dislikedByMe}
            aria-label={comment.dislikedByMe ? "Remove dislike" : "Dislike"}
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
              Reply
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
              {replyCount} {replyCount === 1 ? "reply" : "replies"}
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
              placeholder={`Reply to ${comment.author.name}...`}
              maxLength={1000}
              autoFocus
              aria-label={`Reply to ${comment.author.name}`}
              className="flex-1 border-b border-border bg-transparent pb-1.5 text-sm outline-none placeholder:text-muted-foreground focus:border-field-focus"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="cursor-pointer text-xs font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reply
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
