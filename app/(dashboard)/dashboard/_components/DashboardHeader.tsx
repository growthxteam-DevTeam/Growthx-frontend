"use client";

import PageHeader from "../../_components/PageHeader";
import { useDashboard } from "../_hooks/useDashboard";

const DashboardHeader = () => {
  const { firstName } = useDashboard();

  return (
    <PageHeader>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">Welcome {firstName}</h1>
    </PageHeader>
  );
};

export default DashboardHeader;
