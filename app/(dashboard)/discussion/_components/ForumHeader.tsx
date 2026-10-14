"use client";

import Avatar from "../../_components/Avatar";
import { useDashboard } from "../../dashboard/_hooks/useDashboard";

const ForumHeader = () => {
  const { name, profilePicture } = useDashboard();

  return (
    <header className="flex items-start justify-between">
      <h1 className="text-2xl font-bold text-foreground">Discussion Forum</h1>

      <div className="flex flex-col items-center gap-1">
        <Avatar name={name} src={profilePicture} className="size-11" />
        <span className="text-xs text-muted-foreground">Account</span>
      </div>
    </header>
  );
};

export default ForumHeader;
