"use client";

import { useAppSelector } from "@/redux/app/hooks";

export const useDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);

  const nameParts = (user?.name ?? "").trim().split(/\s+/).filter(Boolean);

  return {
    firstName: nameParts[0] ?? "",
    initials: nameParts
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase(),
    profilePicture: user?.profilePicture ?? null,
  };
};
