"use client";

import { useState } from "react";

import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
  useToggleCommentLikeMutation,
} from "@/redux/features/discussion/discussionApi";

import { DISCUSSION_PAGE_SIZE, DISCUSSION_POLL_INTERVAL_MS } from "../_constants";

// Polling (not websockets) keeps the thread reasonably live without extra infrastructure.
export const useDiscussion = (classId: string) => {
  const [limit, setLimit] = useState(DISCUSSION_PAGE_SIZE);

  const { data, isLoading, isFetching, isError } = useGetCommentsQuery(
    { classId, limit },
    { pollingInterval: DISCUSSION_POLL_INTERVAL_MS, skipPollingIfUnfocused: true },
  );
  const [postComment, { isLoading: isPosting }] = usePostCommentMutation();
  const [toggleLike] = useToggleCommentLikeMutation();

  const comments = data?.comments ?? [];
  const total = data?.total ?? 0;

  // Resolves to whether the comment was saved, so callers only clear their input on success.
  const addComment = async (content: string, parentId?: string) => {
    try {
      await postComment({ classId, content, parentId }).unwrap();
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not post your comment. Please try again."));
      return false;
    }
  };

  const likeComment = async (commentId: string) => {
    try {
      await toggleLike({ classId, commentId }).unwrap();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not update your like. Please try again."));
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
    addComment,
    isPosting,
    likeComment,
  };
};
