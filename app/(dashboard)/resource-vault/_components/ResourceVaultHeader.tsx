"use client";

import { useTranslations } from "next-intl";

import PageHeader from "../../_components/PageHeader";

const ResourceVaultHeader = () => {
  const t = useTranslations("Dashboard.vault");

  return (
    <PageHeader>
      <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
    </PageHeader>
  );
};

export default ResourceVaultHeader;
