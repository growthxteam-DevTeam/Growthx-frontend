import { Check, ShieldCheck } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { CREDIBILITY } from "../_constants";

const CredibilityBadgeCard = () => {
  const completed = CREDIBILITY.steps.filter((step) => step.complete).length;

  return (
    <section className="grid gap-8 rounded-lg border border-border bg-white p-8 shadow-sm md:grid-cols-[1fr_220px]">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-base font-bold text-primary">{CREDIBILITY.title}</h2>
          <span className="text-[10px] font-semibold text-primary">
            {completed} of {CREDIBILITY.steps.length} complete
          </span>
        </div>

        <ol className="relative mt-6 grid grid-cols-3">
          <div className="absolute left-[16.67%] right-[16.67%] top-3 h-px bg-border" />
          {CREDIBILITY.steps.map((step) => (
            <li key={step.label} className="relative flex flex-col items-center gap-2">
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full border",
                  step.complete ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-border bg-white",
                )}
              >
                {step.complete && <Check className="size-3.5" strokeWidth={3} />}
              </span>
              <span className="text-[10px] text-muted-foreground">{step.label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-md bg-[#f5f4fc] p-4">
          <p className="text-sm font-bold text-primary">{CREDIBILITY.summary.title}</p>
          <p className="mt-1 text-[10px] font-semibold text-primary">{CREDIBILITY.summary.weeks}</p>
          <p className="mt-2 text-xs text-muted-foreground">{CREDIBILITY.summary.description}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        {/* TODO: swap for the credibility badge artwork once the asset is available. */}
        <ShieldCheck className="size-28 text-primary" strokeWidth={1} />
        <div className="flex w-full items-center gap-2">
          <Progress value={CREDIBILITY.progress} className="flex-1" />
          <span className="text-[10px] font-semibold text-primary">{CREDIBILITY.progress}%</span>
        </div>
      </div>
    </section>
  );
};

export default CredibilityBadgeCard;
