"use client";

import { useTranslations } from "next-intl";

import PageHeader from "../../_components/PageHeader";
import { useDashboard } from "../_hooks/useDashboard";

const DashboardHeader = () => {
  const t = useTranslations("Dashboard.home");
  const { firstName } = useDashboard();

  return (
    <PageHeader>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("welcome", { name: firstName })}</h1>
    </PageHeader>
  );
};

export default DashboardHeader;
