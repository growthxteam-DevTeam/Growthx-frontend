"use client";

import { Button } from "@/components/ui/button";

import Avatar from "../../_components/Avatar";
import { useDashboard } from "../../dashboard/_hooks/useDashboard";
import { CURRENT_CLASS } from "../_constants";
import { useDiscussion } from "../_hooks/useDiscussion";
import CommentComposer from "./CommentComposer";
import CommentItem from "./CommentItem";

const DiscussionForum = () => {
  const { name, profilePicture } = useDashboard();
  const { comments, total, isLoading, isLoadingMore, isError, hasMore, showMore, addComment, isPosting, likeComment } =
    useDiscussion(CURRENT_CLASS.id);

  return (
    <section className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-sm font-bold text-primary">Discussion Forum</h2>
        <span className="text-[10px] text-muted-foreground">
          {total} {total === 1 ? "comment" : "comments"}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Avatar name={name} src={profilePicture} className="size-7 text-[10px]" />
        <CommentComposer
          placeholder="Add a comment..."
          submitLabel="Post"
          onSubmit={(content) => addComment(content)}
          isSubmitting={isPosting}
        />
      </div>

      <div className="mt-5">
        {isLoading ? (
          <p className="text-xs text-muted-foreground">Loading discussion...</p>
        ) : isError ? (
          <p className="text-xs text-destructive">Could not load the discussion. Please try again shortly.</p>
        ) : comments.length === 0 ? (
          <p className="text-xs text-muted-foreground">No comments yet. Start the conversation!</p>
        ) : (
          <ul className="flex flex-col gap-5">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} onReply={addComment} onLike={likeComment} />
            ))}
          </ul>
        )}
      </div>

      {hasMore && (
        <Button
          type="button"
          variant="ghost"
          onClick={showMore}
          disabled={isLoadingMore}
          className="mt-4 h-7 px-0 text-[11px] font-semibold text-primary hover:bg-transparent"
        >
          {isLoadingMore ? "Loading..." : "Show more comments"}
        </Button>
      )}
    </section>
  );
};

export default DiscussionForum;
