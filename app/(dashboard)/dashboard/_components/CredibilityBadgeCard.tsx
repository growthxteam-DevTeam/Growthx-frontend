import Image from "next/image";

import { Check } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { CREDIBILITY } from "../_constants";

const CredibilityBadgeCard = () => {
  const completed = CREDIBILITY.steps.filter((step) => step.complete).length;

  return (
    <section className="grid gap-8 rounded-lg border border-border bg-card p-8 shadow-sm md:grid-cols-[1fr_240px]">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">{CREDIBILITY.title}</h2>
          <span className="text-xs font-semibold text-primary">
            {completed} of {CREDIBILITY.steps.length} complete
          </span>
        </div>

        <ol className="relative mt-6 grid grid-cols-3">
          <div className="absolute left-[16.67%] right-[16.67%] top-3.5 h-px bg-border" />
          {CREDIBILITY.steps.map((step) => (
            <li key={step.label} className="relative flex flex-col items-center gap-2">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full border",
                  step.complete ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400" : "border-border bg-card",
                )}
              >
                {step.complete && <Check className="size-4" strokeWidth={3} />}
              </span>
              <span className="text-xs text-foreground">{step.label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-md bg-tint p-5">
          <p className="text-base font-bold text-primary">{CREDIBILITY.summary.title}</p>
          <p className="mt-1 text-xs font-semibold text-primary">{CREDIBILITY.summary.weeks}</p>
          <p className="mt-2 text-sm text-foreground">{CREDIBILITY.summary.description}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          {/* Blurred base — always visible underneath */}
          <Image
            src="/credibility-badge.png"
            alt="Credibility badge"
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
