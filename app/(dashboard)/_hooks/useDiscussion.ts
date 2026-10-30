"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
  useToggleCommentDislikeMutation,
  useToggleCommentLikeMutation,
  type CommentSort,
} from "@/redux/features/discussion/discussionApi";

import { DISCUSSION_PAGE_SIZE, DISCUSSION_POLL_INTERVAL_MS } from "../_constants";

// One comment thread, keyed by `classId`. Polling (not websockets) keeps it reasonably live
// without extra infrastructure. Shared by the class page and the Discussion Forum page.
export const useDiscussion = (classId: string) => {
  const t = useTranslations("Dashboard.forum.errors");
  const [limit, setLimit] = useState(DISCUSSION_PAGE_SIZE);
  const [sort, setSort] = useState<CommentSort>("newest");

  const { data, isLoading, isFetching, isError } = useGetCommentsQuery(
    { classId, limit, sort },
    { pollingInterval: DISCUSSION_POLL_INTERVAL_MS, skipPollingIfUnfocused: true },
  );
  const [postComment, { isLoading: isPosting }] = usePostCommentMutation();
  const [toggleLike] = useToggleCommentLikeMutation();
  const [toggleDislike] = useToggleCommentDislikeMutation();

  const comments = data?.comments ?? [];
  const total = data?.total ?? 0;

  // Resolves to whether the comment was saved, so callers only clear their input on success.
  const addComment = async (content: string, parentId?: string) => {
    try {
      await postComment({ classId, content, parentId }).unwrap();
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("post")));
      return false;
    }
  };

  const react = (toggle: typeof toggleLike) => async (commentId: string) => {
    try {
      await toggle({ classId, commentId }).unwrap();
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("react")));
    }
  };

  return {
    comments,
    total,
    isLoading,
    isLoadingMore: isFetching && !isLoading,
    isError,
    hasMore: comments.length < total,
    showMore: () => setLimit((current) => current + DISCUSSION_PAGE_SIZE),
    sort,
    changeSort: (next: CommentSort) => {
      setSort(next);
      setLimit(DISCUSSION_PAGE_SIZE);
    },
    addComment,
    isPosting,
    likeComment: react(toggleLike),
    dislikeComment: react(toggleDislike),
  };
};
