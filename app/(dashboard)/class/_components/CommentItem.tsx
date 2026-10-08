"use client";

import { useState } from "react";

import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DiscussionComment } from "@/redux/features/discussion/discussionApi";

import Avatar from "../../_components/Avatar";
import CommentComposer from "./CommentComposer";

interface CommentItemProps {
  comment: DiscussionComment;
  onReply?: (content: string, parentId: string) => Promise<boolean>;
  onLike: (commentId: string) => void;
}

const CommentItem = ({ comment, onReply, onLike }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = async (content: string) => {
    const saved = await onReply?.(content, comment.id);
    if (saved) setIsReplying(false);
    return Boolean(saved);
  };

  return (
    <li className="flex gap-3">
      <Avatar name={comment.author.name} src={comment.author.profilePicture} className="size-7 text-[10px]" />

      <div className="min-w-0 flex-1">
        <p className="text-[11px]">
          <span className="font-semibold text-primary">{comment.author.name}</span>
          <span className="ml-2 text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </p>
        <p className="mt-0.5 break-words text-xs text-foreground">{comment.content}</p>

        <div className="mt-1 flex items-center gap-4 text-[10px] text-muted-foreground">
          {onReply && (
            <button type="button" onClick={() => setIsReplying((open) => !open)} className="hover:text-primary">
              Reply
            </button>
          )}
          <button
            type="button"
            onClick={() => onLike(comment.id)}
            aria-pressed={comment.likedByMe}
            aria-label={comment.likedByMe ? "Unlike comment" : "Like comment"}
            className={cn("flex items-center gap-1 hover:text-primary", comment.likedByMe && "text-primary")}
          >
            <Heart className={cn("size-3", comment.likedByMe && "fill-current")} />
            {comment.likes}
          </button>
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

        {comment.replies.length > 0 && (
          <ul className="mt-3 flex flex-col gap-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} onLike={onLike} />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default CommentItem;
