"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ASSIGNMENT_CARDS } from "../_constants";

// TODO: uploads and downloads have no backend yet, so the active buttons only acknowledge the click.
const notifyComingSoon = () => toast.info("This isn't available yet. Check back soon.");

const AssignmentCards = () => (
  <div className="flex flex-col gap-4">
    {ASSIGNMENT_CARDS.map((card) => (
      <section
        key={card.title}
        className={cn("rounded-lg border border-border bg-card p-5 shadow-sm", card.locked && "opacity-60")}
      >
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0">
            <h2 className="font-serif text-lg font-bold text-primary">{card.title}</h2>
            <p className="mt-1 max-w-lg text-md text-muted-foreground">{card.description}</p>
          </div>

          <div className="flex w-60 shrink-0 flex-col gap-2">
            <Button
              type="button"
              variant={card.primaryVariant ?? "default"}
              disabled={card.locked}
              onClick={notifyComingSoon}
              className={cn(
                "h-8 w-full gap-1.5 text-[13px] font-semibold",
                card.primaryVariant === "outline" && "border-primary text-primary hover:bg-transparent",
              )}
            >
              <card.primaryIcon className="size-3.5 shrink-0" />
              <span className="truncate">{card.primaryLabel}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={card.locked}
              onClick={notifyComingSoon}
              className="h-8 w-full gap-1.5 border-primary text-[13px] font-semibold text-primary hover:bg-transparent"
            >
              <card.secondaryIcon className="size-3.5 shrink-0" />
              <span className="truncate">{card.secondaryLabel}</span>
            </Button>
          </div>
        </div>
      </section>
    ))}
  </div>
);

export default AssignmentCards;
