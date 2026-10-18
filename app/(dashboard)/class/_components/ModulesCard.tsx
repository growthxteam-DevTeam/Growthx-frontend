import { ChevronRight, FileText, List } from "lucide-react";

import { MODULES } from "../_constants";

const ModulesCard = () => (
  /* Spinning border wrapper */
  <div className="relative rounded-lg p-px overflow-hidden">
    {/* Rotating conic-gradient that forms the animated border */}
    <div
      className="absolute -inset-2 animate-spin"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, oklch(0.348 0.185 274.5) 60deg, transparent 120deg)",
        animationDuration: "3s",
      }}
    />

    {/* Card content sits on top */}
    <section className="relative rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-base font-bold text-primary">Modules</h2>
        <List className="size-3.5 text-primary" />
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {MODULES.map((module, index) => (
          <li key={`${module.title}-${index}`}>
            {/* TODO: no module pages exist yet, so these rows don't navigate. */}
            <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
              <FileText className="size-3.5 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-primary">{module.title}</p>
                <p className="text-[11px] text-muted-foreground">{module.meta}</p>
              </div>
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default ModulesCard;
