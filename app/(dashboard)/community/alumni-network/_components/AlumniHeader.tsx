"use client";

import { Crown } from "lucide-react";
import { useTranslations } from "next-intl";

import PageHeader from "../../../_components/PageHeader";

const AlumniHeader = () => {
  const t = useTranslations("Dashboard.alumniNetwork");

  return (
    <PageHeader>
      <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Crown className="size-4.5" aria-hidden />
        </span>
        {t("title")}
      </h1>
    </PageHeader>
  );
};

export default AlumniHeader;
