"use client";

import type { ReactNode } from "react";

import { useDashboard } from "../dashboard/_hooks/useDashboard";
import HeaderAccount from "./HeaderAccount";

// Shared top bar for every dashboard page: the left side (title) is per-page, the right side
// (theme toggle + account) is identical everywhere.
const PageHeader = ({ children }: { children: ReactNode }) => {
  const { name, profilePicture } = useDashboard();

  return (
    <header className="flex items-start justify-between">
      {children}
      <HeaderAccount name={name} profilePicture={profilePicture} />
    </header>
  );
};

export default PageHeader;
