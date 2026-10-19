"use client";

import ThemeToggle from "@/components/common/ThemeToggle";

import Avatar from "./Avatar";

interface HeaderAccountProps {
  name: string;
  profilePicture?: string | null;
}

// Right-hand side of every dashboard page header: theme toggle beside the account avatar.
const HeaderAccount = ({ name, profilePicture }: HeaderAccountProps) => (
  <div className="flex items-start gap-3">
    <ThemeToggle className="mt-1" />
    <div className="flex flex-col items-center gap-1">
      <Avatar name={name} src={profilePicture} className="size-9 lg:size-11" />
      <span className="text-xs text-muted-foreground">Account</span>
    </div>
  </div>
);

export default HeaderAccount;
