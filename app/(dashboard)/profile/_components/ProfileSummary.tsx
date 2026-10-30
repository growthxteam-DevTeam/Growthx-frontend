"use client";

import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import Avatar from "../../_components/Avatar";
import { useDashboard } from "../../dashboard/_hooks/useDashboard";
import { PROFILE } from "../_constants";

const ProfileSummary = () => {
  const t = useTranslations("Dashboard.profile");
  const tc = useTranslations("Dashboard.common");
  const { name, profilePicture } = useDashboard();

  return (
    <div className="flex flex-col items-center pb-1 text-center">
      <Avatar name={name} src={profilePicture} className="size-30 text-3xl" />
      <p className="mt-3 text-base font-semibold text-ink">{name}</p>
      <p className="mt-1 text-xs text-ink-muted">{t("cohort", { number: PROFILE.cohortNumber })}</p>

      {/* TODO: no profile-update endpoint yet, so editing only acknowledges the click. */}
      <Button
        type="button"
        variant="outline"
        onClick={() => toast.info(tc("comingSoon"))}
        className="mt-3 h-6 cursor-pointer gap-1.5 rounded-md border-primary px-3 text-[11px] font-semibold text-primary hover:bg-transparent"
      >
        <Pencil className="size-3" />
        {t("editProfile")}
      </Button>
    </div>
  );
};

export default ProfileSummary;
