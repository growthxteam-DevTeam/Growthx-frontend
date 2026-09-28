import { apiSlice } from "../api/apiSlice";

export interface ApiBanner {
  _id: string;
  message: string;
  author?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBannerPayload {
  message: string;
  author?: string;
  isActive?: boolean;
  order?: number;
}

export type UpdateBannerPayload = Partial<CreateBannerPayload>;

export const adminBannerApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Banner"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAdminBanners: builder.query<ApiBanner[], void>({
        query: () => "/admin/banners",
        providesTags: ["Banner"],
      }),
      createBanner: builder.mutation<ApiBanner, CreateBannerPayload>({
        query: (body) => ({
          url: "/admin/banners",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Banner"],
      }),
      updateBanner: builder.mutation<ApiBanner, { id: string; body: UpdateBannerPayload }>({
        query: ({ id, body }) => ({
          url: `/admin/banners/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["Banner"],
      }),
      deleteBanner: builder.mutation<{ message: string }, string>({
        query: (id) => ({
          url: `/admin/banners/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Banner"],
      }),
    }),
  });

export const {
  useGetAdminBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = adminBannerApi;
