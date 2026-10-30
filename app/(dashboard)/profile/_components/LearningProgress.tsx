"use client";

import { CircleCheck, SquareArrowOutUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { PROFILE } from "../_constants";
import SettingsSection from "./SettingsSection";

const LearningProgress = () => {
  const t = useTranslations("Dashboard.profile.learning");

  return (
    <SettingsSection title={t("title")}>
      <div className="flex items-center justify-between rounded-xl bg-tint-soft px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-ink">{t("badgeProgress")}</p>
          <p className="mt-1 text-[21px] font-bold text-primary">{PROFILE.badgeProgress}%</p>
        </div>
        <CircleCheck className="size-5 text-primary" />
      </div>

      <Link
        href="/dashboard"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        {t("viewDetails")}
        <SquareArrowOutUpRight className="size-3.5" />
      </Link>
    </SettingsSection>
  );
};

export default LearningProgress;
