"use client";

import { Search } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { PROFILE_TAGS, RESOURCE_TABS, RESOURCE_VAULT, SKELETON_SUBTITLE_WIDTHS } from "../_constants";
import { useResourceSearch } from "../_hooks/useResourceSearch";
import ResourceCard from "./ResourceCard";
import ResourceCardSkeleton from "./ResourceCardSkeleton";

const ResourceVaultFeed = () => {
  const { query, setQuery, category, selectCategory, isSearchingAll, isLoading, isError, refetch, resources } =
    useResourceSearch();
  const activeTab = RESOURCE_TABS.find((tab) => tab.id === category);

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">{RESOURCE_VAULT.headline}</h2>

      {isLoading && query.trim() && (
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          {RESOURCE_VAULT.searchingMessage}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={RESOURCE_VAULT.searchPlaceholder}
          aria-label="Search the resource vault"
          className="w-full border-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">Based on your profile:</span>
        {PROFILE_TAGS.map((tag) => (
          <span key={tag} className="rounded-full bg-tint px-3 py-1 font-semibold text-primary">
            {tag}
          </span>
        ))}
        {/* TODO: no profile endpoint yet, so editing only acknowledges the click. */}
        <button
          type="button"
          onClick={() => toast.info("This isn't available yet. Check back soon.")}
          className="cursor-pointer font-medium text-foreground hover:underline"
        >
          Edit
        </button>
      </div>

      <div role="tablist" aria-label="Resource categories" className="mt-5 flex flex-wrap gap-2">
        {RESOURCE_TABS.map((tab) => {
          const isActive = !isSearchingAll && tab.id === category;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectCategory(tab.id)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-primary",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <ul aria-busy="true" aria-label="Loading resources" className="mt-6 flex flex-col gap-4">
          {SKELETON_SUBTITLE_WIDTHS.map((width) => (
            <li key={width}>
              <ResourceCardSkeleton subtitleClassName={width} />
            </li>
          ))}
        </ul>
      ) : isError ? (
        <p role="alert" className="mt-6 text-sm text-muted-foreground">
          We couldn&apos;t load resources right now.{" "}
          <button type="button" onClick={refetch} className="cursor-pointer font-semibold text-primary hover:underline">
            Try again
          </button>
        </p>
      ) : resources.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No resources match that search yet. Try different words.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {resources.map((resource) => (
            <li key={resource.id}>
              <ResourceCard resource={resource} tag={isSearchingAll ? undefined : activeTab?.label} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourceVaultFeed;
