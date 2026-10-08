"use client";

import { useAppSelector } from "@/redux/app/hooks";

export const useDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);

  const nameParts = (user?.name ?? "").trim().split(/\s+/).filter(Boolean);

  return {
    name: user?.name ?? "",
    firstName: nameParts[0] ?? "",
    profilePicture: user?.profilePicture ?? null,
  };
};
