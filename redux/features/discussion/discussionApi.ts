import { apiSlice } from "../api/apiSlice";

export type CommentSort = "newest" | "oldest" | "top";

export interface DiscussionComment {
  id: string;
  author: { id: string; name: string; profilePicture: string | null };
  content: string;
  likes: number;
  likedByMe: boolean;
  dislikedByMe: boolean;
  /** Pinned comments always sort first. */
  pinned: boolean;
  /** Written by staff; shown with a badge. */
  staffPost: boolean;
  createdAt: string;
  replies: DiscussionComment[];
}

interface CommentsPage {
  comments: DiscussionComment[];
  total: number;
}

interface ReactionResult {
  likes: number;
  likedByMe: boolean;
  dislikedByMe: boolean;
}

export const discussionApi = apiSlice.enhanceEndpoints({ addTagTypes: ["Comments"] }).injectEndpoints({
  endpoints: (builder) => ({
    // `limit` counts top-level comments; "show more" just asks for a bigger limit.
    getComments: builder.query<CommentsPage, { classId: string; limit: number; sort?: CommentSort }>({
      query: ({ classId, limit, sort = "newest" }) => `/discussions/${classId}/comments?limit=${limit}&sort=${sort}`,
      transformResponse: (response: { data: CommentsPage }) => response.data,
      providesTags: (_result, _error, { classId }) => [{ type: "Comments", id: classId }],
    }),

    postComment: builder.mutation<DiscussionComment, { classId: string; content: string; parentId?: string }>({
      query: ({ classId, ...body }) => ({
        url: `/discussions/${classId}/comments`,
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: DiscussionComment }) => response.data,
      invalidatesTags: (_result, _error, { classId }) => [{ type: "Comments", id: classId }],
    }),

    toggleCommentLike: builder.mutation<ReactionResult, { classId: string; commentId: string }>({
      query: ({ commentId }) => ({
        url: `/discussions/comments/${commentId}/like`,
        method: "POST",
      }),
      transformResponse: (response: { data: ReactionResult }) => response.data,
      invalidatesTags: (_result, _error, { classId }) => [{ type: "Comments", id: classId }],
    }),

    toggleCommentDislike: builder.mutation<ReactionResult, { classId: string; commentId: string }>({
      query: ({ commentId }) => ({
        url: `/discussions/comments/${commentId}/dislike`,
        method: "POST",
      }),
      transformResponse: (response: { data: ReactionResult }) => response.data,
      invalidatesTags: (_result, _error, { classId }) => [{ type: "Comments", id: classId }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  usePostCommentMutation,
  useToggleCommentLikeMutation,
  useToggleCommentDislikeMutation,
} = discussionApi;
