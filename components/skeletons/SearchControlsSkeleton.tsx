import { Skeleton } from "@/components/ui/skeleton";

export function SearchControlsSkeleton() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-8">
      <Skeleton className="h-10 w-full rounded-lg flex-1" />
      <Skeleton className="h-10 w-full rounded-lg sm:w-48" />
    </div>
  );
}
