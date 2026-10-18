"use client";

import Avatar from "../../_components/Avatar";
import { useDashboard } from "../../dashboard/_hooks/useDashboard";

const ClassHeader = () => {
  const { name, profilePicture } = useDashboard();

  return (
    <header className="flex items-start justify-between">
      <h1 className="font-serif text-[22px] font-bold text-primary">Welcome to Class</h1>

      <div className="flex flex-col items-center gap-1">
        <Avatar name={name} src={profilePicture} />
        <span className="text-[12px] text-muted-foreground">Account</span>
      </div>
    </header>
  );
};

export default ClassHeader;
