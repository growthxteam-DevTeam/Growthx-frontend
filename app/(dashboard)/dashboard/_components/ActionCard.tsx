import { Button } from "@/components/ui/button";

import type { ActionCardConfig } from "../_types";

const ActionCard = ({ title, description, buttonLabel, icon: Icon, comingSoon }: ActionCardConfig) => (
  <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm">
    <div className="relative flex h-28 items-center justify-center bg-[#f5f4fc]">
      {comingSoon && (
        <span className="absolute right-3 top-3 rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-600">
          Coming Soon
        </span>
      )}
      <Icon className="size-10 text-primary" strokeWidth={1.5} />
    </div>

    <div className="flex flex-1 flex-col gap-1 p-4">
      <h3 className="font-serif text-base font-bold text-primary">{title}</h3>
      <p className="flex-1 text-xs text-muted-foreground">{description}</p>
      <Button
        type="button"
        variant="outline"
        className="mt-4 h-8 w-full border-primary text-xs font-semibold text-primary hover:bg-transparent"
      >
        {buttonLabel}
      </Button>
    </div>
  </article>
);

export default ActionCard;
