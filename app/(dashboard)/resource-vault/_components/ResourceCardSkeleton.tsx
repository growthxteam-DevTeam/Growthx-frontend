import { cn } from "@/lib/utils";

const ResourceCardSkeleton = ({ subtitleClassName }: { subtitleClassName: string }) => (
  <div aria-hidden className="animate-pulse rounded-lg border border-border bg-card p-5">
    <div className="flex items-center justify-between">
      <div className="size-7 rounded-md bg-tint-strong" />
      <div className="h-3 w-12 rounded-full bg-tint-strong" />
    </div>

    <div className="mt-4 h-5 w-full rounded-md bg-tint" />
    <div className={cn("mt-3 h-3 rounded-md bg-tint", subtitleClassName)} />

    <div className="mt-3 flex items-center justify-between">
      <div className="h-6 w-20 rounded-full bg-tint-strong" />
      <div className="size-4 rounded-md bg-tint-strong" />
    </div>
  </div>
);

export default ResourceCardSkeleton;
