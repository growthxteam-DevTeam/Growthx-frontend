import { apiSlice } from "../api/apiSlice";

// What the admin portal published for the caller's program and cohort (plus anything addressed to
// everyone). See GET /dashboard in growth-x-be/README.md.
export interface DashboardData {
  program: string;
  cohort: string | null;
  /** null until an admin saves a banner for this program + cohort. */
  banner: {
    title: string;
    durationWeeks: number;
    leader: string;
    cohortMembers: number;
  } | null;
  announcements: { id: string; text: string; createdAt: string }[];
  /** Upcoming calendar events, soonest first. */
  events: { id: string; text: string; date: string }[];
  /** Assignments not yet due, soonest first. */
  assignments: { id: string; text: string; date: string; points: number }[];
}

interface DashboardResponse {
  status: string;
  statusCode: number;
  data: DashboardData;
}

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => "/dashboard",
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
