"use client";

import { useTranslations } from "next-intl";

import PageHeader from "../../_components/PageHeader";

const ForumHeader = () => {
  const t = useTranslations("Dashboard.discussionPage");

  return (
    <PageHeader>
      <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
    </PageHeader>
  );
};

export default ForumHeader;
