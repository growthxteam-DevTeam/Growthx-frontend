"use client";

import { useTranslations } from "next-intl";

import PageHeader from "../../_components/PageHeader";

const ClassHeader = () => {
  const t = useTranslations("Dashboard.class");

  return (
    <PageHeader>
      <h1 className="font-serif text-[22px] font-bold text-primary">{t("welcome")}</h1>
    </PageHeader>
  );
};

export default ClassHeader;
