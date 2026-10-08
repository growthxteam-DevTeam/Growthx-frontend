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
        className={cn("rounded-lg border border-border bg-white p-5 shadow-sm", card.locked && "opacity-60")}
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-sm font-bold text-primary">{card.title}</h2>
            <p className="mt-1 max-w-xs text-[10px] text-muted-foreground">{card.description}</p>
          </div>

          <div className="flex w-44 shrink-0 flex-col gap-2">
            <Button
              type="button"
              disabled={card.locked}
              onClick={notifyComingSoon}
              className="h-8 gap-1.5 text-[11px] font-semibold"
            >
              <card.primaryIcon className="size-3.5" />
              {card.primaryLabel}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={card.locked}
              onClick={notifyComingSoon}
              className="h-8 gap-1.5 border-primary text-[11px] font-semibold text-primary hover:bg-transparent"
            >
              <card.secondaryIcon className="size-3.5" />
              {card.secondaryLabel}
            </Button>
          </div>
        </div>
      </section>
    ))}
  </div>
);

export default AssignmentCards;
