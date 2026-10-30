"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { ALUMNI_FILTERS } from "../_constants";
import type { AlumniFilterId } from "../_types";

interface FilterTabsProps {
  activeFilter: AlumniFilterId;
  onSelect: (filter: AlumniFilterId) => void;
}

const FilterTabs = ({ activeFilter, onSelect }: FilterTabsProps) => {
  const t = useTranslations("Dashboard.alumniNetwork");

  return (
    <div role="group" aria-label={t("filtersLabel")} className="flex flex-wrap gap-3">
      {ALUMNI_FILTERS.map((filter) => {
        const isActive = filter === activeFilter;

        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(filter)}
            className={cn(
              "h-10 cursor-pointer rounded-md border px-4 text-base font-semibold transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted",
            )}
          >
            {t(`filters.${filter}`)}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;
