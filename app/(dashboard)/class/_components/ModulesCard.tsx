import { ChevronRight, FileText, List } from "lucide-react";

import { MODULES } from "../_constants";

const ModulesCard = () => (
  <section className="rounded-lg border border-border bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <h2 className="font-serif text-sm font-bold text-primary">Modules</h2>
      <List className="size-3.5 text-primary" />
    </div>

    <ul className="mt-3 flex flex-col gap-2">
      {MODULES.map((module, index) => (
        <li key={`${module.title}-${index}`}>
          {/* TODO: no module pages exist yet, so these rows don't navigate. */}
          <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
            <FileText className="size-3.5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-primary">{module.title}</p>
              <p className="text-[9px] text-muted-foreground">{module.meta}</p>
            </div>
            <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default ModulesCard;
