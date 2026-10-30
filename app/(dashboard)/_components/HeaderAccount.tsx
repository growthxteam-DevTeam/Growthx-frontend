"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import ThemeToggle from "@/components/common/ThemeToggle";

import Avatar from "./Avatar";

interface HeaderAccountProps {
  name: string;
  profilePicture?: string | null;
}

// Right-hand side of every dashboard page header: language and theme toggles beside the account avatar.
const HeaderAccount = ({ name, profilePicture }: HeaderAccountProps) => {
  const t = useTranslations("Dashboard.shell");

  return (
    <div className="flex items-start gap-3">
      <div className="mt-2">
        <LanguageSwitcher />
      </div>
      <ThemeToggle className="mt-1" />
      <Link
        href="/profile"
        className="flex flex-col items-center gap-1 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Avatar name={name} src={profilePicture} className="size-9 lg:size-11" />
        <span className="text-xs text-muted-foreground">{t("account")}</span>
      </Link>
    </div>
  );
};

export default HeaderAccount;
