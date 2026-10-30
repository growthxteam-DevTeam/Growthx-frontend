"use client";

import { useTranslations } from "next-intl";

import PageHeader from "../../_components/PageHeader";

const ProfileHeader = () => {
  const t = useTranslations("Dashboard.profile");

  return (
    <PageHeader>
      <div>
        <h1 className="text-2xl font-bold text-ink">{t("title")}</h1>
        <p className="mt-1 text-xs text-ink-muted">{t("subtitle")}</p>
      </div>
    </PageHeader>
  );
};

export default ProfileHeader;
