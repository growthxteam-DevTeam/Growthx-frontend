"use client";

import { AlignJustify } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import type { CommentSort } from "@/redux/features/discussion/discussionApi";

import ForumComposer from "../../_components/ForumComposer";
import ForumPost from "../../_components/ForumPost";
import { useDiscussion } from "../../_hooks/useDiscussion";
import { CURRENT_CLASS } from "../_constants";

const DiscussionForum = () => {
  const t = useTranslations("Dashboard.class");
  const tf = useTranslations("Dashboard.forum");
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
        <h2 className="text-[11px] font-medium text-ink">{t("discussionTitle")}</h2>

        <Select value={sort} onValueChange={(value) => changeSort(value as CommentSort)}>
          <SelectTrigger
            aria-label={tf("sortBy")}
            className="h-auto w-auto gap-1.5 border-0 bg-transparent p-0 text-[11px] font-medium text-ink shadow-none hover:bg-transparent data-[size=default]:h-auto [&>svg:last-child]:hidden"
          >
            <AlignJustify className="size-3.5" />
            {tf("sortBy")}
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="end">
            <SelectItem value="newest">{tf("sort.newest")}</SelectItem>
            <SelectItem value="oldest">{tf("sort.oldest")}</SelectItem>
            <SelectItem value="top">{tf("sort.top")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <ForumComposer onSubmit={(content) => addComment(content)} isSubmitting={isPosting} className="min-h-[168px]" />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p className="text-sm text-ink-muted">{tf("loading")}</p>
        ) : isError ? (
          <p className="text-sm text-destructive">{tf("loadError")}</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-ink-muted">{t("discussionEmpty")}</p>
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
          {isLoadingMore ? tf("loadingMore") : tf("showMore")}
        </Button>
      )}
    </section>
  );
};

export default DiscussionForum;
