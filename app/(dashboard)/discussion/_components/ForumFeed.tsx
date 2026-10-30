"use client";

import { ListFilter } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CommentSort } from "@/redux/features/discussion/discussionApi";

import { useDiscussion } from "../../_hooks/useDiscussion";
import { FORUM } from "../_constants";
import ForumComposer from "../../_components/ForumComposer";
import ForumPost from "../../_components/ForumPost";

const SORT_VALUES: CommentSort[] = ["newest", "oldest", "top"];

const ForumFeed = () => {
  const t = useTranslations("Dashboard.discussionPage");
  const tf = useTranslations("Dashboard.forum");
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
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-primary">{t("feed")}</h2>

        <Select value={sort} onValueChange={(value) => changeSort(value as CommentSort)}>
          <SelectTrigger
            aria-label={tf("sortBy")}
            className="h-auto w-auto gap-1.5 border-0 bg-transparent p-0 text-[13px] text-muted-foreground shadow-none hover:bg-transparent data-[size=default]:h-auto"
          >
            <ListFilter className="size-3.5" />
            <SelectValue>{tf("sortBy")}</SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="end">
            {SORT_VALUES.map((value) => (
              <SelectItem key={value} value={value}>
                {tf(`sort.${value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="max-w-3xl">
        <div className="mt-4">
          <ForumComposer onSubmit={(content) => addComment(content)} isSubmitting={isPosting} />
        </div>

        <div className="mt-8">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">{tf("loading")}</p>
          ) : isError ? (
            <p className="text-sm text-destructive">{tf("loadError")}</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("empty")}</p>
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
            {isLoadingMore ? tf("loadingMore") : tf("showMore")}
          </Button>
        )}
      </div>
    </section>
  );
};

export default ForumFeed;
