"use client";

import { AlignJustify } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import type { CommentSort } from "@/redux/features/discussion/discussionApi";

import ForumComposer from "../../_components/ForumComposer";
import ForumPost from "../../_components/ForumPost";
import { useDiscussion } from "../../_hooks/useDiscussion";
import { CURRENT_CLASS } from "../_constants";

const DiscussionForum = () => {
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
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-medium text-ink">Discussion Forum</h2>

        <Select value={sort} onValueChange={(value) => changeSort(value as CommentSort)}>
          <SelectTrigger
            aria-label="Sort by"
            className="h-auto w-auto gap-1.5 border-0 bg-transparent p-0 text-[11px] font-medium text-ink shadow-none hover:bg-transparent data-[size=default]:h-auto [&>svg:last-child]:hidden"
          >
            <AlignJustify className="size-3.5" />
            Sort by
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="end">
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="top">Top</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <ForumComposer
          onSubmit={(content) => addComment(content)}
          isSubmitting={isPosting}
          className="min-h-[168px]"
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p className="text-sm text-ink-muted">Loading discussion...</p>
        ) : isError ? (
          <p className="text-sm text-destructive">Could not load the discussion. Please try again shortly.</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-ink-muted">No comments yet. Start the conversation!</p>
        ) : (
          <ul className="flex flex-col gap-6">
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
          className="mt-6 h-7 cursor-pointer px-0 text-xs font-medium text-primary hover:bg-transparent"
        >
          {isLoadingMore ? "Loading..." : "Show more comments"}
        </Button>
      )}
    </section>
  );
};

export default DiscussionForum;
