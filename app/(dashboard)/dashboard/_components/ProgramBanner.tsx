"use client";

import { NotebookText } from "lucide-react";
import { useTranslations } from "next-intl";

import { useDashboardContent } from "../_hooks/useDashboardContent";

// "Zero to Launch (6 weeks)" -> "Zero to Launch": the weeks are shown on their own line.
const stripWeeks = (label: string) => label.replace(/\s*\(.*\)$/, "");

const ProgramBanner = () => {
  const t = useTranslations("Dashboard.home.program");
  const tOptions = useTranslations("Onboarding.options.program");
  const { content } = useDashboardContent();

  // Until an admin saves a banner for the learner's program + cohort, fall back to the program they
  // applied to (no leader, size or duration to show).
  const banner = content?.banner;
  const title =
    banner?.title ??
    (content ? stripWeeks(tOptions.has(content.program) ? tOptions(content.program) : content.program) : "");

  return (
    <section className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-lg bg-brand p-6 text-white lg:p-10">
      {/* Decorative arcs from the design: light band top-left, faint ring top-right, gold sweep bottom-right. */}
      <div className="pointer-events-none absolute -left-44 -top-10 h-[150%] w-56 rounded-full border-r-[26px] border-white/30" />
      <div className="pointer-events-none absolute -top-72 left-1/2 size-[520px] rounded-full border-[3px] border-white/10" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-32 w-[75%] rounded-[100%] bg-[#f0dfae]" />
      <div className="pointer-events-none absolute -bottom-[60px] -right-4 h-32 w-[75%] rounded-[100%] bg-brand" />

      <div className="relative mt-4 pl-4 lg:mt-8 lg:pl-10">
        <p className="text-base text-[#f0dfae]">{t("label")}</p>
        <h2 className="mt-1 text-2xl font-bold lg:text-4xl">{title}</h2>
        {banner && (
          <p className="mt-3 flex items-center gap-2 text-base">
            <NotebookText className="size-5" />
            {t("duration", { weeks: banner.durationWeeks })}
          </p>
        )}
      </div>

      {banner && (
        <p className="relative flex flex-wrap gap-4 pl-4 text-sm font-bold lg:gap-10 lg:pl-10">
          <span>{t("ledBy", { leader: banner.leader })}</span>
          <span>{t("cohortMembers", { count: banner.cohortMembers })}</span>
        </p>
      )}
    </section>
  );
};

export default ProgramBanner;
