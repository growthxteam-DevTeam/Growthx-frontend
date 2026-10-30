"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const HOME_PATH = "/dashboard";

// Steps back through the browser history; with no earlier entry (e.g. a page opened in a new tab) it
// goes to the dashboard instead. Hidden on the dashboard itself, which is where the flow starts.
const BackButton = () => {
  const t = useTranslations("Dashboard.shell");
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === HOME_PATH) return null;

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(HOME_PATH);
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label={t("back")}
      className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <ArrowLeft className="size-4.5" />
    </button>
  );
};

export default BackButton;
