import { apiSlice } from "../api/apiSlice";

export interface DiscussionComment {
  id: string;
  author: { id: string; name: string; profilePicture: string | null };
  content: string;
  likes: number;
  likedByMe: boolean;
  createdAt: string;
  replies: DiscussionComment[];
}

interface CommentsPage {
  comments: DiscussionComment[];
  total: number;
}

export const discussionApi = apiSlice.enhanceEndpoints({ addTagTypes: ["Comments"] }).injectEndpoints({
  endpoints: (builder) => ({
    // `limit` counts top-level comments; "show more" just asks for a bigger limit.
    getComments: builder.query<CommentsPage, { classId: string; limit: number }>({
      query: ({ classId, limit }) => `/discussions/${classId}/comments?limit=${limit}`,
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

    toggleCommentLike: builder.mutation<{ likes: number; likedByMe: boolean }, { classId: string; commentId: string }>({
      query: ({ commentId }) => ({
        url: `/discussions/comments/${commentId}/like`,
        method: "POST",
      }),
      transformResponse: (response: { data: { likes: number; likedByMe: boolean } }) => response.data,
      invalidatesTags: (_result, _error, { classId }) => [{ type: "Comments", id: classId }],
    }),
  }),
});

export const { useGetCommentsQuery, usePostCommentMutation, useToggleCommentLikeMutation } = discussionApi;
