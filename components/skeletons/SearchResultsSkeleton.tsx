import { Skeleton } from "@/components/ui/skeleton";

function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full aspect-[3/2] rounded-xl" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="mt-2">
      <Skeleton className="h-3 w-28 mb-6" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
