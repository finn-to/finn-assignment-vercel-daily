import { Skeleton } from "@/components/ui/skeleton";

function TrendingItemSkeleton() {
  return (
    <div className="flex gap-3">
      <Skeleton className="h-20 w-20 flex-shrink-0 rounded-lg" />
      <div className="flex flex-1 flex-col gap-1.5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function TrendingArticlesSidebarSkeleton() {
  return (
    <aside>
      <Skeleton className="mb-6 h-6 w-24" />
      <div className="flex flex-col gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <TrendingItemSkeleton key={i} />
        ))}
      </div>
    </aside>
  );
}
