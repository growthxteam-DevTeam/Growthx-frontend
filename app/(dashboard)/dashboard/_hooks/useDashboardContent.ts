"use client";

import { useGetDashboardQuery } from "@/redux/features/dashboard/dashboardApi";

// Every dashboard card reads from the same cached GET /dashboard call. `content` is undefined while
// it loads (or if it fails), and the cards just render empty rather than blocking the page.
export const useDashboardContent = () => {
  const { data } = useGetDashboardQuery(undefined, { pollingInterval: 60_000, skipPollingIfUnfocused: true });

  return { content: data?.data };
};
