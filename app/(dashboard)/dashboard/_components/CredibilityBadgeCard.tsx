import { Fragment } from "react";

import Image from "next/image";

import { Check, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { CREDIBILITY } from "../_constants";
import type { CredibilityStepStatus } from "../_types";

const StepMarker = ({ status }: { status: CredibilityStepStatus }) => {
  switch (status) {
    case "complete":
      return (
        <span className="flex size-8 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
          <Check className="size-4" strokeWidth={3} />
        </span>
      );
    case "current":
      return (
        <span className="flex size-8 items-center justify-center rounded-full border-2 border-primary bg-card">
          <span className="size-1.5 rounded-full bg-primary" />
        </span>
      );
    case "locked":
      return (
        <span className="flex size-8 items-center justify-center text-muted-foreground">
          <Lock className="size-5" />
        </span>
      );
  }
};

const CredibilityBadgeCard = () => {
  const t = useTranslations("Dashboard.home.credibility");
  const completed = CREDIBILITY.steps.filter((step) => step.status === "complete").length;

  return (
    <section className="grid gap-8 rounded-lg border border-border bg-card p-8 shadow-sm md:grid-cols-[1fr_240px]">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>
          <span className="text-xs font-semibold text-primary">
            {t("complete", { completed, total: CREDIBILITY.steps.length })}
          </span>
        </div>

        <ol className="mt-6 flex items-start">
          {CREDIBILITY.steps.map((step, index) => (
            <Fragment key={step.id}>
              <li className="flex flex-col items-center gap-2">
                <StepMarker status={step.status} />
                <span
                  className={cn(
                    "text-sm",
                    step.status === "locked" ? "text-muted-foreground" : "font-medium text-primary",
                  )}
                >
                  {t(`steps.${step.id}`)}
                </span>
              </li>
              {index < CREDIBILITY.steps.length - 1 && (
                <li role="presentation" aria-hidden className="mx-3 mt-4 h-px flex-1 bg-border" />
              )}
            </Fragment>
          ))}
        </ol>

        <div className="mt-6 rounded-md bg-tint p-5">
          <p className="text-base font-bold text-primary">{t("summary.title")}</p>
          <p className="mt-1 text-xs font-semibold text-primary">{t("summary.weeks")}</p>
          <p className="mt-2 text-sm text-foreground">{t("summary.description")}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          {/* Blurred base — always visible underneath */}
          <Image
            src="/credibility-badge.png"
            alt={t("badgeAlt")}
            width={160}
            height={160}
            style={{ filter: "blur(8px)" }}
          />
          {/* Sharp reveal layer — clips from the top, grows downward as progress increases */}
          <Image
            src="/credibility-badge.png"
            alt=""
            aria-hidden
            width={160}
            height={160}
            className="absolute inset-0 transition-all duration-700"
            style={{ clipPath: `inset(0 0 ${100 - CREDIBILITY.progress}% 0)` }}
          />
        </div>
        <div className="flex w-full items-center gap-2">
          <Progress value={CREDIBILITY.progress} className="flex-1" />
          <span className="text-xs font-semibold text-primary">{CREDIBILITY.progress}%</span>
        </div>
      </div>
    </section>
  );
};

export default CredibilityBadgeCard;
