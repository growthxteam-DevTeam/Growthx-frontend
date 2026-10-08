"use client";

import Image from "next/image";

import { useDashboard } from "../_hooks/useDashboard";

const DashboardHeader = () => {
  const { firstName, initials, profilePicture } = useDashboard();

  return (
    <header className="flex items-start justify-between">
      <h1 className="font-serif text-xl font-bold text-primary">Welcome {firstName}</h1>

      <div className="flex flex-col items-center gap-1">
        {profilePicture ? (
          <Image
            src={profilePicture}
            alt="Your profile"
            width={36}
            height={36}
            unoptimized
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
            {initials}
          </span>
        )}
        <span className="text-[10px] text-muted-foreground">Account</span>
      </div>
    </header>
  );
};

export default DashboardHeader;
