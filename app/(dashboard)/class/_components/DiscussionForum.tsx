"use client";

import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

import Avatar from "../../_components/Avatar";
import { useDashboard } from "../../dashboard/_hooks/useDashboard";
import { CURRENT_CLASS } from "../_constants";
import { useDiscussion } from "../../_hooks/useDiscussion";
import CommentComposer from "./CommentComposer";
import CommentItem from "./CommentItem";

const DiscussionForum = () => {
  const { name, profilePicture } = useDashboard();
  const {
    comments,
    isLoading,
    isLoadingMore,
    isError,
    hasMore,
    showMore,
    addComment,
    isPosting,
    likeComment,
    dislikeComment,
    sort,
    changeSort,
  } = useDiscussion(CURRENT_CLASS.id);

  return (
    <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-bold text-primary">Discussion Forum</h2>
        <Select value={sort} onValueChange={(value) => value && changeSort(value as never)}>
          <SelectTrigger className="h-auto gap-1.5 border-none bg-transparent p-0 text-[13px] text-muted-foreground shadow-none hover:bg-transparent data-[size=default]:h-auto">
            <ListFilter className="size-3.5" />
            Sort by
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="top">Top</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 rounded-lg border border-border p-3">
        <p className="text-xs text-muted-foreground">Add contribution</p>
        <div className="mt-2 flex items-center gap-3">
          <Avatar name={name} src={profilePicture} className="size-7 text-[12px]" />
          <CommentComposer
            placeholder="Add a contribution..."
            submitLabel="Post"
            onSubmit={(content) => addComment(content)}
            isSubmitting={isPosting}
          />
        </div>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading discussion...</p>
        ) : isError ? (
          <p className="text-sm text-destructive">Could not load the discussion. Please try again shortly.</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet. Start the conversation!</p>
        ) : (
          <ul className="flex flex-col gap-5">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={addComment}
                onLike={likeComment}
                onDislike={dislikeComment}
              />
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
          className="mt-4 h-7 px-0 text-[13px] font-semibold text-primary hover:bg-transparent"
        >
          {isLoadingMore ? "Loading..." : "Show more comments"}
        </Button>
      )}
    </section>
  );
};

export default DiscussionForum;
