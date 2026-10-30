import { apiSlice } from "../api/apiSlice";

export type ResourceCategory = "pre-seed" | "pitch" | "raise" | "pricing";

// Mirrors the backend's ResourceDto (see growth-x-be README, GET /resources).
export interface Resource {
  id: string;
  title: string;
  /** The publisher's own page; readers are sent out of the app to read it. */
  url: string;
  source: string;
  type: "article" | "video";
  summary: string;
  imageUrl: string | null;
  publishedAt: string | null;
  /** Only for articles whose feed includes the full text. */
  readMinutes: number | null;
}

interface GetResourcesArgs {
  category?: ResourceCategory;
  q?: string;
}

export const resourcesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResources: builder.query<Resource[], GetResourcesArgs>({
      query: ({ category, q }) => ({
        url: "/resources",
        params: { ...(category && { category }), ...(q && { q }), limit: 12 },
      }),
      transformResponse: (response: { data: Resource[] }) => response.data,
    }),
  }),
});

export const { useGetResourcesQuery } = resourcesApi;
