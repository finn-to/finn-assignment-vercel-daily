import { Skeleton } from "@/components/ui/skeleton";

export function BreakingNewsBannerSkeleton() {
  return (
    <div className="border-b border-neutral-200 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-3">
          <Skeleton className="h-5 w-16 rounded bg-neutral-800" />
          <Skeleton className="h-5 w-12 rounded bg-neutral-800" />
          <Skeleton className="h-5 flex-1 rounded bg-neutral-800" />
          <Skeleton className="h-5 w-20 rounded bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}
