"use client";

import { useState } from "react";

import { formatDistanceToNow } from "date-fns";
import { ChevronDown, Pin, ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DiscussionComment } from "@/redux/features/discussion/discussionApi";

import Avatar from "../../_components/Avatar";
import CommentComposer from "./CommentComposer";

interface CommentItemProps {
  comment: DiscussionComment;
  onReply?: (content: string, parentId: string) => Promise<boolean>;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
}

const CommentItem = ({ comment, onReply, onLike, onDislike }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const replyCount = comment.replies.length;

  const handleReply = async (content: string) => {
    const saved = await onReply?.(content, comment.id);
    if (saved) setIsReplying(false);
    return Boolean(saved);
  };

  return (
    <li className="flex flex-col gap-1">
      {comment.pinned && (
        <p className="ml-10 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Pin className="size-3" />
          Pinned by Growth Space
        </p>
      )}

      <div className="flex gap-3">
        <Avatar name={comment.author.name} src={comment.author.profilePicture} className="size-7 text-[10px]" />

        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="font-serif text-lg font-semibold text-primary">{comment.author.name}</span>
            {comment.staffPost && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                Staff Post
              </span>
            )}
            <span className="text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </p>
          <p className="mt-0.5 wrap-break-word text-md text-foreground">{comment.content}</p>

          <div className="mt-1 flex items-center gap-4 text-[10px] text-muted-foreground">
            <button
              type="button"
              onClick={() => onLike(comment.id)}
              aria-pressed={comment.likedByMe}
              aria-label={comment.likedByMe ? "Unlike comment" : "Like comment"}
              className={cn("flex items-center gap-1 hover:text-primary", comment.likedByMe && "text-primary")}
            >
              <ThumbsUp className={cn("size-3", comment.likedByMe && "fill-current")} />
              {comment.likes}
            </button>
            <button
              type="button"
              onClick={() => onDislike(comment.id)}
              aria-pressed={comment.dislikedByMe}
              aria-label={comment.dislikedByMe ? "Remove dislike" : "Dislike comment"}
              className={cn("hover:text-primary", comment.dislikedByMe && "text-primary")}
            >
              <ThumbsDown className={cn("size-3", comment.dislikedByMe && "fill-current")} />
            </button>
            {onReply && (
              <button type="button" onClick={() => setIsReplying((open) => !open)} className="hover:text-primary">
                Reply
              </button>
            )}
            {replyCount > 0 && (
              <button
                type="button"
                onClick={() => setShowReplies((open) => !open)}
                className="flex items-center gap-1 hover:text-primary"
              >
                <ChevronDown className={cn("size-3 transition-transform", showReplies && "rotate-180")} />
                {replyCount} {replyCount === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>

          {isReplying && (
            <div className="mt-2 flex">
              <CommentComposer
                placeholder={`Reply to ${comment.author.name}...`}
                submitLabel="Reply"
                onSubmit={handleReply}
                onCancel={() => setIsReplying(false)}
                autoFocus
              />
            </div>
          )}

          {showReplies && replyCount > 0 && (
            <ul className="mt-3 flex flex-col gap-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} onLike={onLike} onDislike={onDislike} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
