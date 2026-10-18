"use client";

import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CommentSort } from "@/redux/features/discussion/discussionApi";

import { useDiscussion } from "../../_hooks/useDiscussion";
import { FORUM, SORT_OPTIONS } from "../_constants";
import ForumComposer from "./ForumComposer";
import ForumPost from "./ForumPost";

const ForumFeed = () => {
  const {
    comments,
    isLoading,
    isLoadingMore,
    isError,
    hasMore,
    showMore,
    sort,
    changeSort,
    addComment,
    isPosting,
    likeComment,
    dislikeComment,
  } = useDiscussion(FORUM.id);

  return (
    <section className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">Feed</h2>

        <Select value={sort} onValueChange={(value) => changeSort(value as CommentSort)}>
          <SelectTrigger
            aria-label="Sort by"
            className="h-8 w-auto gap-1.5 border-0 bg-transparent px-1 text-xl text-foreground shadow-none"
          >
            <ListFilter className="size-3.5" />
            <SelectValue>Sort by</SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="end">
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <ForumComposer onSubmit={(content) => addComment(content)} isSubmitting={isPosting} />
      </div>

      <div className="mt-8">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading discussion...</p>
        ) : isError ? (
          <p className="text-sm text-destructive">Could not load the discussion. Please try again shortly.</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No contributions yet. Be the first to share an idea!</p>
        ) : (
          <ul className="flex flex-col gap-7">
            {comments.map((comment) => (
              <ForumPost
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
          className="mt-6 h-8 cursor-pointer px-0 text-xs font-semibold text-primary hover:bg-transparent"
        >
          {isLoadingMore ? "Loading..." : "Show more comments"}
        </Button>
      )}
    </section>
  );
};

export default ForumFeed;
