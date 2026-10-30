"use client";

import type { ReactNode } from "react";

import { useDashboard } from "../dashboard/_hooks/useDashboard";
import BackButton from "./BackButton";
import HeaderAccount from "./HeaderAccount";

// Shared top bar for every dashboard page: the left side (back button + per-page title) and the right
// side (language + theme toggles + account) are identical everywhere except for the title.
const PageHeader = ({ children }: { children: ReactNode }) => {
  const { name, profilePicture } = useDashboard();

  return (
    <header className="flex items-start justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <BackButton />
        {children}
      </div>
      <HeaderAccount name={name} profilePicture={profilePicture} />
    </header>
  );
};

export default PageHeader;
